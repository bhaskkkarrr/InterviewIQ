import React from "react";
import { RxCross1 } from "react-icons/rx";
import { motion } from "motion/react";
const ConfirmationModal = ({ isOpen, onClose, message, action }) => {
  if (!isOpen) return null;
  return (
    <div className="backdrop-blur-sm fixed inset-0 flex  justify-center items-center text-velvet-orchid">
      <div
        className="md:w-90 w-80 bg-mauve-50 border-2 border-velvet-orchid rounded-3xl p-7 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">Sure?</div>
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.2 }}
            className=""
          >
            <RxCross1 />
          </motion.button>
        </div>
        <p className="text-lg uppercase">{message}</p>
        <div className="flex ">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-velvet-orchid-600 px-3 py-1 text-xl text-mauve-50 rounded-full mr-3 w-1/2 hover:bg-velvet-orchid-700"
            onClick={action}
          >
            Yes
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-velvet-orchid-600 px-3 py-1 text-xl text-mauve-50 rounded-full w-1/2 hover:bg-velvet-orchid-700"
            onClick={onClose}
          >
            No
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
