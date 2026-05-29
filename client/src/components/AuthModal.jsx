import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { BsStars } from "react-icons/bs";
import { signInWithPopup } from "firebase/auth";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoaderCircle from "./LoaderCircle";

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    const res = await login();
    if (res.success) {
      onClose();
      navigate("/");
    }
  };
  return (
    <div
      className="fixed inset-0 w-full flex z-999 justify-center items-center min-h-screen bg-velvet-orchid/25 backdrop-blur"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" bg-linear-60 from-velvet-orchid-700 to-mauve-700 rounded-2xl text-mauve-50 shadow-2xl shadow-blac px-7 py-5 flex flex-col justify-center items-center space-y-4 mx-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex  justify-center text-3xl font-bold luckiest-guy uppercase md:text-4xl lg:text-5xl xl:text-6xl">
          Interview IQ
        </div>
        <div className="flex flex-col items-center justify-center bg-mauve/40 rounded-4xl px-8 py-1.5">
          <span className="sm:text-sm text-xs">Continue with</span>
          <span className="flex justify-center items-center gap-2 sm:text-2xl text-sm">
            <BsStars />
            AI Interview
          </span>
        </div>
        <p className="text-center">Sign in to continue with the InterviewIQ</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex gap-3 items-center justify-center bg-mauve px-3 py-1 rounded-full w-full text-velvet-orchid-900  shadow shadow-mauve font-semibold text-sm sm:text-lg"
          disabled={isLoading}
          onClick={handleGoogleAuth}
        >
          {isLoading ? (
            <div className="">
              <LoaderCircle />
            </div>
          ) : (
            <div className="flex gap-3 items-center justify-center text-velvet-orchid-900">
              <FcGoogle />
              Continue with Google
            </div>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AuthModal;
