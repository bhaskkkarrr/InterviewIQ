import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  Download,
  MessageSquareText,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useInterview } from "../context/InterviewContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { InterviewReportLoader } from "../components/Loaders";

const MAX_QUESTIONS = 6;

const chartColors = {
  garnet: "#6A0002",
  garnetLight: "#990003",
  linen: "#EFE6DD",
  linenDark: "#684d31",
  grid: "#deccba",
  text: "#453321",
};

function formatDate(date) {
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date) {
  if (!date) return "";

  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getVerdict(score) {
  if (score >= 8) {
    return {
      label: "Excellent",
      description: "Strong interview performance with impressive consistency.",
    };
  }

  if (score >= 6) {
    return {
      label: "Good",
      description: "Solid performance with a few areas that can be improved.",
    };
  }

  if (score >= 4) {
    return {
      label: "Developing",
      description:
        "A promising foundation with clear opportunities to improve.",
    };
  }

  return {
    label: "Needs Practice",
    description:
      "More focused preparation and structured answers will improve performance.",
  };
}

function ReportCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-linen-200 bg-linen-50 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, eyebrow, title, description }) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-dark-garnet-800/30">
          <Icon size={16} className="text-dark-garnet" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dark-garnet">
          {eyebrow}
        </p>
      </div>

      <h2 className="text-xl font-semibold text-linen-950 sm:text-2xl">
        {title}
      </h2>

      {description && (
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-linen-600">
          {description}
        </p>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, helper }) {
  return (
    <ReportCard className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-linen-600">{label}</p>

          <p className="mt-2 text-2xl font-bold text-linen-950">{value}</p>

          {helper && <p className="mt-1 text-xs text-linen-500">{helper}</p>}
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-dark-garnet-800/30">
          <Icon size={19} className="text-dark-garnet" />
        </div>
      </div>
    </ReportCard>
  );
}

