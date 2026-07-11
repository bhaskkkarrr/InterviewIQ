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
import { InterviewStartLoader } from "../Loaders";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import ControlButton from "../ControlButton";
import InterviewerSignal from "../InterviewerSignal";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";

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

export default function InterviewSessionPage() {
  const {
    preparingInterview,
    setPreparingInterview,
    interviewState,
    currentQuestion,
    interviewOn,
    handleInterviewProcess,
    setInterviewOn,
    handleEndInterview,
  } = useInterview();
  const navigate = useNavigate();
  const interviewData = interviewState;
  const [elapsed, setElapsed] = useState(0);
  const [camOn, setCamOn] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [transcriptOpen, setTranscriptOpen] = useState(true);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const transcriptRef = useRef(null);
  const [aiState, setAiState] = useState("idle");
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState("");
  const [interimAnswer, setInterimAnswer] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);
  const shouldSubmitRef = useRef(false);
  const silenceTimerRef = useRef(null);
  const answerRef = useRef("");
  const previousQuestionRef = useRef(null);
  const speakerEnabledRef = useRef(true);
  const introPlayedRef = useRef(false);
  const isProcessingAnswerRef = useRef(false);
  const handleInterviewProcessRef = useRef(handleInterviewProcess);

  useEffect(() => {
    handleInterviewProcessRef.current = handleInterviewProcess;
  }, [handleInterviewProcess]);

  const speak = useCallback((text) => {
    return new Promise((resolve) => {
      if (!text?.trim() || !speakerEnabledRef.current) {
        resolve();
        return;
      }

      // Never submit because TTS stopped the microphone
      shouldSubmitRef.current = false;

      // Stop candidate recognition before AI speaks
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Recognition was already stopped
        }
      }

      setIsListening(false);
      setInterimAnswer("");

      // Stop any previous AI speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = "en-IN";
      utterance.rate = 0.92;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAiSpeaking(true);
        setAiState("speaking");
      };

      utterance.onend = () => {
        setIsAiSpeaking(false);
        setAiState("idle");
        resolve();
      };

      utterance.onerror = (event) => {
        console.log("TTS ended:", event.error);

        setIsAiSpeaking(false);
        setAiState("idle");

        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const stopSpeaking = () => {
    speakerEnabledRef.current = false;

    setSpeakerEnabled(false);
    setIsAiSpeaking(false);
    setAiState("idle");

    window.speechSynthesis.cancel();
  };

  const enableSpeaker = () => {
    speakerEnabledRef.current = true;
    setSpeakerEnabled(true);
  };

  const repeatQuestion = async () => {
    if (!currentQuestion?.question) return;

    speakerEnabledRef.current = true;
    setSpeakerEnabled(true);

    await speak(currentQuestion?.question);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition is not supported in this browser");
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("Microphone started");

      setIsListening(true);
      setAiState("idle");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let temporaryTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += text + " ";
        } else {
          temporaryTranscript += text;
        }
      }

      if (finalTranscript) {
        setAnswer((previousAnswer) => {
          const updatedAnswer = `${previousAnswer} ${finalTranscript}`.trim();

          answerRef.current = updatedAnswer;

          return updatedAnswer;
        });
      }

      setInterimAnswer(temporaryTranscript);

      // Every time candidate speaks, restart silence countdown
      startSilenceTimer();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      // Never submit answer because of recognition error
      shouldSubmitRef.current = false;

      clearTimeout(silenceTimerRef.current);

      setIsListening(false);
    };

    recognition.onend = async () => {
      console.log("Microphone stopped");

      clearTimeout(silenceTimerRef.current);

      setIsListening(false);
      setInterimAnswer("");

      // Only submit when stopped by 6-second silence timer
      if (!shouldSubmitRef.current) {
        return;
      }

      // Reset immediately so another onend cannot submit again
      shouldSubmitRef.current = false;

      // Prevent duplicate backend requests
      if (isProcessingAnswerRef.current) {
        console.log("Answer is already being processed");
        return;
      }

      const finalAnswer = answerRef.current.trim();

      if (!finalAnswer) {
        console.log("No answer to submit");
        return;
      }

      isProcessingAnswerRef.current = true;

      try {
        console.log("Sending candidate answer:", finalAnswer);

        setAiState("thinking");

        const result = await handleInterviewProcessRef.current(finalAnswer);

        if (result?.success) {
          setAnswer("");
          answerRef.current = "";
          setInterimAnswer("");

          if (result.interviewCompleted) {
            console.log("Interview completed");

            shouldSubmitRef.current = false;
            clearTimeout(silenceTimerRef.current);

            window.speechSynthesis.cancel();

            setIsListening(false);
            setIsAiSpeaking(false);
            setAiState("idle");

            setInterviewOn(false);

            navigate(`/${result.interviewSession._id}/report`);

            return;
          }

          console.log("Answer processed successfully");
        } else {
          console.log("Failed to process answer");
        }
      } catch (error) {
        console.error("Error processing answer:", error);
      } finally {
        isProcessingAnswerRef.current = false;
        setAiState("idle");
      }
    };

    recognitionRef.current = recognition;

    return () => {
      clearTimeout(silenceTimerRef.current);

      shouldSubmitRef.current = false;

      try {
        recognition.abort();
      } catch {
        // Already stopped
      }
    };
  }, []);

  const wait = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  useEffect(() => {
    if (preparingInterview) return;
    if (!currentQuestion?.question) return;

    // Prevent greeting from playing twice
    if (introPlayedRef.current) return;

    introPlayedRef.current = true;

    const startConversation = async () => {
      await wait(300);
      await speak(
        `Hello ${interviewData.username}. Welcome to your Interview IQ mock interview. I will be your A I interviewer today.`,
      );

      await wait(500);

      if (!speakerEnabledRef.current) return;

      previousQuestionRef.current = currentQuestion?.question;

      await speak(currentQuestion?.question);
    };

    startConversation();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [
    preparingInterview,
    currentQuestion?.question,
    interviewData?.username,
    speak,
  ]);

  const startListening = () => {
    if (!speechSupported) {
      console.log("Speech recognition is not supported");
      return;
    }

    if (isAiSpeaking) {
      console.log("Wait until AI finishes speaking");
      return;
    }

    if (isProcessingAnswerRef.current) {
      console.log("Previous answer is still being processed");
      return;
    }

    if (!recognitionRef.current) {
      return;
    }

    // Clear previous answer before starting a fresh answer
    answerRef.current = "";
    shouldSubmitRef.current = false;

    clearTimeout(silenceTimerRef.current);

    setAnswer("");
    setInterimAnswer("");

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.log("Recognition already running:", error);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    // Manual stop must never auto-submit
    shouldSubmitRef.current = false;

    clearTimeout(silenceTimerRef.current);

    try {
      recognitionRef.current.stop();
    } catch (error) {
      console.log("Recognition already stopped:", error);
    }
  };

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  const startSilenceTimer = () => {
    clearTimeout(silenceTimerRef.current);

    silenceTimerRef.current = setTimeout(() => {
      const finalAnswer = answerRef.current.trim();

      if (!finalAnswer) {
        console.log("Silence detected, but candidate has not answered");
        return;
      }

      console.log("6 seconds silence detected");

      // Tell onend that silence caused this stop
      shouldSubmitRef.current = true;

      try {
        recognitionRef.current?.stop();
      } catch (error) {
        console.log("Could not stop recognition:", error);
      }
    }, 6000);
  };

  useEffect(() => {
    if (!introPlayedRef.current) return;
    if (!currentQuestion?.question) return;

    if (previousQuestionRef.current === currentQuestion?.question) {
      return;
    }

    previousQuestionRef.current = currentQuestion?.question;

    const speakNextQuestion = async () => {
      await wait(1000);
      await speak(currentQuestion?.question);
    };

    speakNextQuestion();
  }, [currentQuestion?.question, speak]);

  const answeredCount = interviewData?.history?.filter(
    (h) => h?.answered,
  ).length;

  // Timer
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const handleEnd = useCallback(() => {
    setConfirmEnd(false);
    handleEndInterview();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto text-dark-garnet antialiased">
      {preparingInterview ? (
        <div className="min-h-screen flex justify-center flex-col items-center">
          <InterviewStartLoader />
        </div>
      ) : (
        <div className="">
          <div className="mx-auto flex min-h-screen max-w-350 flex-col">
            {/* Main area */}
            <main className="grid flex-1 mt-8 grid-cols-1 gap-px  lg:grid-cols-[1fr_380px]">
              {/* Video / AI panel */}
              <section className="flex flex-col">
                <div className="relative flex flex-1 rounded-2xl shadow-lg shadow-black/40 bg-[#14171F] mx-5  min-w-xs flex-col items-center justify-center gap-5 px-6 py-10">
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
                    active={isListening}
                    onClick={isListening ? stopListening : startListening}
                    label={isListening ? "Stop answering" : "Start answering"}
                  >
                    {isListening ? (
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
                  <button
                    onClick={() => setConfirmEnd(true)}
                    className="flex items-center justify-center rounded-full bg-[#6a0002]/10 text-xs font-medium text-[#6a0002] ring-1 h-11 w-11 ring-[#6a0002]/30 transition-colors hover:bg-[#6a0002]/20 sm:px-4 sm:text-sm"
                  >
                    <PhoneOff className="h-4.5 w-4.5" />
                  </button>
                </div>
                <div className="mx-5 mb-4 rounded-xl border border-dark-garnet/20 bg-white p-4">
                  <p className="mb-2 text-xs font-medium text-gray-500">
                    Your answer
                  </p>

                  <p className="min-h-16 text-sm text-black">
                    {answer}

                    {interimAnswer && (
                      <span className="text-gray-400"> {interimAnswer}</span>
                    )}

                    {!answer && !interimAnswer && (
                      <span className="text-gray-400">
                        Click the microphone and start speaking...
                      </span>
                    )}
                  </p>

                  {isListening && (
                    <p className="mt-2 text-xs text-red-500">Listening...</p>
                  )}
                </div>
              </section>

              {/* Sidebar */}
              <aside className="flex flex-col">
                {/* Current question */}
                <div className="border-b border-white/8 px-5 py-5">
                  <div className="flex justify-between">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-dark-garnet/12 px-2.5 py-1 text-[11px] font-medium text-dark-garnet capitalize ring-1 ring-dark-garnet/50">
                        {currentQuestion?.topic}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] capitalize font-medium ${
                          DIFFICULTY_STYLES[currentQuestion?.difficulty] ||
                          DIFFICULTY_STYLES.Easy
                        }`}
                      >
                        {currentQuestion?.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="font-mono-ui text-[11px] uppercase tracking-wide text-[#8B93A7]">
                    Question {interviewData.history.length}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-medium leading-snug text-black sm:text-xl">
                    {currentQuestion?.question}
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
                          key={h?._id}
                          className="flex items-start gap-3 max-h-48 "
                        >
                          <div className="mt-0.5 shrink-0">
                            {h?.answered ? (
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
                                  : h?.answered
                                    ? "text-black/80"
                                    : "text-dark-garnet"
                              }`}
                            >
                              {h?.question}
                            </p>
                            {h?.answered && h.score != null && (
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
                      {interviewData.history.map((h, idx) => (
                        <div className="text-black text-[11px]" key={idx}>
                          <div className="me-3 justify-start">
                            <b>Interviewer:</b> {h?.question}
                          </div>
                          <div className="ms-3 justify-end">
                            {" "}
                            <b>Candidate:</b> {h?.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </aside>
            </main>
          </div>

          <ConfirmationModal
            isOpen={confirmEnd}
            onClose={() => setConfirmEnd(false)}
            message="Your report will be generated. You can't resume this session afterward."
            action={() => {
              handleEnd();
              navigate(`/${interviewData?._id}/report`);
            }}
            title="End this interview?"
            confirmText="End & get report"
            cancelText="Keep going"
          />
        </div>
      )}
    </div>
  );
}
