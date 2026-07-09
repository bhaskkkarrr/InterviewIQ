import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { TbLoader2 } from "react-icons/tb";
import { useEffect, useState } from "react";

export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-linen backdrop-blur-sm flex justify-center items-center z-999">
      <BiLoaderAlt className="text-5xl text-dark-garnet animate-spin" />
    </div>
  );
};

export const VariableLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <BiLoaderAlt size={30} className="text-5xl text-white animate-spin" />
    </div>
  );
};

const messages = [
  "Setting up your interview session...",
  "Reviewing your resume like a professional interviewer...",
  "Crafting personalized questions based on your experience...",
  "Setting up your interview session...",
  "Reviewing your resume like a professional interviewer...",
  "Crafting personalized questions based on your experience...",
  "Setting up your interview session...",
  "Reviewing your resume like a professional interviewer...",
  "Crafting personalized questions based on your experience...",
  "Setting up your interview session...",
  "Reviewing your resume like a professional interviewer...",
  "Crafting personalized questions based on your experience...",
  "Setting up your interview session...",
  "Reviewing your resume like a professional interviewer...",
  "Crafting personalized questions based on your experience...",
];

export const InterviewStartLoader = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => prev + 1);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-linen flex justify-center items-center z-999">
      {/* Your Lottie animation */}

      <p className="text-lg font-medium transition-all duration-200">
        {messages[currentMessage]}
      </p>
    </div>
  );
};

const reportMessages = [
  "Analyzing your interview performance...",
  "Reviewing your answers and evaluator feedback...",
  "Measuring your technical correctness...",
  "Evaluating your communication and clarity...",
  "Assessing your confidence across the interview...",
  "Identifying your strongest skills...",
  "Finding key areas for improvement...",
];

export const InterviewReportLoader = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => prev + 1);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-linen flex justify-center items-center z-999">
      {/* Your Lottie animation */}

      <p className="text-lg font-medium transition-all duration-200">
        {reportMessages[currentMessage]}
      </p>
    </div>
  );
};

