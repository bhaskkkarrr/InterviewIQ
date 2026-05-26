import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: [true, "Email should be unique"],
      required: [true, "Email is required"],
    },
    credits: {
      type: Number,
      default: 200,
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("user", userSchema);
export default userModel;
