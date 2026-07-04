import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { motion } from "motion/react";
const steps = [
  {
    icon: <FaCloudUploadAlt size={20} />,
    no: 1,
    subject: "Upload resume",
    boxWidth: "w-65",
    content: "Upload your resume",
  },
  {
    icon: <RiRobot2Fill size={20} />,
    no: 2,
    subject: "Start Mock Interview",
    content: "Give me the interview through live video conferencing",
  },
  {
    icon: <TbReportSearch size={20} />,
    no: 3,
    subject: "Evaluate Interview",
    content: "Get reports in PDFs form and evaluate interview",
  },
];
const StepsCard = () => {
  return (
    <div className="flex flex-wrap justify-center xl:gap-6 sm:gap-15 gap-20 mt-20 mx-5">
      {steps.map((step, i) => {
        return (
          <div className="" key={i}>
            <motion.div
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              className={`bg-linen p-7 flex justify-center flex-col hover:border-2 hover:border-dark-garnet transition-all duration-400 shadow-md shadow-dark-garnet/50 items-center rounded-3xl relative w-65 ${i % 2 == 0 ? "-rotate-3" : "rotate-3"}`}
            >
              <div className="absolute right-1/2.5 shadow-md shadow-olive-900 -top-4 bg-linen border-2 border-dark-garnet rounded-xl p-2">
                {step.icon}
              </div>
              <span className="mt-7 text-xs font-bold uppercase">
                Step: {step.no}
              </span>
              <h3 className="font-bold my-3 text-lg">{step.subject}</h3>
              <span className="text-center text-sm">{step.content}</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default StepsCard;
