import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

// Components Import
import { useInterview } from "../context/InterviewContext";
import { VariableLoader } from "../components/Loaders";
import InterviewSelector from "../components/InterviewSelector";

import Step1 from "../components/Interview/Step1";
import Step2 from "../components/Interview/Step2";

const Interview = () => {
  const { interviewOn } = useInterview();
  return (
    <div className="w-full min-h-screen bg-linen pb-10 md:pb-0">
      {!interviewOn && <Step1 />}
      {interviewOn && <Step2 />}
    </div>
  );
};

export default Interview;
