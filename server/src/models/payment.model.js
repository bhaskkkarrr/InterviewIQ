import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: String,
    amount: Number,
    credits: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    status: {
      type: String,
      enum: ["created", "failed", "paid"],
    },
  },
  { timestamps: true },
);

const PaymentModel = mongoose.model("Payment", paymentSchema);
export default PaymentModel;
