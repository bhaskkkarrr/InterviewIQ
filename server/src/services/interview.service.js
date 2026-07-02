import axios from "axios";
export const generation = async (resume, history) => {
  try {
    const interview_question = await axios.post(
      "http://localhost:8000/interview/question",
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
    const aiEvaluate = await axios.post(
      "http://localhost:8000/interview/evaluate",
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
