import { BiLoader } from "react-icons/bi";
import { MdGeneratingTokens } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { token, user, isLoading } = useAuth();
  return (
    <div className="w-full min-w-2xs text-mauve-50 bg-velvet-orchid rounded-2xl px-4 py-3 flex justify-between items-center">
      <div className="font-bold">Interview IQ</div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex justify-center gap-1 items-center bg-mauve-50/50 rounded-full px-3 py-1">
          <MdGeneratingTokens />
          {user ? user.credit : 0}
        </div>
        <motion.div className="bg-mauve hover:bg-mauve-200 p-2 w-8 h-8 rounded-full text-velvet-orchid-800 flex justify-center items-center font-extrabold">
          {user ? user.name[0] : <RiRobot3Fill />}
        </motion.div>
      </div>
    </div>
  );
};

export default NavBar;
