import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";

// Components Import
import { useInterview } from "../context/InterviewContext";
import { VariableLoader } from "../components/Loaders";
import InterviewSelector from "../components/InterviewSelector";

// Icons
import { GiModernCity } from "react-icons/gi";
import { FaVideo } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdUploadFile } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BiLoaderAlt } from "react-icons/bi";

const Interview = () => {
  const {
    handleAnalyzeResume,
    isResumeLoading,
    setIsResumeLoading,
    resumeData,
    setResumeData,
    handleInterviewSubmit,
    resumeAnalysed,
    setResumeAnalysed,
  } = useInterview();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState({ resumeAnalyzed: null });
  const [preview, setPreview] = useState(null);
  const [resume, setResume] = useState(null);
  
  const handleFilePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleFileSubmit = async (e) => {
    if (!resume) return;
    let formdata = new FormData();
    formdata.append("resume", resume);
    const response = await handleAnalyzeResume(formdata);
  };

  const handleInterview = async (data) => {
    if (resumeAnalysed) {
      setError({ resumeAnalyzed: null });
      await handleInterviewSubmit(data);
    } else {
      setError({ resumeAnalyzed: "Analyze resume first" });
    }
    console.log("Interview Data", data);
  };

  const noOfSkills = resumeData?.user?.skills?.length;
  return (
    <div className="w-full min-h-screen bg-velvet-orchid-100 ">
      <div className="flex flex-col max-w-4xl mx-auto">
        <h1 className="mx-auto text-5xl my-6 font-semibold text-velvet-orchid-800">
          Start AI Mock Interview
        </h1>
        <div className="w-full bg-velvet-orchid-200 shadow-2xl shadow-velvet-orchid-800/50 rounded-xl p-8 text-velvet-orchid-800">
          <form onSubmit={handleSubmit(handleInterview)} className="space-y-4">

            {/* Mode */}
            <label className="flex flex-col items-start justify-center text-xl text-velvet-orchid-800 font-semibold ym-4 ">
              Pick Interview Mode:
              <select
                className="w-full bg-mauve-50 text-velvet-orchid-800 px-3 py-2 focus:outline-0 rounded-xl text-lg font-normal"
                {...register("mode", {
                  required: "Mode is required",
                })}
              >
                <option value="technical">Technical</option>
                <option value="hr">HR</option>
              </select>
              {errors.mode && (
                <div className="text-red-800 text-sm">
                  {errors.mode.message}
                </div>
              )}
            </label>

            {/* Experience */}
            <label className="flex flex-col items-start justify-center text-xl text-velvet-orchid-800 font-semibold ym-4 ">
              <div className="flex items-center justify-center gap-2">
                Enter Experience:
                <span className="flex text-velvet-orchid-400 text-sm">
                  (eg. 2 years)
                </span>
              </div>
              <input
                type="text"
                className="w-full bg-mauve-50 text-velvet-orchid-800 px-3 py-2 focus:outline-0 rounded-xl text-lg font-normal"
                {...register("experience", {
                  required: "Experience is required",
                })}
              />
              {errors.experience && (
                <div className="text-red-800 text-sm">
                  {errors.experience.message}
                </div>
              )}
            </label>

            {/* UPLOAD FILE */}
            <div className="w-full">
              <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                {resumeData ? (
                  <div className="flex flex-col items-start justify-center w-full h-64 bg-velvet-orchid/60 border-dashed border-mauve-100 rounded-2xl border-4 rounded-base cursor-pointer text-velvet-orchid-800 px-4 ">
                    <h3 className="text-mauve-50 text-lg font-bold ">Role:</h3>
                    <span className="text-mauve-50 text-2xl font-semibold">
                      {resumeData?.user?.role}
                    </span>
                    {resumeData?.user?.projects.length > 0 && (
                      <>
                        <h3 className="text-mauve-50  text-lg font-bold ">
                          Key Projects:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {resumeData?.user?.projects?.map((project, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center flex-row gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-velvet-orchid-50 text-velvet-orchid-800 dark:bg-primary-500/20 dark:text-primary-400"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    <h3 className="text-mauve-50 text-lg font-semibold ">
                      Skills:
                    </h3>
                    <div className="flex flex-wrap gap-2 items-end">
                      {resumeData?.user?.skills.slice(0, 6).map((skill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center flex-row gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-velvet-orchid-50 text-velvet-orchid-800"
                        >
                          {skill}
                        </span>
                      ))}
                      {noOfSkills > 6 && (
                        <div className="text-mauve-50">
                          {noOfSkills > 6 ? "...more" : ""}
                        </div>
                      )}
                    </div>
                  </div>
                ) : preview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 bg-velvet-orchid/60 border-dashed border-mauve-100 rounded-2xl border-4 rounded-base cursor-pointer text-velvet-orchid-800">
                    <div className="flex justify-center items-center flex-col">
                      <div
                        className="flex items-center relative gap-4 p-4 border rounded-xl hover:bg-white/90 bg-white hover:cursor-pointer"
                        onClick={() => window.open(preview, "_blank")}
                      >
                        <FaFilePdf size={50} className="text-red-500" />
                        <motion.div
                          whileHover={{ rotate: 90 }}
                          onClick={(e) => {
                            setPreview(null);
                            e.stopPropagation();
                          }}
                          className="absolute -top-2 -right-3 p-1 rounded-full bg-mauve-50 border border-velvet-orchid-800"
                        >
                          <RxCross2 />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{resume.name}</h3>
                          <p className="text-gray-500 text-sm">
                            {(resume.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 my-3 rounded-xl bg-velvet-orchid-700 text-velvet-orchid-50 w-2/3 text-center "
                        onClick={handleFileSubmit}
                        disabled={isResumeLoading}
                      >
                        {isResumeLoading ? (
                          <VariableLoader />
                        ) : (
                          " Analyze Resume"
                        )}
                      </motion.button>
                    </div>
                  </label>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 bg-velvet-orchid/30 hover:bg-velvet-orchid/60 border-dashed border-mauve-100 rounded-2xl border-4 rounded-base cursor-pointer text-velvet-orchid-800">
                    <AiOutlineCloudUpload size={30} />
                    <p className="mb-2 px-4 text-sm">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs">.pdf (Max size 10MB)</p>
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
                      <div className="text-red-800 font-bold text-sm">
                        {errors.resume.message}
                      </div>
                    )}
                  </label>
                )}
              </div>
              {error.resumeAnalyzed && (
                <div className="text-sm font-bold text-red-700">
                  {error.resumeAnalyzed}
                </div>
              )}
            </div>

            <div className="flex justify-end items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="py-3 px-4 shadow-lg shadow-mauve-800/50 bg-velvet-orchid-700 text-mauve-50 rounded-xl hover:bg-velvet-orchid-600 cursor-pointer"
              >
                Start Interview
              </motion.button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Interview;






