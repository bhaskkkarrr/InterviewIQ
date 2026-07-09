import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ChevronRight,
  History,
  LogOut,
  Mail,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isOpen) return null;

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleHistory = () => {
    onClose();
    navigate("/history");
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logOut();
      setConfirmModal(false);
      onClose();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: -8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: -8,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-[calc(100vw-2rem)] max-w-80 overflow-hidden rounded-2xl border border-linen-300 bg-linen-50 text-linen-950 shadow-2xl shadow-linen-950/15 sm:w-80"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-linen-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <UserRound size={15} className="text-dark-garnet" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dark-garnet">
              Your Account
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close profile menu"
            className="flex size-8 items-center justify-center rounded-full text-linen-600 transition-colors hover:bg-linen-200 hover:text-dark-garnet"
          >
            <X size={17} />
          </motion.button>
        </div>

        {/* User information */}
        <div className="px-4 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-dark-garnet text-lg font-bold uppercase text-linen-50 shadow-md shadow-dark-garnet/15">
              {userInitial}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold capitalize text-linen-950">
                {user?.name || "User"}
              </p>

              <div className="mt-1 flex min-w-0 items-center gap-1.5">
                <Mail size={12} className="shrink-0 text-linen-500" />

                <p className="truncate text-xs text-linen-600">
                  {user?.email || "Email not available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu options */}
        <div className="border-t border-linen-200 px-2 py-2">
          <motion.button
            type="button"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleHistory}
            className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors hover:bg-linen-100"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-linen-200 text-linen-800 transition-colors group-hover:bg-dark-garnet-50 group-hover:text-dark-garnet">
                <History size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-linen-900">
                  Interview History
                </p>

                <p className="mt-0.5 text-[11px] text-linen-500">
                  View your previous interviews
                </p>
              </div>
            </div>

            <ChevronRight
              size={16}
              className="text-linen-400 transition-colors group-hover:text-dark-garnet"
            />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setConfirmModal(true);
            }}
            className="group mt-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors hover:bg-dark-garnet-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-dark-garnet-50 text-dark-garnet transition-colors group-hover:bg-dark-garnet group-hover:text-linen-50">
                <LogOut size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-dark-garnet">
                  Sign Out
                </p>

                <p className="mt-0.5 text-[11px] text-linen-500">
                  Sign out from this account
                </p>
              </div>
            </div>

            <ChevronRight
              size={16}
              className="text-linen-400 transition-colors group-hover:text-dark-garnet"
            />
          </motion.button>
        </div>

        {/* Footer */}
        <div className="border-t border-linen-200 bg-linen-100/70 px-4 py-3">
          <p className="text-center text-[10px] uppercase tracking-[0.15em] text-linen-500">
            InterviewIQ Account
          </p>
        </div>
      </motion.div>

      <ConfirmationModal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        message="You will be signed out from your InterviewIQ account. You can sign in again anytime."
        title="Sign out of your account?"
        confirmText={isLoggingOut ? "Signing out..." : "Yes, sign out"}
        cancelText="Stay signed in"
        action={handleLogout}
      />
    </>
  );
};

export default ProfileModal;
