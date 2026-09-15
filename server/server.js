require("dotenv").config();
const express = require("express");
const cors = require("cors");
const aiService = require("./aiService");
const { createListingFromSellerIntent } = require("./aiService");

const app = express();

// ========================================
// TEMPORARY DATA STORAGE
// ========================================

const produceListings = [
  {
    farmerId: "F001",
    produce: "Tomato",
    quantity: 500,
    unit: "kg",
    price: 25,
  },
  {
    farmerId: "F001",
    produce: "Potato",
    quantity: 1000,
    unit: "kg",
    price: 22,
    id: 2,
    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc148?w=600&auto=format&fit=crop&q=80",
  },
];

const buyerRequirements = [
  {
    buyerId: "B001",
    produce: "Tomato",
    quantity: 50
  }
];

const farmers = [
  {
    farmerId: "F001",
    name: "Demo Farmer",
    location: {
      city: "Ghaziabad",
      lat: 28.6692,
      lng: 77.4538
    }
  }
];

const buyers = [
  {
    buyerId: "B001",
    name: "Demo Buyer",
    location: {
      city: "Delhi",
      lat: 28.6139,
      lng: 77.2090
    }
  }
];

// ========================================
// VOICE CONVERSATION STATE
// ========================================

const conversations = new Map();

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());

// ========================================
// PRODUCE APIs
// ========================================

app.post("/api/produce", (req, res) => {
  const produce = req.body;
  if (!produce || !produce.produce || !produce.quantity) {
    return res.status(400).json({ error: "Missing required fields: produce and quantity are required" });
  }
  if (typeof produce.quantity !== "number" || produce.quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity: must be a positive number" });
  }
  produceListings.push(produce);
  res.status(201).json({ message: "Produce added successfully", produce });
});

app.get("/api/produce", (req, res) => {
  res.json(produceListings);
});

app.get("/api/produce/:farmerId", (req, res) => {
  const farmerId = req.params.farmerId;
  const farmerProduce = produceListings.filter(p => p.farmerId === farmerId);
  res.json(farmerProduce);
});

// ========================================
// BUYER REQUIREMENT APIs
// ========================================

app.post("/api/buyer-requirements", (req, res) => {
  const requirement = req.body;
  if (!requirement || !requirement.buyerId || !requirement.produce || requirement.quantity == null) {
    return res.status(400).json({ error: "Missing required fields: buyerId, produce and quantity are required" });
  }
  if (typeof requirement.quantity !== "number" || requirement.quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity: must be a positive number" });
  }
  buyerRequirements.push(requirement);
  res.status(201).json({ message: "Buyer requirement added successfully", requirement });
});

app.get("/api/buyer-requirements", (req, res) => {
  res.json(buyerRequirements);
});

// ========================================
// MATCHING API
// ========================================

app.get("/api/matches/:buyerId", (req, res) => {
  const buyerId = req.params.buyerId;
  const requirement = buyerRequirements.find(b => b.buyerId === buyerId);
  if (!requirement) {
    return res.status(404).json({ message: "Buyer requirement not found" });
  }
  const matches = produceListings.filter(p =>
    p.produce === requirement.produce && p.quantity >= requirement.quantity
  );
  res.json({ buyerId, requirement, matches });
});

// ========================================
// LOGISTICS API
// ========================================

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

app.get("/api/logistics/:farmerId/:buyerId", (req, res) => {
  const farmerId = req.params.farmerId;
  const buyerId = req.params.buyerId;
  const farmer = farmers.find(f => f.farmerId === farmerId);
  const buyer = buyers.find(b => b.buyerId === buyerId);
  if (!farmer || !buyer) {
    return res.status(404).json({ message: "Farmer or buyer not found" });
  }
  const distanceKm = calculateDistance(farmer.location.lat, farmer.location.lng, buyer.location.lat, buyer.location.lng);
  res.json({
    farmer, buyer,
    pickupLocation: farmer.location,
    deliveryLocation: buyer.location,
    distanceKm: Number(distanceKm.toFixed(2))
  });
});

