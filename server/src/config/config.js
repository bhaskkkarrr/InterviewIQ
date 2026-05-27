import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not available in environment variables");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not available in environment variables");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not available in environment variables");
}
if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL is not available in environment variables");
}
if (!process.env.CLIENT_LIVE_URL) {
  throw new Error("CLIENT_LIVE_URL is not available in environment variables");
}
const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  CLIENT_LIVE_URL: process.env.CLIENT_LIVE_URL,
};

export default config;
