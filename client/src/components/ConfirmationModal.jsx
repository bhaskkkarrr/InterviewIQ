import React from "react";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  message,
  action,
  title = "Are you sure?",
  confirmText = "Yes, continue",
  cancelText = "Cancel",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-linen-950/40 px-4 py-6 backdrop-blur-sm sm:px-6"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-modal-title"
            className="w-full max-w-md overflow-hidden rounded-3xl border border-linen-300 bg-linen-50 shadow-2xl shadow-linen-950/20"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-5 sm:px-7 sm:pt-7">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-dark-garnet-100 bg-dark-garnet-50 sm:size-12">
                  <AlertTriangle
                    size={22}
                    strokeWidth={2}
                    className="text-dark-garnet"
                  />
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-dark-garnet sm:text-xs">
                    Confirmation Required
                  </p>

                  <h2
                    id="confirmation-modal-title"
                    className="text-xl font-bold tracking-tight text-linen-950 sm:text-2xl"
                  >
                    {title}
                  </h2>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                aria-label="Close confirmation modal"
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-linen-600 transition-colors hover:bg-linen-200 hover:text-dark-garnet"
              >
                <RxCross1 size={18} />
              </motion.button>
            </div>

            {/* Message */}
            <div className="px-5 pb-6 sm:px-7">
              <p className="text-sm leading-6 text-linen-700 sm:text-base">
                {message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-linen-200 bg-linen-100/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-7 sm:py-5">
              <motion.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-xl border border-linen-300 bg-linen-50 px-5 py-3 text-sm font-semibold text-linen-800 transition-colors hover:border-linen-400 hover:bg-linen-100 focus:outline-none focus:ring-2 focus:ring-linen-400 focus:ring-offset-2 focus:ring-offset-linen-50 sm:w-auto"
              >
                {cancelText}
              </motion.button>

              <motion.button
                type="button"
                onClick={action}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-xl bg-dark-garnet px-5 py-3 text-sm font-semibold text-linen-50 shadow-md shadow-dark-garnet/15 transition-colors hover:bg-dark-garnet-900 focus:outline-none focus:ring-2 focus:ring-dark-garnet-400 focus:ring-offset-2 focus:ring-offset-linen-50 sm:w-auto"
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
