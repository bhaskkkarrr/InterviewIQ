import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MdOutlineSearchOff } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-dark-garnet-900 via-dark-garnet-800 to-dark-garnet-900 px-4 py-16 sm:px-6">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-velvet-orchid-800/30 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-mauve-100/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linen/5 blur-3xl" />

      {/* Faint outline "404" behind content, for depth */}
      <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[16rem] font-black leading-none text-linen/4 sm:text-[24rem]">
        404
      </span>

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        {/* Icon badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-mauve-100/60 bg-linen/5 sm:h-24 sm:w-24"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <MdOutlineSearchOff size={38} className="text-linen sm:size-11" />
          </motion.div>
        </motion.div>

        {/* 404 headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl font-black tracking-tight text-linen sm:text-7xl md:text-8xl"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-xl font-semibold text-linen sm:text-2xl"
        >
          Page not found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-3 max-w-sm text-sm text-linen/70 sm:text-base"
        >
          The page you're looking for doesn't exist, may have moved, or the link
          might be broken. Let's get you back on track.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Link to="/" className="w-full sm:w-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linen px-6 py-3 font-bold text-dark-garnet shadow-lg shadow-mauve-800/30 transition-colors hover:bg-linen/90 sm:w-auto"
            >
              <FaHome size={16} />
              Back to home
            </motion.button>
          </Link>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => window.history.back()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-linen/30 bg-transparent px-6 py-3 font-bold text-linen transition-colors hover:border-linen/60 hover:bg-linen/5 sm:w-auto"
          >
            <IoArrowBack size={16} />
            Go back
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-xs text-linen/40"
        >
          Error code: 404 &middot; If you think this is a mistake, contact
          support.
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
