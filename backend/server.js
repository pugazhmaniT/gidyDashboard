const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const logRoutes = require("./routes/logs");


const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/logs", logRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Gidy Backend Running");
});

// Connect MongoDB
console.log("Attempting MongoDB connection...");
mongoose.connect(process.env.MONGO_URI, {
  retryWrites: true,
  w: "majority",
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});