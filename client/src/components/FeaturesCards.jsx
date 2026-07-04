import React from "react";
import aiEval from "../assets/ai-ans.png";
import pdf from "../assets/pdf.png";
import resume from "../assets/resume.png";
import video from "../assets/video.png";
import { TbReportSearch } from "react-icons/tb";
import { FaRobot } from "react-icons/fa6";
import { PiReadCvLogoLight } from "react-icons/pi";
import { IoVideocam } from "react-icons/io5";
import { motion } from "motion/react";
const features = [
  {
    no: 1,
    subject: "AI-Powered Response Analysis",
    content:
      "Receive intelligent evaluation of your answers with detailed performance insights and improvement suggestions.",
    picture: aiEval,
    icon: <FaRobot size={20} />,
  },
  {
    no: 2,
    subject: "Real-Time Video Interviews",
    content:
      "Experience realistic face-to-face mock interviews through seamless live video interaction.",
    picture: video,
    icon: <IoVideocam size={20} />,
  },
  {
    no: 3,
    subject: "Comprehensive PDF Reports",
    content:
      "Download detailed interview performance reports with scores, feedback, and analytics in PDF format.",
    picture: pdf,
    icon: <TbReportSearch size={20} />,
  },
  {
    no: 4,
    subject: "Resume-Driven Interview Sessions",
    content:
      "Generate personalized interview questions tailored specifically to your resume and skill set.",
    picture: resume,
    icon: <PiReadCvLogoLight size={20} />,
  },
];
const FeaturesCards = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" flex flex-wrap items-center justify-center gap-3 text-4xl font-semibold my-10 mb-10">
        <div className="">InterviewIQ</div>
        <h1 className="bg-dark-garnet/30 font-bold rounded-xl mx-2 px-3 py-1">
          AI Capabilities
        </h1>
      </div>

      <div
        className="grid lg:grid-cols-2 grid-cols-1 
       gap-6 text-white mx-2"
      >
        {features.map((feature, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.5 } }}
            className="flex bg-dark-garnet p-8 rounded-2xl shadow-lg shadow-dark-garnet-800/50 gap-4 max-w-lg items-end"
            key={i}
          >
            <img
              src={feature.picture}
              className="transition-all duration-300 object-contain object-center w-full h-30 md:h-40 "
              alt=""
            />
            <div className="space-y-3">
              <div className="p-1 rounded-full border border-mauve w-fit">
                {feature.icon}
              </div>
              <h2 className="font-bold md:text-lg  text-sm">
                {feature.subject}
              </h2>
              <h4 className="font-medium text-xs">{feature.content}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCards;
