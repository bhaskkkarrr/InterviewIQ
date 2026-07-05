function InterviewerSignal({ aiState }) {
  const bars = 6;
  return (
    <div className="relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
      <div
        className={`absolute inset-0 rounded-full border transition-colors duration-700 ${
          aiState === "speaking"
            ? "border-[#6FE3C4]/50"
            : aiState === "thinking"
              ? "border-[#F4B860]/40"
              : "border-white/10"
        }`}
      />
      <div
        className={`absolute inset-3 rounded-full border transition-all duration-700 ${
          aiState === "speaking"
            ? "border-[#6FE3C4]/25 scale-105"
            : "border-white/5 scale-100"
        }`}
      />
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#1C2029]">
        <div className="flex items-end gap-1.5">
          {Array.from({ length: bars }).map((_, i) => (
            <span
              key={i}
              className={`w-1.5 rounded-full ${
                aiState === "speaking"
                  ? "bg-[#6FE3C4]"
                  : aiState === "thinking"
                    ? "bg-[#F4B860]"
                    : "bg-white/25"
              }`}
              style={{
                height:
                  aiState === "speaking"
                    ? "1.6rem"
                    : aiState === "thinking"
                      ? "0.6rem"
                      : "0.9rem",
                animation:
                  aiState === "speaking"
                    ? `sig-bounce 0.9s ease-in-out ${i * 0.11}s infinite`
                    : aiState === "idle"
                      ? `sig-breathe 2.6s ease-in-out ${i * 0.15}s infinite`
                      : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default InterviewerSignal;
