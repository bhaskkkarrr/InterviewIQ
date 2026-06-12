import mongoose from "mongoose";
const questionsSchema = new mongoose.Schema({
  question: String,
  difficulty: String,
  timeLimit: String,
  answer: String,
  feedback: String,
  score: { type: Number, default: 0 },
  confidence: { type: Number, default: 0 },
  correctness: { type: Number, default: 0 },
  communication: { type: Number, default: 0 },
});

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    mode: {
      type: String,
      enum: ["HR", "Technical"],
      required: [true, "Mode is required"],
    },
    resumeText: {
      type: String,
      required: [true, "Resume text is required"],
    },
    questions: [questionsSchema],
    finalScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Incomplete", "Completed"],
      default: "Incomplete",
    },
  },
  { timestamps: true },
);
const interviewModel = mongoose.Model("Interview", interviewSchema);
export default interviewModel;