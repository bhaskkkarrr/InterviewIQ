import mongoose from "mongoose";
import { type } from "os";
const questionsSchema = new mongoose.Schema(
  {
    question: String,
    difficulty: String,
    answer: String,
    feedback: String,
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    topic: String,
    answered: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    confidence: { type: Number, default: 0 },
    correctness: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    username: { type: String, default: "NA" },
    status: {
      type: String,
      enum: ["Incomplete", "Completed"],
      default: "Incomplete",
    },
    resume: {
      type: String,
      required: [true, "Resume text is required"],
    },
    totalQuestion: { type: Number, default: 0 },
    lastQuestion: questionsSchema,
    history: [questionsSchema],
    finalScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);
const InterviewSession = mongoose.model("InterviewSession", interviewSchema);
export default InterviewSession;
