const express = require("express");
const cors = require("cors");

const app = express();

// ========================================
// TEMPORARY DATA STORAGE
// ========================================

const produceListings = [
  { farmerId: "F001", produce: "Tomato", quantity: 500, unit: "kg", price: 25 }
];
const buyerRequirements = [
  { buyerId: "B001", produce: "Tomato", quantity: 50 }
];

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());

// ========================================
// PRODUCE APIs
// ========================================

// Add farmer's produce
app.post("/api/produce", (req, res) => {
  const produce = req.body;

  produceListings.push(produce);

  res.status(201).json({
    message: "Produce added successfully",
    produce: produce
  });
});

// Get all produce
app.get("/api/produce", (req, res) => {
  res.json(produceListings);
});

// Get produce by farmer ID
app.get("/api/produce/:farmerId", (req, res) => {
  const farmerId = req.params.farmerId;

  const farmerProduce = produceListings.filter(
    (produce) => produce.farmerId === farmerId
  );

  res.json(farmerProduce);
});

// ========================================
// BUYER REQUIREMENT APIs
// ========================================

// Add buyer requirement
app.post("/api/buyer-requirements", (req, res) => {
  const requirement = req.body;

  buyerRequirements.push(requirement);

  res.status(201).json({
    message: "Buyer requirement added successfully",
    requirement: requirement
  });
});

// Get all buyer requirements
app.get("/api/buyer-requirements", (req, res) => {
  res.json(buyerRequirements);
});

// ========================================
// MATCHING API
// ========================================

// Find farmers who can fulfill a buyer's requirement
app.get("/api/matches/:buyerId", (req, res) => {
  const buyerId = req.params.buyerId;

  // Find the buyer's requirement
  const requirement = buyerRequirements.find(
    (buyer) => buyer.buyerId === buyerId
  );

  // If buyer requirement doesn't exist
  if (!requirement) {
    return res.status(404).json({
      message: "Buyer requirement not found"
    });
  }

  // Find matching farmer produce
  const matches = produceListings.filter(
    (produce) =>
      produce.produce === requirement.produce &&
      produce.quantity >= requirement.quantity
  );

  // Send matches back
  res.json({
    buyerId: buyerId,
    requirement: requirement,
    matches: matches
  });
});

// ========================================
// BASIC SERVER TEST
// ========================================

app.get("/", (req, res) => {
  res.json({
    message: "FarmBridge AI backend is running!"
  });
});

// ========================================
// START SERVER
// ========================================

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});