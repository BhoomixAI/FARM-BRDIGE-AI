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
    const dataBytes = Buffer.from(data, 'utf8');

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
        "Content-Length": dataBytes.length,
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
    const query = (intent.product || "").toLowerCase();
    const matchedProduce = produceListings.filter(
      (p) =>
        (p.produce.toLowerCase().includes(query) || query.includes(p.produce.toLowerCase())) &&
        (intent.quantity == null || p.quantity >= intent.quantity)
    );
    context.produceListings = matchedProduce;
    context.matches = matchedProduce;

    if (intent.location) {
      const buyerLoc = buyers.find((b) => b.location && b.location.city && intent.location && b.location.city.toLowerCase() === intent.location.toLowerCase());
      if (buyerLoc && buyerLoc.location) {
        const buyLat = buyerLoc.location.lat, buyLng = buyerLoc.location.lng;
        matchedProduce.sort((a, b) => {
          const farmerA = farmers.find((f) => f.farmerId === a.farmerId);
          const farmerB = farmers.find((f) => f.farmerId === b.farmerId);
          const distA = farmerA && farmerA.location ? Math.sqrt((farmerA.location.lat - buyLat) ** 2 + (farmerA.location.lng - buyLng) ** 2) : Infinity;
          const distB = farmerB && farmerB.location ? Math.sqrt((farmerB.location.lat - buyLat) ** 2 + (farmerB.location.lng - buyLng) ** 2) : Infinity;
          return distA - distB;
        });
      }
    }

    const farmer = farmers.find((f) =>
      matchedProduce.some((p) => p.farmerId === f.farmerId)
    );

    let buyer = null;
    if (intent.location) {
      buyer = buyers.find((b) => b.location && b.location.city && intent.location && b.location.city.toLowerCase() === intent.location.toLowerCase());
    }
    if (!buyer) {
      buyer = buyers.length > 0 ? buyers[0] : null;
    }

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
    }
  } else if (intent.intent === "SELLER") {
    const productName = (intent.product || "").trim().toLowerCase();
    const matchingReq = buyerReqs.find(
      (r) => r.produce.toLowerCase().includes(productName)
    );
    context.buyerRequirements = matchingReq ? [matchingReq] : buyerReqs;
  }

  context.intent = intent;
  return context;
}

let nextListingId = 100;

function getNextId() {
  return nextListingId++;
}

const PRODUCT_ALIASES = {
  aloo: "potato",
  आलू: "potato",
  tamatar: "tomato",
  टमाटर: "tomato",
  pyaaz: "onion",
  प्याज़: "onion",
  gajar: "carrot",
  गाजर: "carrot",
  gobhi: "cauliflower",
  गोभी: "cauliflower",
};

const DEFAULT_PRICES = {
  tomato: 25,
  onions: 30,
  wheat: 20,
  rice: 35,
  mango: 80,
  banana: 15,
};

const POTATO_IMAGE = "https://images.unsplash.com/photo-1531572753322-ad063cecc148?w=600&auto=format&fit=crop&q=80";

function createListingFromSellerIntent(intent) {
  const rawProduct = (intent.product || "").trim();
  let productKey = rawProduct.toLowerCase();
  if (productKey === "potatoes") productKey = "potato";
  const productName = PRODUCT_ALIASES[productKey] || productKey;
  const quantity = intent.quantity || 0;
  const unit = intent.unit || "kg";
  const farmerId = "F001";
  const price = (typeof intent.price === "number" && intent.price > 0) ? intent.price : (DEFAULT_PRICES[productName] || 25);

  const listing = {
    id: getNextId(),
    farmerId,
    produce: productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase(),
    quantity,
    unit,
    price,
  };

  if (listing.produce === "Potato") {
    listing.image = POTATO_IMAGE;
  }

  return listing;
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
  let marketplaceInfo = "No matching produce listings found.";
  if (context.matches && context.matches.length > 0) {
    const listings = context.matches.map(m => `${m.produce} \u2014 ${m.quantity} ${m.unit} available at \u20B9${m.price}/${m.unit} (Farmer: ${m.farmerId})`).join("\n");
    marketplaceInfo = `Matching listings found:\n${listings}`;
  } else if (context.produceListings && context.produceListings.length > 0) {
    const listings = context.produceListings.map(m => `${m.produce} \u2014 ${m.quantity} ${m.unit} at \u20B9${m.price}/${m.unit} (Farmer: ${m.farmerId})`).join("\n");
    marketplaceInfo = `Available produce:\n${listings}`;
  }

  let logisticsInfo = "No logistics data available.";
  if (context.logistics) {
    logisticsInfo = `Pickup: ${context.logistics.pickupLocation.city}, Delivery: ${context.logistics.deliveryLocation.city}, Distance: ${context.logistics.distanceKm} km.`;
  }

  const prompt = `You are an agricultural marketplace AI assistant for FarmBridge AI. Generate a concise, natural-language response based on the user's requirement, available marketplace context, and their original query.

User Requirement: ${JSON.stringify(requirement)}
Original Query: ${originalText}

MARKETPLACE LISTINGS:
${marketplaceInfo}

LOGISTICS:
${logisticsInfo}

INSTRUCTIONS:
- If there are matching listings, mention them by name, quantity, price, and location.
- If there are NO matching listings, clearly state: "No current listing found for [product]."
- Be conversational and practical.`;

  const response = await chatCompletion([
    { role: "system", content: "You are a helpful agricultural marketplace assistant. Respond concisely and naturally. Always reference actual marketplace listings." },
    { role: "user", content: prompt },
  ]);

  return response.choices[0].message.content;
}

module.exports = { getVoiceIntent, getAssistantResponse, buildContextFromIntent, createListingFromSellerIntent };
