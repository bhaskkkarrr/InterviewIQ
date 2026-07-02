import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Captions,
  PhoneOff,
  Clock,
  ChevronRight,
  ChevronDown,
  CircleDot,
  CheckCircle2,
  Cross,
  CircleX,
} from "lucide-react";
import logo from "/logo.png";
import { useInterview } from "../../context/InterviewContext";
import LoaderCircle from "../LoaderCircle";
import { InterviewStartLoader } from "../Loaders";

const demoData = {
  success: true,
  message: "Evaluation successful",
  evaluation: {
    score: 0,
    feedback:
      "The response is partially correct but lacks implementation details and specific examples. The candidate should provide more concrete information about how they implemented React components or APIs rather than just stating what technologies were used.",
    strengths: [],
    weaknesses: ["Lacked implementation details", "Missed specific examples"],
    confidence: 0,
    correctness: 3,
    communication: 7,
  },
  interviewSession: {
    _id: "6a463b53b5d72b4b8c8ef187",
    userId: "69d7ac1f2e8f575aece4600d",
    username: "Bhaskar Chauhan",
    status: "Incomplete",
    resume:
      "B H A S K A R  C H A U H A N\n+ 9 1 - 9 5 8 2 3 0 7 7 3 6  |  b h a s k a r c h a u h a n 7 4 8 @ g m a i l . c o m  |  h t t p s : / / g i t h u b . c o m / b h a s k k k a r r r  |  h t t p : / / w w w . l i n k e d i n . c o m / i n / b h a s k k k a r r r\nS U M M A R Y\nM E R N  S t a c k  D e v e l o p e r  w i t h  h a n d s - o n  p r o j e c t  e x p e r i e n c e  i n  R e a c t ,  N o d e . j s ,  a n d  M o n g o D B .  P r o f i c i e n t  i n  P y t h o n ,\nN u m P y ,  a n d  P a n d a s ,  w i t h  a  s t r o n g  f o c u s  o n  b r e a k i n g  i n t o  M a c h i n e  L e a r n i n g  a n d  G e n e r a t i v e  A I .  P a s s i o n a t e  a b o u t\nb u i l d i n g  i n t e l l i g e n t ,  s c a l a b l e  w e b  a p p l i c a t i o n s .\nS K I L L\nL a n g u a g e s :   C + + ,  J a v a S c r i p t ,  P y t h o n\nF r o n t e n d :  R e a c t . j s ,  H T M L 5 ,  C S S 3 ,  B o o t s t r a p ,  T a i l w i n d  C S S\nB a c k e n d :  N o d e . j s ,  E x p r e s s . j s ,  R E S T  A P I s\nD a t a b a s e :  M o n g o D B\nD a t a  S c i e n c e  L i b r a r i e s :  N u m p y ,  P a n d a s ,  M a t p l o t l i b ,  S e a b o r n\nT o o l s  &  P l a t f o r m s :  G i t H u b ,  V S  C o d e ,  P o s t m a n ,  V e r c e l ,  R e n d e r ,  N e t l i f y\nS o f t  S k i l l s :  P r o b l e m - s o l v i n g ,  C o m m u n i c a t i o n ,  T e a m  c o l l a b o r a t i o n\nP R O J E C T S\n2 .  I P L  2 0 2 5  B a t t e r s  –  E x p l o r a t o r y  D a t a  A n a l y s i s  |  G i t H u b\nT e c h  S t a c k :  P y t h o n ,  P a n d a s ,  N u m P y ,  J u p y t e r  N o t e b o o k  \nP e r f o r m e d  e n d - t o - e n d  E D A  o n  I P L  2 0 2 5  b a t t i n g  d a t a s e t  u s i n g  P y t h o n ,  P a n d a s ,  a n d  N u m P y\nE x t r a c t e d  t e a m - l e v e l  i n s i g h t s  u s i n g  G r o u p B y  a g g r e g a t i o n s  —  i d e n t i f i e d  t o p  r u n - s c o r e r s ,  b e s t  s t r i k e  r a t e s ,  a n d\nm o s t  c o n s i s t e n t  b a t t e r s  p e r  t e a m\nF i l t e r e d  a n d  r a n k e d  p l a y e r s  u s i n g  m u l t i - c o n d i t i o n  q u e r i e s  a c r o s s  1 0 +  s t a t i s t i c a l  a t t r i b u t e s\n3 .  S c a n M y M e n u  –  Q R - B a s e d  R e s t a u r a n t  O r d e r i n g  S a a S  |  L i v e  D e m o  |  G i t H u b\nB u i l t  a  f u l l - s t a c k  w e b  a p p  t h a t  a l l o w s  r e s t a u r a n t s  t o  g e n e r a t e  a  Q R  c o d e  f o r  t h e i r  m e n u  —  c u s t o m e r s  s c a n  i t  a n d  i n s t a n t l y\nv i e w  t h e  m e n u  w i t h o u t  a n y  a p p  d o w n l o a d\nB u i l t  a  r e s t a u r a n t  a d m i n  p a n e l  w h e r e  o w n e r s  c a n  a d d ,  e d i t ,  a n d  d e l e t e  f o o d  i t e m s  a n d  m a n a g e  f o o d  c a t e g o r i e s\nd y n a m i c a l l y\nD e s i g n e d  a n d  i m p l e m e n t e d  R E S T  A P I s  w i t h  N o d e . j s  a n d  E x p r e s s  f o r  m e n u  a n d  c a t e g o r y  C R U D  o p e r a t i o n s  b a c k e d  b y\nM o n g o D B\nT e c h  S t a c k :  R e a c t . j s ,  N o d e . j s ,  E x p r e s s . j s ,  M o n g o D B ,  V e r c e l ,  R e n d e r\n1 .  B a c k e n d  A u t h e n t i c a t i o n  S y s t e m  |  G i t H u b\nT e c h  S t a c k :  N o d e . j s ,  E x p r e s s . j s ,  M o n g o D B ,  M o n g o o s e ,  J W T ,  N o d e m a i l e r ,  C r y p t o\nI m p l e m e n t e d  f u l l  a u t h  f l o w :  u s e r  r e g i s t r a t i o n ,  e m a i l  O T P  v e r i f i c a t i o n ,  l o g i n ,  l o g o u t ,  a n d  l o g o u t  f r o m  a l l  d e v i c e s\nE n g i n e e r e d  J W T - b a s e d  a c c e s s  &  r e f r e s h  t o k e n  s y s t e m  w i t h  1 0 - m i n u t e  a c c e s s  t o k e n s  a n d  7 - d a y  r o t a t i n g  r e f r e s h  t o k e n s\ns t o r e d  a s  H t t p O n l y  c o o k i e s\nI m p l e m e n t e d  s e s s i o n  m a n a g e m e n t  w i t h  I P  a n d  u s e r - a g e n t  t r a c k i n g ;  s e s s i o n s  c a n  b e  i n d i v i d u a l l y  o r  b u l k - r e v o k e d\nI n t e g r a t e d  e m a i l  s e r v i c e  f o r  O T P  d e l i v e r y  w i t h  H T M L  e m a i l  t e m p l a t e s\nA D D I T I O N A L  I N F O R M A T I O N\nL a n g u a g e s :  E n g l i s h ,  H i n d i\nC e r t i f i c a t i o n s :  -  H T M L ,  C S S  &  J a v a S c r i p t  f o r  B e g i n n e r s ,  W o r k s h o p  o n  G a m e  D e v e l o p m e n t  u s i n g  P y t h o n\nE D U C A T I O N\nB a c h e l o r  o f  C o m p u t e r  a n d  A p p l i c a t i o n\nI n s t i t u t e  o f  T e c h n o l o g y  a n d  S c i e n c e  ( C C S U )\n 2 0 2 4  - 2 0 2 7  ( E x p e c t e d )\nS e n i o r  S e c o n d a r y  ( C l a s s  X I I ) ,  C B S E\nI n d r a p r a s t h a  P u b l i c  S c h o o l ,  G h a z i a b a d  -  8 8 %\n2 0 2 3  -  2 0 2 4",
    totalQuestion: 3,
    finalScore: 7.25,
    history: [
      {
        question:
          "Can you tell me about your experience with React.js and how it fits into the MERN stack?",
        difficulty: "user",
        strengths: [],
        weaknesses: [
          "Lacked implementation details",
          "Missed specific examples",
        ],
        topic: "Resume",
        answered: true,
        score: 3,
        confidence: 4,
        correctness: 5,
        communication: 7,
        _id: "6a463b56b5d72b4b8c8ef188",
        createdAt: "2026-07-02T10:20:06.130Z",
        updatedAt: "2026-07-02T10:20:26.387Z",
        answer:
          "The project is called ScanMyMenu, allows customers to scan a QR code, browse the digital menu, add items to their cart, and place orders. It also includes an admin dashboard where restaurant owners can manage menu items, categories. For the frontend, I used React.js, React Router, and Tailwind CSS to build a responsive and interactive user interface. On the backend, I used Node.js and Express.js to develop REST APIs, while MongoDB was used to store user, menu, and order data",
        feedback:
          "The response is partially correct but lacks implementation details and specific examples. The candidate should provide more concrete information about how they implemented React components or APIs rather than just stating what technologies were used.",
      },
      {
        question:
          "Could you walk me through the design and implementation of your backend authentication system for ScanMyMenu? What challenges did you face and how did you overcome them?",
        difficulty: "Medium",
        strengths: [],
        weaknesses: [
          "Lacked implementation details",
          "Missed specific examples",
        ],
        topic: "Projects",
        answered: true,
        score: 0,
        confidence: 0,
        correctness: 3,
        communication: 7,
        _id: "6a463b6ab5d72b4b8c8ef18c",
        createdAt: "2026-07-02T10:20:26.387Z",
        updatedAt: "2026-07-02T10:20:40.300Z",
        answer:
          "The project is called ScanMyMenu, allows customers to scan a QR code, browse the digital menu, add items to their cart, and place orders. It also includes an admin dashboard where restaurant owners can manage menu items, categories. For the frontend, I used React.js, React Router, and Tailwind CSS to build a responsive and interactive user interface. On the backend, I used Node.js and Express.js to develop REST APIs, while MongoDB was used to store user, menu, and order data",
        feedback:
          "The response is partially correct but lacks implementation details and specific examples. The candidate should provide more concrete information about how they implemented React components or APIs rather than just stating what technologies were used.",
      },
      {
        question:
          "Could you walk me through the design and implementation of your backend authentication system for ScanMyMenu? What challenges did you face and how did you overcome them?",
        difficulty: "Medium",
        strengths: [],
        weaknesses: [],
        topic: "Projects",
        answered: false,
        score: 0,
        confidence: 0,
        correctness: 0,
        communication: 0,
        _id: "6a463b78b5d72b4b8c8ef191",
        createdAt: "2026-07-02T10:20:40.300Z",
        updatedAt: "2026-07-02T10:20:40.300Z",
      },
    ],
    createdAt: "2026-07-02T10:20:03.845Z",
    updatedAt: "2026-07-02T10:20:40.300Z",
    __v: 3,
    lastQuestion: {
      question:
        "Could you walk me through the design and implementation of your backend authentication system for ScanMyMenu? What challenges did you face and how did you overcome them?",
      difficulty: "Medium",
      strengths: [],
      weaknesses: [],
      topic: "Projects",
      answered: false,
      score: 0,
      confidence: 0,
      correctness: 0,
      communication: 0,
      _id: "6a463b78b5d72b4b8c8ef190",
      createdAt: "2026-07-02T10:20:40.299Z",
      updatedAt: "2026-07-02T10:20:40.299Z",
    },
  },
};

