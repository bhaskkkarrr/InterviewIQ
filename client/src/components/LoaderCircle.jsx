import React from "react";
import { BiLoader } from "react-icons/bi";

const LoaderCircle = () => {
  return (
    <div className="flex justify-center items-center">
      <BiLoader className="text-3xl text-white animate-spin" />
    </div>
  );
};

export default LoaderCircle;
