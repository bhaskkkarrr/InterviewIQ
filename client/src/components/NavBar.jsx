import { MdGeneratingTokens } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "./ProfileModal";
import { useState } from "react";
import AuthModal from "./AuthModal";

const NavBar = () => {
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div
      className="w-full min-w-2xs text-linen-50 bg-dark-garnet rounded-2xl px-4 py-3 flex justify-between items-center"
      onClick={() => setShowModal(false)}
    >
      <div className="font-bold">Interview IQ</div>

      <div className="flex items-center justify-center gap-4">
        {/* Credits */}
        <div className="flex justify-center gap-1 items-center bg-linen-50/50 rounded-full px-3 py-1">
          <MdGeneratingTokens />
          {user ? user.credit : 0}
        </div>

        {/* Profile */}
        <div className="relative">
          <motion.div
            className="bg-linen hover:bg-linen-200 p-2 w-8 h-8 rounded-full text-dark-garnet flex justify-center items-center font-extrabold cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
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
          {showAuthModal && (
            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
            />
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
