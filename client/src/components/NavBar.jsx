import { MdGeneratingTokens } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "./ProfileModal";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);
  return (
    <div className="w-full min-w-2xs max-w-4xl sm:mx-auto  text-linen-50 bg-dark-garnet rounded-2xl px-4 py-3 flex justify-between items-center ">
      <div className="font-bold cursor-pointer" onClick={() => navigate("/")}>
        Interview IQ
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* Credits */}
        <div
          className="flex justify-center gap-1 cursor-pointer items-center hover:bg-linen-50/70 bg-linen-50/50 rounded-full px-3 py-1"
          onClick={() => {
            if (user) {
              navigate("/pricing");
            }
          }}
        >
          <MdGeneratingTokens />
          {user ? user?.credits : 0}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <motion.div
            className="bg-linen hover:bg-linen-200 p-2 w-8 h-8 rounded-full text-dark-garnet flex justify-center items-center font-extrabold cursor-pointer"
            onClick={() => {
              if (user) {
                setShowModal((prev) => !prev);
              } else {
                setShowAuthModal(true);
              }
            }}
          >
            {user ? user.name[0] : <RiRobot3Fill />}
          </motion.div>

          {/* Modal */}
          {showModal && user && (
            <div className="absolute top-9 right-2 z-50">
              <ProfileModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
              />
            </div>
          )}
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
