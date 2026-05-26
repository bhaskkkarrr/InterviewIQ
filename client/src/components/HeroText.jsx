import React from "react";
import { BsStars } from "react-icons/bs";

const HeroText = () => {
  return (
    <div className=" md:space-y-7 space-y-5 flex flex-col items-center justify-center min-w-2xs">
      <div className="text-xs md:text-sm flex justify-center items-center gap-2">
        <BsStars />
        AI Powered Smart Interview Platform
      </div>
      <h1 className="flex gap-3 justify-center items-center flex-col">
        <div className="xl:text-6xl md:text-5xl sm:text-4xl text-2xl">
          Practice Interviews with
        </div>
        <strong className="xl:text-7xl md:text-6xl sm:text-5xl text-3xl bg-velvet-orchid/30 rounded-3xl px-4 py-2">
          AI Intelligence
        </strong>
      </h1>
      <h3 className="text-sm md:text-lg text-center">
        Smart resume-based mock interviews through
        <b> live video conferencing </b> with
        <strong> AI-powered interview evaluation</strong>
      </h3>
    </div>
  );
};

export default HeroText;