const DIFFICULTY_STYLES = {
  Easy: "text-[#093d2f] bg-[#093d2f]/10 ring-1 ring-[#093d2f]/50",
  Medium: "text-[#f69f1c] bg-[#f69f1c]/10 ring-1 ring-[#f69f1c]/50",
  Hard: "text-[#FF6B57] bg-[#FF6B57]/10 ring-1 ring-[#FF6B57]/50",
};

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// A calm, audio-reactive listening indicator standing in for the AI
// interviewer's "face". Bars breathe gently at rest, animate faster while
// the AI is speaking, and hold still while it's thinking.
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

export default function InterviewSessionPage() {
  const interviewData = demoData.interviewSession;
  // const [interviewData, setInterviewData] = useState(null);
  const { preparingInterview, setPreparingInterview } = useInterview();
  const [elapsed, setElapsed] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [transcriptOpen, setTranscriptOpen] = useState(true);
  const [aiState, setAiState] = useState("speaking"); // speaking | thinking | idle
  const [confirmEnd, setConfirmEnd] = useState(false);
  const transcriptRef = useRef(null);

  const currentQuestion =
    interviewData.history[interviewData.history.length - 1];
  const answeredCount = interviewData.history.filter((h) => h.answered).length;
  // Timer
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Demo-only state cycle so the panel feels alive; swap for real voice
  // pipeline events (onSpeechStart, onSpeechEnd, onAiThinking, etc.)
  // useEffect(() => {
  //   const cycle = ["speaking", "idle", "thinking", "idle"];
  //   let i = 0;
  //   const t = setInterval(() => {
  //     i = (i + 1) % cycle.length;
  //     setAiState(cycle[i]);
  //   }, 4000);
  //   return () => clearInterval(t);
  // }, []);

  const handleEnd = useCallback(() => {
    setConfirmEnd(false);
    // wire up: call end-interview endpoint, then route to report page
  }, []);

  return (
    <div className="min-h-screen w-full bg-linen text-dark-garnet antialiased">
      {preparingInterview ? (
        <div className="min-h-screen flex justify-center flex-col items-center">
          <InterviewStartLoader />
        </div>
      ) : (
        <div className="">
          <div className="mx-auto flex min-h-screen max-w-350 flex-col">
            {/* Top bar */}
            <header className="flex items-center justify-between border-b border-white/8 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Logo"
                  className="object-contain shadow-xl shadow-black/20 h-8 w-8 rounded-md"
                />
                <div className="hidden sm:block">
                  <p className="font-display text-sm font-semibold leading-none text-[#6a0002]">
                    InterviewIQ
                  </p>
                  <p className="mt-0.5 text-xs text-[#3d4046]">
                    Mock AI Interview
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#6a0002] px-3 py-1.5 ring-1 ring-white/8">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-[#FF6B57]"
                    style={{ animation: "rec-pulse 1.6s ease-in-out infinite" }}
                  />
                </span>
                <span className="font-mono-ui text-xs text-[#ced0d6]">REC</span>
                <span className="font-mono-ui text-xs text-white/90">
                  {formatTime(elapsed)}
                </span>
              </div>

              <button
                onClick={() => setConfirmEnd(true)}
                className="flex items-center gap-1.5 rounded-full bg-[#6a0002]/10 px-3 py-1.5 text-xs font-medium text-[#6a0002] ring-1 ring-[#6a0002]/30 transition-colors hover:bg-[#6a0002]/20 sm:px-4 sm:text-sm"
              >
                <PhoneOff className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">End interview</span>
              </button>
            </header>

            {/* Main area */}
            <main className="grid flex-1 grid-cols-1 gap-px bg-white/8 lg:grid-cols-[1fr_380px]">
              {/* Video / AI panel */}
              <section className="flex flex-col ">
                <div className="relative flex flex-1 rounded-2xl shadow-lg shadow-black/40 bg-[#14171F] mx-5 min-w-xs flex-col items-center justify-center gap-5 px-6 py-10">
                  <InterviewerSignal aiState={aiState} />
                  <div className="text-center">
                    <p className="font-display text-base font-semibold text-white sm:text-lg">
                      AI Interviewer
                    </p>
                    <p className="mt-1 font-mono-ui text-xs uppercase tracking-wide text-[#8B93A7]">
                      {aiState === "speaking"
                        ? "Speaking"
                        : aiState === "thinking"
                          ? "Reviewing your answer"
                          : "Listening"}
                    </p>
                  </div>

                  {/* Candidate PiP */}
                  <div className="absolute bottom-5 right-5 flex h-24 w-32 items-center justify-center overflow-hidden rounded-lg bg-[#1C2029] ring-1 ring-white/10 sm:h-28 sm:w-40">
                    {camOn ? (
                      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#1C2029] to-[#232838]">
                        <span className="font-display text-sm text-white/70">
                          {interviewData.username
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "NA"}
                        </span>
                      </div>
                    ) : (
                      <VideoOff className="h-5 w-5 text-[#8B93A7]" />
                    )}
                    <span className="absolute bottom-1 left-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/80">
                      You
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3 text-[#6a0002] border-t border-white/8 px-6 py-4 sm:gap-4">
                  <ControlButton
                    active={micOn}
                    onClick={() => setMicOn((v) => !v)}
                    label={micOn ? "Mute" : "Unmute"}
                  >
                    {micOn ? (
                      <Mic className="h-4.5 w-4.5" />
                    ) : (
                      <MicOff className="h-4.5 w-4.5" />
                    )}
                  </ControlButton>
                  <ControlButton
                    active={camOn}
                    onClick={() => setCamOn((v) => !v)}
                    label={camOn ? "Stop video" : "Start video"}
                  >
                    {camOn ? (
                      <Video className="h-4.5 w-4.5" />
                    ) : (
                      <VideoOff className="h-4.5 w-4.5" />
                    )}
                  </ControlButton>
                </div>
              </section>

              {/* Sidebar */}
              <aside className="flex flex-col">
                {/* Current question */}
                <div className="border-b border-white/8 px-5 py-5">
                  <div className="flex justify-between">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-[#6a0002]/12 px-2.5 py-1 text-[11px] font-medium text-[#6a0002] ring-1 ring-[#6a0002]/50">
                        {currentQuestion.topic}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          DIFFICULTY_STYLES[currentQuestion.difficulty] ||
                          DIFFICULTY_STYLES.Easy
                        }`}
                      >
                        {currentQuestion.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="font-mono-ui text-[11px] uppercase tracking-wide text-[#8B93A7]">
                    Question {interviewData.history.length}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-medium leading-snug text-black sm:text-xl">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Progress */}
                <div className="border-b border-[#6a0002]/20 ms-3 px-5 py-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-medium text-[#8B93A7]">
                      Session progress
                    </p>
                    <p className="font-mono-ui text-xs text-[#8B93A7]">
                      {answeredCount} answered
                    </p>
                  </div>
                  <ol className="space-y-3 max-h-36 overflow-y-auto">
                    {interviewData.history.map((h, idx) => {
                      const isCurrent =
                        idx === interviewData.history.length - 1;
                      return (
                        <li
                          key={h._id}
                          className="flex items-start gap-3 max-h-48 "
                        >
                          <div className="mt-0.5 shrink-0">
                            {h.answered ? (
                              <CheckCircle2 className="h-4 w-4 text-[#6FE3C4]" />
                            ) : isCurrent ? (
                              <CircleDot className={`h-4 w-4 text-[#706c6c]`} />
                            ) : (
                              <CircleX className={`h-4 w-4 text-dark-garnet`} />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`truncate text-sm ${
                                isCurrent
                                  ? "text-black"
                                  : h.answered
                                    ? "text-black/80"
                                    : "text-dark-garnet"
                              }`}
                            >
                              {h.question}
                            </p>
                            {h.answered && h.score != null && (
                              <p className="mt-0.5 font-mono-ui text-[11px] text-[#8B93A7]">
                                Score {h.score}/10
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* Transcript */}
                <div className="flex flex-1 flex-col">
                  <button
                    onClick={() => setTranscriptOpen((v) => !v)}
                    className="flex items-center justify-between px-5 py-4 text-xs font-medium text-[#8B93A7]"
                  >
                    Live transcript
                    {transcriptOpen ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                  {transcriptOpen && (
                    <div
                      ref={transcriptRef}
                      className="flex-1 space-y-3 overflow-y-auto px-5 pb-5"
                      style={{ maxHeight: 220 }}
                    >
                      {demoData.interviewSession.history.map((h, idx) => (
                        <div className="text-black text-[11px]" key={idx}>
                          <div className="me-3 justify-start">
                            <b>Interviewer:</b> {h.question}
                          </div>
                          <div className="ms-3 justify-end">
                            {" "}
                            <b>Candidate:</b> {h.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </aside>
            </main>
          </div>

          {/* End interview confirmation */}
          {confirmEnd && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
              <div className="w-full max-w-sm rounded-xl bg-[#1C2029] p-6 ring-1 ring-white/10">
                <p className="font-display text-lg font-semibold text-white">
                  End this interview?
                </p>
                <p className="mt-2 text-sm text-[#8B93A7]">
                  Your report will be generated. You can't resume this session
                  afterward.
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => setConfirmEnd(false)}
                    className="flex-1 rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/10 transition-colors hover:bg-white/10"
                  >
                    Keep going
                  </button>
                  <button
                    onClick={handleEnd}
                    className="flex-1 rounded-lg bg-dark-garnet px-4 py-2.5 text-sm font-medium text-white hover:text-[#e0d7d7] transition-colors hover:bg-dark-garnet/90"
                  >
                    End & get report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ControlButton({ active, onClick, label, children }) {
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
}
