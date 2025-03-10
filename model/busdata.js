const mongoose = require("mongoose");

const BusDataSchema = new mongoose.Schema({
  BusNO: {
    type: Number,
    required: true,
  },
  Destination: {
    type: String,
    required: true,
  },
  DepartureTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BusData", BusDataSchema);
