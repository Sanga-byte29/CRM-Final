const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    orderId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Order", // Reference to the Order schema
      // // required: true,
      type: String, // Ensure this is a string
      required: true,
      // unique: true,
    },
    invoiceId: {
      type: String,
      // required: true,
      // unique: true, // Ensures each invoiceId is unique
    },
    invoiceNumber: {
      type: String,
      // required: true,
      // unique: true, // Ensures invoice numbers are unique
    },
    invoiceDate: {
      type: Date,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);