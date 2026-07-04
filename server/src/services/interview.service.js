import axios from "axios";
import config from "../config/config.js";
import axiosInstance from "../utils/axiosInstance.js";
export const generation = async (resume, history) => {
  try {
    const interview_question = await axiosInstance.post(
      "/interview/question",
      {
        resume,
        history,
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return {
      success: true,
      question: interview_question.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const evaluation = async (resume, history) => {
  try {
    const aiEvaluate = await axiosInstance.post(
      "/interview/evaluate",
      {
        resume,
        history,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return {
      success: true,
      aiEvaluate: aiEvaluate.data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};
