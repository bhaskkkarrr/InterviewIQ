import { Router } from "express";
import * as paymentController from "../controllers/payment.controller.js";
import { isVerified } from "../middleware/isVerified.middleware.js";

const paymentrouter = Router();

paymentrouter.post("/create", isVerified, paymentController.createOrder);
paymentrouter.post("/verify", isVerified, paymentController.verifyPayment);

export default paymentrouter;
