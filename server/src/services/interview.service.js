import axios from "axios";
import config from "../config/config.js";
import axiosInstance from "../utils/axiosInstance.js";

export const analyze = async (formData) => {
  try {
    const aiResponse = await axiosInstance.post("/resume/analyze", formData, {
      headers: formData.getHeaders(),
      timeout: 120_000,
    });

    return {
      success: true,
      data: aiResponse.data,
    };
  } catch (error) {
    console.error("AI service error:", error.response?.data || error.message);

    return {
      success: false,
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "AI service failed",
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
    console.error("AI service error:", error.response?.data || error.message);

    return {
      success: false,
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "AI service failed",
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
    console.error("AI service error:", error.response?.data || error.message);

    return {
      success: false,
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "AI service failed",
    };
  }
};
