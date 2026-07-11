import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import userModel from "../models/user.model.js";
import InterviewSession from "../models/interview.model.js";
import {
  analyze,
  evaluation,
  generation,
} from "../services/interview.service.js";
import axiosInstance from "../utils/axiosInstance.js";

export const analyseResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume is required",
    });
  }

  try {
    const formData = new FormData();

    formData.append("resume", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const result = await analyze(formData);

    if (!result.success) {
      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Resume controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const interview = async (req, res) => {
  try {
    const userId = req.user?._id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits. Buy more credits to continue",
      });
    }

    const { interviewSessionId, answer, resume_text } = req.body;

    // CASE 1: START A NEW INTERVIEW

    if (!interviewSessionId) {
      if (!resume_text) {
        return res.status(400).json({
          success: false,
          message: "Resume text is required",
        });
      }

      const interviewSession = await InterviewSession.create({
        userId,
        resume: resume_text,
        username: req.user.name,
      });

      user.credits -= 50;

      const response = await generation(
        interviewSession.resume,
        interviewSession.history,
      );

      if (!response.success) {
        return res.status(500).json({
          success: false,
          message: "Error occurred while generating question",
          error: response.error,
        });
      }

      interviewSession.history.push(response.questionResponse);
      interviewSession.lastQuestion = response.questionResponse;
      interviewSession.totalQuestion = interviewSession.history.length;

      await interviewSession.save();
      await user.save();

      return res.status(201).json({
        success: true,
        message: "Interview started successfully",
        question: response.questionResponse,
        interviewSession: interviewSession,
      });
    }

    // CASE 2: CONTINUE EXISTING INTERVIEW

    const interviewSession = await InterviewSession.findOne({
      _id: interviewSessionId,
      userId,
      status: "Incomplete",
    });

    if (!interviewSession) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found",
      });
    }

    if (!answer?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Answer not found",
      });
    }

    if (interviewSession.history.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No question found to evaluate",
      });
    }

    const lastIndex = interviewSession.history.length - 1;
    const currentQuestion = interviewSession.history[lastIndex];

    if (currentQuestion.answered) {
      return res.status(400).json({
        success: false,
        message: "This question has already been answered",
      });
    }

    currentQuestion.answer = answer;

    const evaluationData = await evaluation(
      interviewSession.resume,
      interviewSession.history,
    );

    if (!evaluationData.success) {
      return res.status(500).json({
        success: false,
        message: "Error while evaluating answer",
        error: evaluationData.error,
      });
    }

    const evaluationResult = evaluationData.evaluationResponse;

    currentQuestion.strengths = evaluationResult.strengths;
    currentQuestion.weaknesses = evaluationResult.weaknesses;
    currentQuestion.score = evaluationResult.score;
    currentQuestion.feedback = evaluationResult.feedback;
    currentQuestion.correctness = evaluationResult.correctness;
    currentQuestion.communication = evaluationResult.communication;
    currentQuestion.confidence = evaluationResult.confidence;
    currentQuestion.answered = true;

    const questionScore =
      (evaluationResult.score +
        evaluationResult.correctness +
        evaluationResult.confidence +
        evaluationResult.communication) /
      4;

    interviewSession.finalScore += questionScore;

    const MAX_QUESTIONS = 3;

    // END AFTER 6TH QUESTION IS EVALUATED

    if (interviewSession.history.length >= MAX_QUESTIONS) {
      interviewSession.status = "Completed";

      await interviewSession.save();

      return res.status(200).json({
        success: true,
        interviewCompleted: true,
        message: "Interview completed",
        evaluation: evaluationResult,
        interviewSession: interviewSession,
      });
    }

    // GENERATE NEXT QUESTION

    const response = await generation(
      interviewSession.resume,
      interviewSession.history,
    );

    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate new question",
        error: response.error,
      });
    }

    interviewSession.lastQuestion = response.questionResponse;
    interviewSession.history.push(response.questionResponse);
    interviewSession.totalQuestion = interviewSession.history.length;

    await interviewSession.save();

    return res.status(200).json({
      success: true,
      interviewCompleted: false,
      message: "Answer evaluated and next question generated",
      evaluation: evaluationResult,
      question: response.questionResponse,
      interviewSession: interviewSession,
    });
  } catch (error) {
    console.error("Interview controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

export const history = async (req, res) => {
  try {
    const userId = req.user?._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const allInterviews = await InterviewSession.find({ userId }).sort({
      createdAt: -1,
    });
    if (allInterviews.length < 0) {
      return res.status(400).json({
        success: false,
        message: "No interview found",
      });
    }

    return res.status(200).json({
      success: true,
      allInterviews,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const report = async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const interviewId = req.params.id;
  if (!interviewId) {
    return res.status(400).json({
      success: false,
      message: "Interview id not found",
    });
  }

  const interview = await InterviewSession.findById(interviewId);
  if (!interview) {
    return res.status(400).json({
      success: false,
      message: "Interview not found",
    });
  }

  return res.status(200).json({
    success: true,
    interview,
  });
};
