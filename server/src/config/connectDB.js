import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error in connecting to Databasse",error);
  }
}

export default connectDB;