// ========================================
// VOICE AI AGENT ENDPOINTS
// ========================================

app.post("/api/voice-intent", async (req, res) => {
  try {
    const { text, sessionId } = req.body;
    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    const intent = await aiService.getVoiceIntent(text);
    const context = aiService.buildContextFromIntent(intent, produceListings, buyerRequirements, farmers, buyers);

    if (sessionId) {
      conversations.set(sessionId, { intent, context, history: conversations.get(sessionId)?.history || [] });
    }

    res.status(200).json({ intent, context });
  } catch (err) {
    console.error("[Voice Intent Error]", err.message);
    const isTimeout = String(err).includes("timeout");
    res.status(isTimeout ? 504 : 502).json({
      error: isTimeout ? "AI request timeout after 20s" : "AI intent extraction failed",
      detail: String(err).slice(0, 300),
    });
  }
});

app.post("/api/voice/process", async (req, res) => {
  try {
    const { text, sessionId } = req.body;
    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    const intent = await aiService.getVoiceIntent(text);
    const context = aiService.buildContextFromIntent(intent, produceListings, buyerRequirements, farmers, buyers);

    if (intent.intent === "UNKNOWN") {
      return res.status(400).json({ error: "Could not determine intent. Please speak clearly.", intent });
    }

    let sellerListing = null;
    if (intent.intent === "SELLER") {
      const qty = Number(intent.quantity);
      if (!intent.product || !intent.product.trim() || !qty || qty <= 0) {
        return res.status(400).json({ error: "Seller listing needs a product and a positive quantity. Please speak clearly.", intent });
      }
      sellerListing = createListingFromSellerIntent(intent);
      produceListings.push(sellerListing);
      context.matches = [sellerListing];
    }

    const requirement = {
      intent: intent.intent,
      product: intent.product,
      quantity: intent.quantity,
      unit: intent.unit,
      location: intent.location,
      quality: intent.quality,
      price: intent.price,
    };

    let response;
    if (intent.intent === "SELLER") {
      response = `Your listing has been created successfully! ${sellerListing.produce} \u2014 ${sellerListing.quantity} ${sellerListing.unit} at \u20B9${sellerListing.price}/${sellerListing.unit}. Farmer ID: ${sellerListing.farmerId}.`;
    } else {
      response = await aiService.getAssistantResponse(requirement, context, text);
    }

    if (sessionId) {
      const conv = conversations.get(sessionId) || { history: [] };
      conv.history.push({ type: "user", text });
      conv.history.push({ type: "ai", text: response });
      conv.intent = intent;
      conv.context = context;
      conversations.set(sessionId, conv);
    }

    res.status(200).json({ intent, context, response });
  } catch (err) {
    console.error("[Voice Process Error]", err.message);
    const isTimeout = String(err).includes("timeout");
    res.status(isTimeout ? 504 : 502).json({
      error: isTimeout ? "AI request timeout after 20s" : "Voice processing failed",
      detail: String(err).slice(0, 300),
    });
  }
});

app.post("/api/assistant-response", async (req, res) => {
  try {
    const { requirement, context, originalText } = req.body;
    if (!requirement || typeof requirement !== "object") {
      return res.status(400).json({ error: "Requirement is required" });
    }
    const response = await aiService.getAssistantResponse(requirement, context, originalText);
    res.status(200).json({ response });
  } catch (err) {
    const isTimeout = String(err).includes("timeout");
    res.status(isTimeout ? 504 : 502).json({
      error: isTimeout ? "AI response timeout after 20s" : "AI response generation failed",
      detail: String(err).slice(0, 300),
    });
  }
});

app.get("/api/voice/conversation/:sessionId", (req, res) => {
  const conv = conversations.get(req.params.sessionId);
  if (!conv) {
    return res.status(404).json({ error: "Conversation not found" });
  }
  res.json(conv);
});

// ========================================
// BASIC SERVER TEST
// ========================================

app.get("/", (req, res) => {
  res.json({ message: "FarmBridge AI backend is running!" });
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
