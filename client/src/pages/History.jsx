import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  ChevronRight,
  ListChecks,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useInterview } from "../context/InterviewContext";
import { useAuth } from "../context/AuthContext";
import { GlobalLoader } from "../components/Loaders";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const statusConfig = {
  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    badge: "bg-green-700 text-white border-green-900",
    accent: "border-l-dark-garnet-600",
    ring: "stroke-green-500",
  },
  Incomplete: {
    label: "Incomplete",
    icon: XCircle,
    badge: "bg-linen-100 text-dark-garnet border-dark-garnet-900",
    accent: "border-l-linen-300",
    ring: "stroke-linen-400",
  },
};

const filters = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "incomplete", label: "Incomplete" },
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ScoreRing({ score, max, ringClass }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, score / max));
  const dash = circumference * pct;

  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg viewBox="0 0 44 44" className="w-14 h-14 -rotate-90">
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          strokeWidth="4"
          className="stroke-linen-200"
        />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className={ringClass}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-xs font-semibold text-linen-900">
          {score}
        </span>
      </div>
    </div>
  );
}

function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-linen-200 bg-linen-50 px-4 py-3 sm:px-5 sm:py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-garnet-800/30 shrink-0">
        <Icon size={17} className="text-dark-garnet-800" />
      </div>
      <div>
        <p className="text-lg font-serif font-semibold text-linen-900 leading-none">
          {value}
        </p>
        <p className="text-xs text-linen-600 mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function History() {
  const { allInterviews, getAllInterviews, isGettingInterviews, getInterview } =
    useInterview();
  const navigate = useNavigate();
  const openReport = (id) => {
    navigate(`/${id}/report`);
  };
  const { token } = useAuth();
  useEffect(() => {
    if (token) getAllInterviews();
  }, [token]);
  console.log("allInterviews", allInterviews);

  const [filter, setFilter] = useState("all");

  const interviews = allInterviews ?? [];
  const total = interviews.length;
  const completed = interviews.filter(
    (interview) => interview.status === "Completed",
  ).length;

  const avgScore =
    total > 0
      ? interviews.reduce(
          (sum, interview) => sum + (interview.finalScore ?? 0),
          0,
        ) / total
      : 0;

  const bestScore =
    total > 0
      ? Math.max(...interviews.map((interview) => interview.finalScore ?? 0))
      : 0;

  const filtered =
    filter === "all"
      ? interviews
      : interviews.filter(
          (interview) => interview.status.toLowerCase() === filter,
        );

  if (isGettingInterviews) {
    return <GlobalLoader />;
  }
  return (
    <div className="w-full min-h-screen max-w-4xl mx-auto ">
      <div className="mx-auto max-w-5xl px-4 py-10  sm:px-6 sm:py-14 sm:pt-7 lg:px-8">
        
        {/* Page header */}
        <div className="mb-8 sm:mb-10">
          <div className="text-xs  flex items-center justify-between font-semibold uppercase tracking-widest text-dark-garnet mb-2">
            Interview Records
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-linen-950">
            Your Interviews History
          </h1>
          <p className="mt-2 text-sm sm:text-base text-linen-600">
            A complete log of every mock interview you have taken, with scores
            and status.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:grid-cols-4 sm:gap-4">
          <StatChip icon={ListChecks} label="Total Interviews" value={total} />
          <StatChip icon={CheckCircle2} label="Completed" value={completed} />
          <StatChip
            icon={TrendingUp}
            label="Average Score"
            value={`${avgScore.toFixed(1)}/10`}
          />
          <StatChip
            icon={Sparkles}
            label="Best Score"
            value={`${bestScore}/10`}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f.key
                  ? "bg-dark-garnet text-linen-50"
                  : "border-linen-700 bg-linen-50 text-linen-700 hover:bg-linen-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3 sm:space-y-4">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-linen-300 bg-linen-50 px-6 py-14 text-center">
              <p className="font-serif text-lg text-linen-700">
                No interviews in this category yet.
              </p>
              <p className="mt-1 text-sm text-linen-500">
                Try a different filter to see more records.
              </p>
            </div>
          )}

          {filtered.map((interview) => {
            const cfg = statusConfig[interview.status];
            const StatusIcon = cfg.icon;

            return (
              <div
                key={interview._id}
                className={`group rounded-2xl border border-linen-200 border-l-4  bg-linen-50 p-5 shadow-sm transition-all hover:shadow-md hover:border-linen-300 sm:p-6`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Title block */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h2 className="font-serif text-lg font-semibold text-linen-950 truncate">
                        {interview._id}
                      </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-dark-garnet">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} />
                        {formatDate(interview.createdAt)}
                      </span>
                      <span>
                        {interview.history.reduce(
                          (sum, q) => sum + q.answered,
                          0,
                        )}
                        /{interview.totalQuestion} questions answered
                      </span>
                    </div>
                  </div>

                  {/* Status + score + action */}
                  <div className="flex items-center justify-between gap-4 md:justify-end md:gap-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${cfg.badge}`}
                    >
                      <StatusIcon size={13} />
                      {cfg.label}
                    </span>

                    <ScoreRing
                      score={interview.finalScore}
                      max={interview.scoreMax}
                      ringClass={cfg.ring}
                    />

                    <button
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-linen-200 bg-linen-50 text-linen-600 transition-colors hover:border-dark-garnet hover:bg-dark-garnet-800/50 hover:text-linen"
                      onClick={() => openReport(interview._id)}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
