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
  const [step, setStep] = useState(1);
  const { resumeData, interviewData } = useInterview();

  return (
    <div className="w-full min-h-screen bg-linen pb-10">
      {step == 1 && <Step1 setStep={setStep} />}
      {/* {step == 2 && resumeData && interviewData && <Step2 setStep={setStep} />} */}
      {step == 2 && <Step2 setStep={setStep} />}
    </div>
  );
};

export default Interview;
