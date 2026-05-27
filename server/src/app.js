import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import config from "./config/config.js";
const app = express();
connectDB();
const allowedOrigins = [config.CLIENT_URL, config.CLIENT_LIVE_URL];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);
export default app;
