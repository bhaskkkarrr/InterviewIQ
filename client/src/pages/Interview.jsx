import React from "react";
import { GiModernCity } from "react-icons/gi";
import { FaVideo } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";

const Interview = () => {
  return (
    <div className="w-full min-h-screen justify-center max-w-4xl mx-auto flex flex-col">
      <div className="w-full flex md:flex-row flex-col">
        <div className="md:w-1/2 w-full p-8 space-y-6 bg-velvet-orchid-700 md:rounded-l-3xl rounded-t-3xl md:rounded-t-none text-mauve-50">
          <h3 className="text-center font-extrabold text-3xl">
            Start Your AI Interview
          </h3>
          <p className="text-sm">
            Practice real interview scenerios powered by AI. Improve
            communication skills, technical skills and boost your confidence
          </p>
          <div className="text-velvet-orchid space-y-3">
            <div className="bg-mauve-50 rounded-xl px-3 py-2 flex items-center gap-3 ">
              <GiModernCity />
              Mode Based
            </div>
            <div className="bg-mauve-50 rounded-xl px-3 py-2 flex items-center gap-3">
              <FaVideo />
              Live Video Interview
            </div>
            <div className="bg-mauve-50 rounded-xl px-3 py-2 flex items-center gap-3">
              <IoAnalyticsSharp />
              Smart AI Analytics
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full bg-velvet-orchid-200  p-8   md:rounded-r-3xl rounded-b-3xl md:rounded-b-none text-velvet-orchid">
          <input type="file" name="Hello" id="" placeholder="Choos" />
        </div>
      </div>
    </div>
  );
};

export default Interview;
