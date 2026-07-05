const ControlButton = ({ active, onClick, label, children }) => {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
        active
          ? "bg-[#6a0002]/8 text-[#6a0002] ring-1 ring-white/10 hover:bg-[#6a0002]/20"
          : "bg-[#6a0002]/15 text-[#6a0002] ring-1 ring-[#6a0002]/30"
      }`}
    >
      {children}
    </button>
  );
};

export default ControlButton;