function StatusBadge({ status }) {
  const completed = status === "Completed";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        completed
          ? "border-dark-garnet-800 bg-dark-garnet/10 text-dark-garnet-800"
          : "border-linen-300 bg-linen-100 text-linen-800"
      }`}
    >
      {completed ? <CheckCircle2 size={14} /> : <Clock3 size={14} />}

      {status}
    </span>
  );
}

function EmptyEvaluation() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-linen-300 bg-linen-100/60 px-6 py-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-linen-200">
        <BarChart3 size={21} className="text-linen-700" />
      </div>

      <p className="mt-4 font-semibold text-linen-900">
        Evaluation not available yet
      </p>

      <p className="mt-1 max-w-sm text-sm leading-relaxed text-linen-600">
        This section will populate automatically after the candidate answers
        interview questions.
      </p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-linen-200 bg-linen-200 px-4 py-3 shadow-lg">
      <p className="mb-2 text-xs font-semibold text-linen-800">{label}</p>

      {payload.map((item) => (
        <p key={item.dataKey} className="text-xs capitalize text-dark-garnet">
          {item.name}: {item.value}/10
        </p>
      ))}
    </div>
  );
}

function PerformanceBarChart({ data }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke={chartColors.grid}
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="question"
            tick={{
              fill: chartColors.text,
              fontSize: 11,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 10]}
            tick={{
              fill: chartColors.text,
              fontSize: 11,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{
              fontSize: "12px",
            }}
          />

          <Bar
            dataKey="correctness"
            name="Correctness"
            fill={chartColors.garnet}
            radius={[5, 5, 0, 0]}
          />

          <Bar
            dataKey="communication"
            name="Communication"
            fill={chartColors.garnetLight}
            radius={[5, 5, 0, 0]}
          />

          <Bar
            dataKey="confidence"
            name="Confidence"
            fill={chartColors.linenDark}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function InsightList({ title, items, type = "strength" }) {
  const isStrength = type === "strength";

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        {isStrength ? (
          <CheckCircle2 size={17} className="text-dark-garnet" />
        ) : (
          <AlertTriangle size={17} className="text-linen-700" />
        )}

        <h3 className="font-semibold text-linen-950">{title}</h3>
      </div>

      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                isStrength
                  ? " bg-green-800 text-white"
                  : "border-linen-300 bg-linen-200/70 text-linen-900"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-linen-300 bg-linen-100/50 px-4 py-3 text-sm text-linen-600">
          No {isStrength ? "strengths" : "areas for improvement"} recorded yet.
        </div>
      )}
    </div>
  );
}

function QuestionCard({ item, index }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-linen-200 bg-linen-50">
      <div className="border-b border-linen-200 bg-linen-100/70 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-dark-garnet text-xs font-bold text-linen-50">
              {index + 1}
            </span>

            <span className="rounded-full border border-dark-garnet-800 bg-dark-garnet-900/10 px-2.5 py-1 text-[11px] font-semibold text-dark-garnet-800">
              {item.topic || "General"}
            </span>

            <span className="rounded-full border border-linen-300 bg-linen-50 px-2.5 py-1 text-[11px] font-medium capitalize text-linen-700">
              {item.difficulty || "Not specified"}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              item.answered ? "text-dark-garnet" : "text-linen-600"
            }`}
          >
            {item.answered ? (
              <CheckCircle2 size={14} />
            ) : (
              <CircleDot size={14} />
            )}

            {item.answered ? "Answered" : "Not answered"}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-base font-semibold leading-relaxed text-linen-950 sm:text-lg">
          {item.question}
        </p>

        {item.answer ? (
          <div className="mt-5 rounded-xl border-l-4 border-dark-garnet bg-linen-100 p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-linen-600">
              Candidate Answer
            </p>

            <p className="text-sm leading-relaxed text-linen-900">
              {item.answer}
            </p>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-linen-300 bg-linen-100/60 px-4 py-5 text-sm text-linen-600">
            The candidate has not answered this question.
          </div>
        )}

        {item.answered && (
          <>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Score", item.score],
                ["Correctness", item.correctness],
                ["Communication", item.communication],
                ["Confidence", item.confidence],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-linen-200 bg-linen-100/50 p-3 text-center"
                >
                  <p className="text-lg font-bold text-dark-garnet">
                    {value ?? 0}
                    <span className="text-xs font-normal text-linen-500">
                      /10
                    </span>
                  </p>

                  <p className="mt-1 text-[11px] text-linen-600">{label}</p>
                </div>
              ))}
            </div>

            {item.feedback && (
              <div className="mt-5 rounded-xl bg-dark-garnet-800/20 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-dark-garnet">
                  Evaluator Feedback
                </p>

                <p className="text-sm leading-relaxed text-dark-garnet-900">
                  {item.feedback}
                </p>
              </div>
            )}

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <InsightList title="Strengths" items={item.strengths ?? []} />

              <InsightList
                title="Areas to Improve"
                items={item.weaknesses ?? []}
                type="weakness"
              />
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default function InterviewReport() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();

  const [interviewReport, setInterviewReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInterview = async () => {
    try {
      const res = await axiosInstance.get(`/api/interview/${id}/report`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setInterviewReport(res.data.interview);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Could not get interview report",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && token) {
      getInterview();
    }
  }, [id, token]);

  const report = interviewReport;

  const answeredQuestions = useMemo(
    () => report?.history?.filter((item) => item.answered) ?? [],
    [report],
  );

  const answeredCount = answeredQuestions.length;

  const averageScore = useMemo(() => {
    if (!answeredCount) return 0;

    const total = answeredQuestions.reduce(
      (sum, item) => sum + (item.score ?? 0),
      0,
    );

    return total / answeredCount;
  }, [answeredQuestions, answeredCount]);

  const averageCorrectness = useMemo(() => {
    if (!answeredCount) return 0;

    return (
      answeredQuestions.reduce(
        (sum, item) => sum + (item.correctness ?? 0),
        0,
      ) / answeredCount
    );
  }, [answeredQuestions, answeredCount]);

  const averageCommunication = useMemo(() => {
    if (!answeredCount) return 0;

    return (
      answeredQuestions.reduce(
        (sum, item) => sum + (item.communication ?? 0),
        0,
      ) / answeredCount
    );
  }, [answeredQuestions, answeredCount]);

  const averageConfidence = useMemo(() => {
    if (!answeredCount) return 0;

    return (
      answeredQuestions.reduce((sum, item) => sum + (item.confidence ?? 0), 0) /
      answeredCount
    );
  }, [answeredQuestions, answeredCount]);
  const skillData = [
    {
      skill: "Overall",
      score: Number(averageScore.toFixed(1)),
    },
    {
      skill: "Correctness",
      score: Number(averageCorrectness.toFixed(1)),
    },
    {
      skill: "Communication",
      score: Number(averageCommunication.toFixed(1)),
    },
    {
      skill: "Confidence",
      score: Number(averageConfidence.toFixed(1)),
    },
  ];

  const questionPerformance = answeredQuestions.map((item, index) => ({
    question: `Q${index + 1}`,
    score: item.score ?? 0,
    correctness: item.correctness ?? 0,
    communication: item.communication ?? 0,
    confidence: item.confidence ?? 0,
  }));

  const allStrengths = [
    ...new Set(answeredQuestions.flatMap((item) => item.strengths ?? [])),
  ];

  const allWeaknesses = [
    ...new Set(answeredQuestions.flatMap((item) => item.weaknesses ?? [])),
  ];

  const verdict = getVerdict(averageScore);

  if (loading) {
    return <InterviewReportLoader />;
  }
  if (!report) {
    return (
      <div className="flex min-h-screen w-full max-w-4xl mx-auto shadow-2xl shadow-amber-900/50 items-center justify-center bg-linen px-4">
        <ReportCard className="max-w-md p-8 text-center shadow-xl shadow-amber-900/50">
          <AlertTriangle size={32} className="mx-auto text-dark-garnet" />

          <h1 className="mt-4 text-xl font-bold text-linen-950">
            Report not found
          </h1>

          <p className="mt-2 text-sm text-linen-600">
            The requested interview report could not be loaded.
          </p>
          <button
            className="bg-dark-garnet my-3 hover:bg-dark-garnet/70 px-3 py-1.5 rounded-2xl text-linen-50"
            onClick={() => navigate("/history")}
          >
            Go back
          </button>
        </ReportCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto flex flex-col justify-center  text-linen-950">
      {/* Hero */}
      <header className="border-b mt-5 rounded-xl border-linen-200 bg-linen-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <StatusBadge status={report.status} />

                <span className="inline-flex items-center gap-1.5 text-xs text-linen-600">
                  <CalendarDays size={14} />
                  {formatDate(report.createdAt)}
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-dark-garnet">
                AI Interview Assessment
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-linen-950 sm:text-4xl lg:text-5xl">
                {report.username}
                <span className="text-dark-garnet">'s</span> Interview Report
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-linen-600 sm:text-base">
                A detailed evaluation of technical correctness, communication,
                confidence, strengths, and areas that need improvement.
              </p>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-linen-500">
                <span>Report ID: {report._id.slice(-8).toUpperCase()}</span>

                <span>Generated at {formatTime(report.updatedAt)}</span>
              </div>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div className="relative flex size-40 flex-col items-center justify-center rounded-full border-8 border-dark-garnet-50 bg-linen shadow-lg shadow-dark-garnet/10">
                <span className="text-4xl font-bold text-dark-garnet">
                  {averageScore.toFixed(1)}
                </span>

                <span className="text-xs font-medium text-linen-600">
                  out of 10
                </span>

                <span className="mt-2 rounded-full bg-dark-garnet px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-linen-50">
                  {verdict.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Statistics */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={MessageSquareText}
            label="Questions Answered"
            value={`${answeredCount}/${report.totalQuestion || MAX_QUESTIONS}`}
            helper="Interview progress"
          />

          <StatCard
            icon={Target}
            label="Average Score"
            value={`${averageScore.toFixed(1)}/10`}
            helper="Across answered questions"
          />

          <StatCard
            icon={TrendingUp}
            label="Correctness"
            value={`${averageCorrectness.toFixed(1)}/10`}
            helper="Technical accuracy"
          />

          <StatCard
            icon={UserRound}
            label="Communication"
            value={`${averageCommunication.toFixed(1)}/10`}
            helper="Answer clarity"
          />
        </section>

        {/* Overview */}
        <section>
          <SectionHeader
            icon={Sparkles}
            eyebrow="Performance Overview"
            title="Candidate Ability Analysis"
            description="A visual breakdown of the candidate's overall interview performance."
          />

          {answeredCount > 0 ? (
            <div className="gap-5 ">
              <ReportCard className="p-5 sm:p-6">
                <h3 className="font-semibold text-linen-950">
                  Performance by Question
                </h3>

                <p className="mt-1 text-xs text-linen-600">
                  Comparison of correctness, communication, and confidence.
                </p>

                <PerformanceBarChart data={questionPerformance} />
              </ReportCard>
            </div>
          ) : (
            <EmptyEvaluation />
          )}
        </section>

        {/* Strengths and weaknesses */}
        <section>
          <SectionHeader
            icon={Award}
            eyebrow="Candidate Insights"
            title="Strengths & Areas to Improve"
            description="Combined insights collected from every evaluated interview answer."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <ReportCard className="p-5 sm:p-6">
              <InsightList title="Key Strengths" items={allStrengths} />
            </ReportCard>

            <ReportCard className="p-5 sm:p-6">
              <InsightList
                title="Areas to Improve"
                items={allWeaknesses}
                type="weakness"
              />
            </ReportCard>
          </div>
        </section>

        {/* Interview transcript */}
        <section>
          <SectionHeader
            icon={MessageSquareText}
            eyebrow="Detailed Evaluation"
            title="Interview Transcript"
            description="Every question, answer, score, and evaluator insight from the interview."
          />

          <div className="space-y-4">
            {report.history?.map((item, index) => (
              <QuestionCard key={item._id} item={item} index={index} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-linen-200 bg-linen-50">
        <div className="mx-auto flex max-w-7xl flex-col justify-center gap-2 px-4 py-6 text-xs text-linen-500 sm:flex-row sm:px-6 lg:px-8">
          <span>InterviewIQ · AI Interview Assessment Report</span>
        </div>
      </footer>
    </div>
  );
}
