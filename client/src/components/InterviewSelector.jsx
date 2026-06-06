import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const InterviewSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Select");

  const interviewModes = ["Technical", "HR"];

  const handleSelect = (mode) => {
    console.log(mode);
    setSelectedMode(mode);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full text-sm relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <span>{selectedMode}</span>
        <div
          className={`w-5 h-5 flex justify-center items-center float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
        >
          <FaChevronDown />
        </div>
      </button>

      {isOpen && (
        <ul className="w-full absolute top-9 bg-white border border-gray-300 rounded shadow-md mt-1 py-2">
          {interviewModes.map((mode) => (
            <li
              key={mode}
              className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
              onClick={() => handleSelect(mode)}
            >
              {mode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InterviewSelector;
