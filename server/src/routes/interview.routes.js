import { Router } from "express";
import * as interviewController from "../controllers/interview.controller.js";
import { upload } from "../middleware/multer.js";
import { isVerified } from "../middleware/isVerified.middleware.js";

const interviewRouter = Router();
interviewRouter.post(
  "/analyze",
  isVerified,
  upload,
  interviewController.analyseResume,
);
export default interviewRouter;
