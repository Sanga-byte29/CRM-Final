const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    orderDate: { type: Date, required: true },
    bookedBy: { type: String, default: "Administrator", required: true },
    startDate: { type: Date, required: true },
    completionDate: { type: Date, required: true },
    paymentDueDate: { type: Date, required: true },
    projectHead: { type: String, required: false },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    address: { type: String },
    billTo: { type: String },
    quotationNumber: { type: String },
    quotationDate: { type: Date, /**required: true , */ default: null },
    poPiNumber: { type: String },
    poPiDate: { type: Date, default: null },
    transportationCost: { type: Number, default: 0 },
    amountWithGST: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

OrderSchema.pre("remove", async function (next) {
  // Delete related logistics entries
  await mongoose.model("Logistics").deleteMany({ orderId: this._id });

  // Delete related payment entries
  await mongoose.model("Payment").deleteMany({ orderId: this._id });

  await mongoose.model("Invoice").deleteMany({ orderId: this._id });

  next(); // Call next to continue the deletion process
});

module.exports = mongoose.model("Order", OrderSchema);
