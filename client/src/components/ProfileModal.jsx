import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import { motion } from "motion/react";
import ConfirmationModal from "./ConfirmationModal";
const ProfileModal = ({ isOpen, onClose }) => {
  const { user, logOut } = useAuth();
  const [confirmModal, setConfirmModal] = useState(false);
  const logout = async () => {
    await logOut();
  };
  return (
    <div className=" w-60 bg-velvet-orchid-100 border-2 rounded-2xl border-velvet-orchid text-velvet-orchid">
      <div className="px-4 py-2 flex flex-col space-y-2">
        <div className="flex  justify-start gap-3 items-center">
          <div className="w-7 h-7 text-sm flex justify-center items-center rounded-full  text-mauve-50 bg-velvet-orchid">
            {user?.name[0]}
          </div>
          <span className="font-bold text-[13px] uppercase">{user?.name}</span>
        </div>

        <span className="text-xs truncate">{user?.email}</span>
        <div className="uppercase text-xs hover:underline cursor-pointer text-mauve-800/60">
          View History
        </div>
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          className="flex justify-start  cursor-pointer gap-2 items-center"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmModal(true);
          }}
        >
          <IoIosLogOut />
          Sign Out
        </motion.div>
      </div>
      {confirmModal && (
        <ConfirmationModal
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
          message={"Are you sure want to sign out?"}
          action={logout}
        />
      )}
    </div>
  );
};

export default ProfileModal;
