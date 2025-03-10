const mongoose = require("mongoose");

const PostDataSchema = new mongoose.Schema({
  StaffName: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  NumOfStu: {
    type: String,
    required: true,
  },
  Reason: {
    type: String,
    required: true,
  },
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  },
  Days: {
    type: String,
    required: true,
  },
  StartDate: {
    type: String,
    required: true,
  },
  EndDate: {
    type: String,
    required: true,
  },
  Active: {
    type: String,
    default: 1,
  },
});

module.exports = mongoose.model("PostData", PostDataSchema);
