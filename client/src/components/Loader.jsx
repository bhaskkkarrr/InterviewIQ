import React from "react";
import { BiLoader } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-mauve/40 backdrop-blur-sm flex justify-center items-center z-999">
      <BiLoader className="text-5xl text-white animate-spin" />
    </div>
  );
};

export default Loader;
