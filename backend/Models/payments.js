const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      unique: true,
      // ref: "Order",
      required: true,
    },
    paymentId: {
      type: String,
    },
    paymentType: {
      type: String,
      enum: ["Full Payment", "Part Payment", "Advanced", "Paid"],
      required: true,
    }, //radio button
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    amountReceived: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
