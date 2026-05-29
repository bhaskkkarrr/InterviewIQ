import React, { useState } from "react";
import NavBar from "../components/NavBar";
import HeroText from "../components/HeroText";
import StepsCard from "../components/StepsCard";
import FeaturesCards from "../components/FeaturesCards";
import Footer from "../components/Footer";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import ProfileModal from "../components/ProfileModal";
import LoaderCircle from "../components/LoaderCircle";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="w-full min-h-screen max-w-4xl mx-auto flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="mx-3 my-4 space-y-8"
      >
        <div className="">
          <NavBar />
        </div>
        <div className="">
          <HeroText />
        </div>
        <div className="flex my-12 flex-wrap justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-velvet-orchid text-mauve-50 px-5 py-2 rounded-full md:text-2xl text-lg font-semibold"
            onClick={
              user ? () => navigate("/interview") : () => setShowModal(true)
            }
          >
            Start Interview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-mauve text-velvet-orchid px-5 py-2 rounded-full md:text-2xl text-lg font-medium"
          >
            View History
          </motion.button>
        </div>
        <div className="">
          <StepsCard />
        </div>
        <div className="">
          <FeaturesCards />
        </div>
        <div className="">
          <Footer />
        </div>
      </motion.div>
      {showModal && (
        <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
      {user && <ProfileModal />}
    </div>
  );
};

export default Home;
