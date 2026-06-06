import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-mauve/40 backdrop-blur-sm flex justify-center items-center z-999">
      <BiLoaderAlt className="text-5xl text-white animate-spin" />
    </div>
  );
};

export const VariableLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <BiLoaderAlt size={30} className="text-5xl text-white animate-spin" />
    </div>
  );
};
