import config from "../config/config.js";
import PaymentModel from "../models/payment.model.js";
import userModel from "../models/user.model.js";
import { CreditPlans } from "../utils/creditPlans.js";
import razorpay from "../utils/razorpayInstance.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const { packId } = req.body;

    const pack = CreditPlans[packId];
    if (!pack) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    const order = await razorpay.orders.create({
      amount: pack.price * 100,
      currency: "INR",
      receipt: `receipts_${Date.now()}`,
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not created",
      });
    }

    await PaymentModel.create({
      userId,
      packId,
      credits: pack.credits,
      amount: pack.price,
      razorpayOrderId: order.id,
    });

    return res.status(201).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not create payment order",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const paymentRecord = await PaymentModel.findOne({
      razorpayOrderId: razorpay_order_id,
      userId,
    });

    if (!paymentRecord) {
      return res.status(404).json({
        success: false,
        message: "Payment order not found",
      });
    }

    if (paymentRecord.status === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const signature = crypto
      .createHmac("sha256", config.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (signature != razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    paymentRecord.status = "paid";
    paymentRecord.razorpayPaymentId = razorpay_payment_id;

    await paymentRecord.save();

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    
    user.credits += paymentRecord.credits;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `${paymentRecord.credits} credits added successfully`,
      credits: user.credits,
      user,
    });
  } catch (error) {
    console.error("Verify payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not verify payment",
    });
  }
};
