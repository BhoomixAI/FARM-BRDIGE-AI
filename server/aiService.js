const https = require("https");

const AI_API_MODEL = process.env.AI_API_MODEL || "openai/gpt-4o-mini";
const AI_API_BASE_URL = process.env.AI_API_BASE_URL || "https://openrouter.ai/api/v1";

function chatCompletion(messages) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey || apiKey === "PASTE_YOUR_OPENROUTER_KEY_HERE") {
      return reject(new Error("AI_API_KEY is not configured in .env. Set a valid OpenRouter API key."));
    }
    const data = JSON.stringify({
      model: AI_API_MODEL,
      messages: messages,
      temperature: 0.7,
    });

    const apiUrl = AI_API_BASE_URL.replace(/\/$/, '') + '/chat/completions';
    const url = new URL(apiUrl);

    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Content-Length": data.length,
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          const safeBody = body.slice(0, 300);
          console.error(`[OpenRouter ${res.statusCode}] ${safeBody}`);
          return reject(
            new Error(`OpenRouter API error: ${res.statusCode} - ${safeBody}`)
          );
        }
        try {
          const parsed = JSON.parse(body);
          if (!parsed.choices || !parsed.choices[0] || !parsed.choices[0].message || !parsed.choices[0].message.content) {
            return reject(new Error("OpenRouter response missing expected content structure"));
          }
          resolve(parsed);
        } catch (e) {
          const safeBody = body.slice(0, 300);
          return reject(new Error(`AI provider returned a non-JSON response: ${safeBody}`));
        }
      });
    });

    req.on("error", (e) => {
      console.error("[OpenRouter Network Error]", e.message);
      reject(e);
    });
    req.write(data);
    req.end();
  });
}

function buildContextFromIntent(intent, produceListings, buyerReqs, farmers, buyers) {
  const context = {
    produceListings: [],
    matches: [],
    logistics: null,
    buyerRequirements: [],
  };

  if (intent.intent === "BUYER") {
    const matchedProduce = produceListings.filter(
      (p) =>
        p.produce.toLowerCase().includes((intent.product || "").toLowerCase()) ||
        (intent.product && p.produce.toLowerCase().includes(intent.product.toLowerCase()))
    );
    context.produceListings = matchedProduce;

    const farmer = farmers.find((f) =>
      matchedProduce.some((p) => p.farmerId === f.farmerId)
    );
    const buyer = buyers.find((b) => b.buyerId === "B001");

    if (farmer && buyer) {
      const lat1 = farmer.location.lat, lon1 = farmer.location.lng;
      const lat2 = buyer.location.lat, lon2 = buyer.location.lng;
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceKm = Number((R * c).toFixed(2));
      context.logistics = { farmer, buyer, pickupLocation: farmer.location, deliveryLocation: buyer.location, distanceKm };
      context.matches = matchedProduce;
    }
  } else if (intent.intent === "SELLER") {
    const matchingReq = buyerReqs.find(
      (r) => r.produce.toLowerCase().includes((intent.product || "").toLowerCase())
    );
    context.buyerRequirements = matchingReq ? [matchingReq] : buyerReqs;
  }

  context.intent = intent;
  return context;
}

async function getVoiceIntent(text) {
  const prompt = `You are an agricultural marketplace AI agent for FarmBridge AI. Analyze the following voice/text input and extract structured intent.

The input may be in English, Hindi, or Hinglish (Hindi-English mix). Determine whether the speaker is a BUYER or SELLER.

Return ONLY a valid JSON object with these exact keys:
{
  "intent": "BUYER" or "SELLER",
  "product": "...",
  "quantity": <number>,
  "unit": "...",
  "quality": "...",
  "location": "...",
  "date": "...",
  "price": <number>
}

If a field is not mentioned, use null or empty string for that field.

Input: "${text}"`;

  const response = await chatCompletion([
    { role: "system", content: "You are an agricultural marketplace AI. Return ONLY valid JSON with the specified keys." },
    { role: "user", content: prompt },
  ]);

  const content = response.choices[0].message.content;
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return {
    intent: "UNKNOWN",
    product: null,
    quantity: null,
    unit: null,
    quality: null,
    location: null,
    date: null,
    price: null,
  };
}

async function getAssistantResponse(requirement, context, originalText) {
  const prompt = `You are an agricultural marketplace AI assistant for FarmBridge AI. Generate a concise, natural-language response based on the user's requirement, available marketplace context, and their original query.

Requirement: ${JSON.stringify(requirement)}
Context: ${JSON.stringify(context)}
Original Text: ${originalText}

Provide a brief, helpful response that addresses the agricultural marketplace query. Be conversational and practical. If the user is a buyer, mention matching farmers, distance, and produce availability. If the user is a seller, mention buyer requirements and how to list produce.`;

  const response = await chatCompletion([
    { role: "system", content: "You are a helpful agricultural marketplace assistant. Respond concisely and naturally." },
    { role: "user", content: prompt },
  ]);

  return response.choices[0].message.content;
}

module.exports = { getVoiceIntent, getAssistantResponse, buildContextFromIntent };
