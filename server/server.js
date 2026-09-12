const express = require("express");
const cors = require("cors");

const app = express();

const produceListings = [];


app.use(cors());
app.use(express.json());

app.post("/api/produce", (req, res) => {

});

app.get("/", (req, res) => {
  res.json({
    message: "FarmBridge AI backend is running!"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
