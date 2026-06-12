import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

export const InterviewContext = createContext();
export const InterviewProvider = ({ children }) => {
  const { token } = useAuth();
  const [isResumeLoading, setIsResumeLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [resumeText, setResumeText] = useState(null);
  const [resumeAnalysed, setResumeAnalysed] = useState(false);
  const handleAnalyzeResume = async (data) => {
    try {
      setIsResumeLoading(true);
      const res = await axiosInstance.post("/api/interview/analyze", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Resume analysed successfully");
      setResumeData(res.data);
      setResumeAnalysed(true);
      setResumeText(res.data.user.resumeText);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.error?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setIsResumeLoading(false);
    }
  };

  const handleInterviewSubmit = async (data) => {
    console.log("Data", data);
    const res = await axiosInstance.post(
      "/api/interview/interview",
      { data: { resumeText, data } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };
  return (
    <InterviewContext.Provider
      value={{
        handleAnalyzeResume,
        isResumeLoading,
        setIsResumeLoading,
        resumeData,
        setResumeData,
        handleInterviewSubmit,
        resumeAnalysed,
        setResumeAnalysed,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  return useContext(InterviewContext);
};
