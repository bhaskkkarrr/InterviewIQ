import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { isVerified } from "../middleware/isVerified.middleware.js";
import { askAi } from "../services/openRouter.service.js";
const authRouter = Router();

authRouter.post("/sign-in", authController.getUser);
authRouter.get("/get-access-token", authController.getAccessToken);
authRouter.post("/logout", authController.logout);
export default authRouter;
