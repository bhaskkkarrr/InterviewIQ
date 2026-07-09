import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";

// Icons
import { GiModernCity } from "react-icons/gi";
import { FaVideo } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdUploadFile } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BiLoaderAlt } from "react-icons/bi";
import { useInterview } from "../../context/InterviewContext";
import { GlobalLoader, InterviewStartLoader, VariableLoader } from "../Loaders";
import ConfirmationModal from "../ConfirmationModal";

const Step1 = () => {
  const {
    handleAnalyzeResume,
    handleInterviewSubmit,
    analysisResult,
    resumeText,
    resumeAnalysed,
    isResumeAnalysing,
    preparingInterview,
  } = useInterview();
  const [error, setError] = useState({ resumeAnalyzed: null });
  const [preview, setPreview] = useState(null);
  const [resume, setResume] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInterviewStart = async () => {
    const unlockSpeech = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(unlockSpeech);
    await handleInterviewSubmit();
  };

  const handleFilePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      const url = URL.createObjectURL(file);
      setCompleted((prev) => [...prev, "analyze"]);
      setStep(2);
      setPreview(url);
    }
  };

  const handleFileSubmit = async (e) => {
    if (!resume) return;
    let formdata = new FormData();
    formdata.append("resume", resume);
    const res = await handleAnalyzeResume(formdata);
    if (res?.success) {
      setCompleted((prev) => [...prev, "interview"]);
      setStep(3);
    }
  };
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(["upload"]);
  const noOfSkills = analysisResult?.skills?.length;
  const [startInterview, setStartInterview] = useState(false);
  return (
    <div className="flex flex-col max-w-4xl mx-auto px-4 pb-10 sm:px-6">
      {/* Header */}
      <div className="mx-auto mt-10 mb-6 flex flex-col items-center text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-dark-garnet/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-dark-garnet">
          Step {step} of 3
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-garnet leading-tight">
          Start AI Mock Interview
        </h1>
        <p className="mt-3 max-w-md text-sm sm:text-base text-velvet-orchid-800/70">
          Upload your resume and let our AI tailor interview questions to your
          background.
        </p>
      </div>

      <div className=" flex lg:flex-row flex-col justify-center items-center gap-5 w-full h-full">
        {/* Mini process strip */}
        <div
          className="mx-auto lg:w-1/3 px-5 w-full mb-8 gap-10
         flex lg:flex-col max-w-md items-center justify-between text-dark-garnet-900"
        >
          {[
            { icon: MdUploadFile, label: "Upload", id: "upload" },
            { icon: IoAnalyticsSharp, label: "Analyze", id: "analyze" },
            { icon: FaVideo, label: "Interview", id: "interview" },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center  gap-1.5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full
                    ${completed.includes(item.id) ? "border-dark-garnet bg-dark-garnet text-linen" : "border-linen-400 bg-linen-200 text-dark-garnet/60"} border-2 `}
                >
                  <item.icon size={18} />
                </div>
                <span className="text-[11px] font-medium">{item.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className=" lg:w-2/3 w-full max-w-2xl min-w-2xs rounded-3xl border border-velvet-orchid-800/10 bg-linear-to-br from-dark-garnet-800 to-dark-garnet-900 p-6 sm:p-8 md:p-10 shadow-2xl shadow-velvet-orchid-800/50 text-linen">
          <form
            onSubmit={handleSubmit(handleInterviewStart)}
            className="space-y-6"
          >
            {/* UPLOAD FILE */}
            <div className="w-full">
              <div className="flex flex-col items-center justify-center text-body">
                {resumeAnalysed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col w-full gap-4 rounded-2xl border-4 border-dashed border-linen-50 bg-linen/60  px-5 py-6 sm:px-6 sm:py-7 "
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <h3 className="text-dark-garnet/80 text-sm font-bold uppercase tracking-wide">
                          Role
                        </h3>
                        <span className="text-white text-xl sm:text-2xl capitalize font-semibold">
                          {analysisResult?.role}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-dark-garnet/80 text-sm font-bold uppercase tracking-wide">
                          Experience
                        </h3>
                        <span className="text-white text-xl sm:text-2xl font-semibold">
                          {analysisResult?.experience}
                        </span>
                      </div>
                    </div>

                    {analysisResult?.projects.length > 0 && (
                      <div>
                        <h3 className="text-dark-garnet/80 text-sm font-bold uppercase tracking-wide mb-2">
                          Key Projects
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult?.projects?.map((project, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center flex-row gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-linen-50 text-velvet-orchid-800 dark:bg-primary-500/20 dark:text-primary-400"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-dark-garnet/80 text-sm font-bold uppercase tracking-wide mb-2">
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2 items-end">
                        {analysisResult?.skills.slice(0, 6).map((skill, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center flex-row gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-linen-50 text-velvet-orchid-800"
                          >
                            {skill}
                          </span>
                        ))}
                        {noOfSkills > 6 && (
                          <div className="text-mauve-50 text-xs font-medium">
                            {noOfSkills > 6 ? "...more" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : preview ? (
                  <label className="group flex flex-col items-center justify-center w-full h-56 sm:h-64 bg-dark-garnet/30 hover:bg-dark-garnet-800/50 border-dashed border-linen/50 rounded-2xl border-4 cursor-pointer text-dark-garnet  transition-all duration-200">
                    <div className="flex justify-center items-center flex-col w-full px-4">
                      <div
                        className="flex items-center relative gap-4 p-4 border rounded-xl hover:bg-white/90 bg-white hover:cursor-pointer w-full max-w-sm shadow-sm transition-colors"
                        onClick={() => window.open(preview, "_blank")}
                      >
                        <FaFilePdf
                          size={44}
                          className="text-red-500 shrink-0"
                        />
                        <motion.button
                          whileHover={{ rotate: 90 }}
                          onClick={(e) => {
                            setPreview(null);
                            e.stopPropagation();
                          }}
                          className="absolute -top-2 -right-3 p-1 rounded-full bg-linen border border-linen-700 disabled:cursor-not-allowed"
                          disabled={isResumeAnalysing}
                        >
                          <RxCross2 />
                        </motion.button>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">
                            {resume.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {(resume.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 px-3 py-2.5 mt-4 rounded-xl bg-dark-garnet shadow-md shadow-linen/30 text-velvet-orchid-50 w-full max-w-sm text-center font-medium transition-colors border-linen-300/30 border hover:bg-dark-garnet cursor-pointer"
                        onClick={handleFileSubmit}
                        disabled={isResumeAnalysing}
                      >
                        {isResumeAnalysing ? (
                          <VariableLoader />
                        ) : (
                          <>
                            <IoAnalyticsSharp size={16} /> Analyze Resume
                          </>
                        )}
                      </motion.button>
                    </div>
                  </label>
                ) : (
                  <label className="group flex flex-col items-center justify-center w-full h-56 sm:h-64 bg-dark-garnet/30 hover:bg-dark-garnet-800/50 border-dashed border-linen/50 rounded-2xl border-4 cursor-pointer text-linen hover:text-linen transition-all duration-200">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-dark-garnet group-hover:bg-linen/10 transition-colors mb-3">
                      <AiOutlineCloudUpload size={28} />
                    </div>
                    <p className="mb-1 px-4 text-sm text-center">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs opacity-70">.pdf (Max size 10MB)</p>
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      disabled={preview}
                      {...register("resume", {
                        required: "Resume is required",
                      })}
                      onChange={(e) => {
                        handleFilePreview(e);
                      }}
                    />
                    {errors.resume && (
                      <div className="text-red-800 font-bold text-sm mt-2">
                        {errors.resume.message}
                      </div>
                    )}
                  </label>
                )}
              </div>
              {error.resumeAnalyzed && (
                <div className="mt-3 rounded-lg bg-red-800/10 border border-red-800/30 px-4 py-2.5 text-sm font-bold text-red-700">
                  {error.resumeAnalyzed}
                </div>
              )}
            </div>

            <div className="flex justify-center items-center pt-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="py-3 px-4 w-full sm:w-2/3 shadow-lg shadow-mauve-800/50 bg-dark-garnet text-[#f3ebeb] rounded-xl font-bold hover:bg-dark-garnet/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-dark-garnet cursor-pointer transition-colors"
                disabled={!resumeAnalysed || startInterview}
                onClick={() => {
                  setStartInterview(true);
                }}
              >
                Start Interview
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      {startInterview && (
        <ConfirmationModal
          isOpen={startInterview}
          onClose={() => setStartInterview(false)}
          message="Your credits will be deducted. You can't cancel this session afterward. Do not reload on the next page. Make sure proper network connection"
          action={handleInterviewStart}
          title="Start interview?"
          confirmText="Keep Going"
          cancelText="Cancel"
        />
      )}
      {preparingInterview && <InterviewStartLoader />}
    </div>
  );
};

export default Step1;
