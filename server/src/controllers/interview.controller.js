import { askAi } from "../services/openRouter.service.js";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import userModel from "../models/user.model.js";
import InterviewSession from "../models/interview.model.js";
import { evaluation, generation } from "../services/interview.service.js";
import { error } from "console";

export const analyseResume = async (req, res) => {
  if (!req.file) {
    return res.status(401).json({
      success: false,
      message: "Resume is required",
    });
  }
  try {
    const formData = new FormData();
    formData.append(
      "resume",
      fs.createReadStream(req.file.path),
      req.file.originalname,
    );
    const ai_response = await axios.post(
      "http://localhost:8000/resume/analyze",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    console.log("AI response: ", ai_response.data);
    return res.status(200).json({
      success: true,
      user: ai_response.data,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(501).json({
      success: false,
      message: "Server Error",
      error: error.name,
    });
  }
};

export const generateQuestion = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User", req.user);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const interviewSession = await InterviewSession.create({
      userId: userId,
      resume: req.body.resume_text,
      username: req.user.name,
    });

    const response = await generation(
      interviewSession.resume,
      interviewSession.history,
    );
    console.log("RESPONSE", response.success);

    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: "Error occured while generating questions",
        error: response.error,
      });
    }

    console.log("QUESTIONS", response);
    console.log("Questions", response.question);

    interviewSession.history.push({
      question: response.question.question,
      difficulty: response.question.difficulty,
      topic: response.question.topic,
    });
    interviewSession.totalQuestion = interviewSession.history.length;

    await interviewSession.save();
    return res.status(201).json({
      success: true,
      message: "Questions generated successfully",
      question: response.question,
      interviewSession: interviewSession,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error occured !!",
      error: error,
    });
  }
};

export const evaluateAnswer = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const sessionId = req.body.interviewSessionId;
    const interviewSession = await InterviewSession.findOne({
      _id: sessionId,
      status: "Incomplete",
    });

    if (!interviewSession) {
      return res.status(400).json({
        success: false,
        message: "Interview session not found",
      });
    }

    const lastIndex = interviewSession.history.length - 1;
    interviewSession.history[lastIndex].answer = req.body.answer;
    interviewSession.history[lastIndex].answered = true;
    await interviewSession.save();

    const evaluationData = await evaluation(
      interviewSession.resume,
      interviewSession.history,
    );

    console.log("Eval..", evaluationData);
    if (!evaluationData.success) {
      return res.status(500).json({
        success: false,
        message: "Error while evaluating answer",
        error: evaluationData.error,
      });
    }

    const currentQuestion = interviewSession.history[lastIndex];
    currentQuestion.strengths = evaluationData.aiEvaluate.strengths;
    currentQuestion.weaknesses = evaluationData.aiEvaluate.weaknesses;
    currentQuestion.score = evaluationData.aiEvaluate.score;
    currentQuestion.feedback = evaluationData.aiEvaluate.feedback;
    currentQuestion.correctness = evaluationData.aiEvaluate.correctness;
    currentQuestion.communication = evaluationData.aiEvaluate.communication;
    currentQuestion.confidence = evaluationData.aiEvaluate.confidence;
    currentQuestion.answered = true;

    const finalScore =
      (evaluationData.aiEvaluate.score +
        evaluationData.aiEvaluate.correctness +
        evaluationData.aiEvaluate.confidence +
        evaluationData.aiEvaluate.communication) /
      4;

    interviewSession.lastQuestion = currentQuestion;
    interviewSession.finalScore += finalScore;
    console.log("current updated question ", currentQuestion);

    const MAX_QUESTIONS = 6;

    if (
      interviewSession.history.length >= MAX_QUESTIONS &&
      interviewSession.history[lastIndex].answered
    ) {
      interviewSession.status = "Completed";

      await interviewSession.save();

      return res.status(200).json({
        success: true,
        interviewCompleted: true,
        message: "Interview completed.",
      });
    }

    const response = await generation(
      interviewSession.resume,
      interviewSession.history,
    );
    console.log("Question response", response);

    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate new question",
        error: response.error,
      });
    }

    interviewSession.lastQuestion = response.question;
    interviewSession.history.push(response.question);
    interviewSession.totalQuestion = interviewSession.history.length;

    await interviewSession.save();
    return res.status(201).json({
      success: true,
      message: "Evaluation successful",
      evaluation: evaluationData.aiEvaluate,
      interviewSession: interviewSession,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Error occured",
    });
  }
};
