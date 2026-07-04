import axios from "axios";
import config from "../config/config.js";
import axiosInstance from "../utils/axiosInstance.js";

export const analyze = async (formData) => {
  try {
    const ai_response = await axiosInstance.post("/resume/analyze", formData, {
      headers: formData.getHeaders(),
    });
    return {
      success: true,
      data:ai_response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

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
      questionResponse: interview_question.data,
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
      evaluationResponse: aiEvaluate.data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};
