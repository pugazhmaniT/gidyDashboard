const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  actor: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  action: {
    type: String
  },
  resource: {
    type: String
  },
  resourceType: {
    type: String
  },
  ipAddress: {
    type: String
  },
  region: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String
  },
  timestamp: {
    type: Date
  }
});

module.exports = mongoose.model("Log", logSchema);