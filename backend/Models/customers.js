const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    contactName: { type: String, required: true },
    contactNumber: { type: String },
    siteDeliveryAddress: { type: String, default: 0 },
    gstNumber: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
