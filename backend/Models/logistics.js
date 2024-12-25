const mongoose = require("mongoose");

const LogisticsSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    itemsDispatched: {
      type: String,
      required: true,
    },
    materialDispatchedDate: {
      type: Date,
      required: true,
    },
    courierPartnerDetails: {
      type: String,
      required: true,
    },
    docketNumber: {
      type: String,
      required: true,
    }, //tracking number
    paymentType: {
      type: String,
      enum: ["To Pay", "Paid"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Logistics", LogisticsSchema);
