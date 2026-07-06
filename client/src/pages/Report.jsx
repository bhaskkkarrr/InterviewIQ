import React from "react";
import {
  Mail,
  Phone,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Link2,
  BadgeCheck,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const candidate = {
  name: "Bhaskar Chauhan",
  role: "MERN Stack Developer",
  phone: "+91-9582307736",
  email: "bhaskarchauhan748@gmail.com",
  github: "github.com/bhaskkkarrr",
  linkedin: "linkedin.com/in/bhaskkkarrr",
  summary:
    "MERN Stack Developer with hands-on project experience in React, Node.js, and MongoDB. Proficient in Python, NumPy, and Pandas, with a strong focus on breaking into Machine Learning and Generative AI.",
};

const skillGroups = [
  { label: "Languages", items: ["C++", "JavaScript", "Python"] },
  {
    label: "Frontend",
    items: ["React.js", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
  },
  { label: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Database", items: ["MongoDB"] },
  {
    label: "Data Science",
    items: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
  },
  {
    label: "Tools",
    items: ["GitHub", "VS Code", "Postman", "Vercel", "Render", "Netlify"],
  },
];

const projects = [
  {
    title: "Backend Authentication System",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Nodemailer"],
    detail:
      "Full auth flow with email OTP verification and a JWT access/refresh token system — 10-minute access tokens, 7-day rotating refresh tokens stored as HttpOnly cookies.",
  },
  {
    title: "ScanMyMenu — QR Ordering SaaS",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    detail:
      "QR-based restaurant menu platform with a full admin panel for managing categories and items, backed by REST APIs and MongoDB.",
  },
  {
    title: "IPL 2025 Batters — EDA",
    tech: ["Python", "Pandas", "NumPy"],
    detail:
      "End-to-end exploratory analysis on IPL 2025 batting data — GroupBy aggregations to surface top run-scorers and strike rates per team.",
  },
];

const education = [
  {
    title: "Bachelor of Computer and Application",
    org: "Institute of Technology and Science (CCSU)",
    period: "2024 – 2027 (Expected)",
  },
  {
    title: "Senior Secondary (Class XII), CBSE",
    org: "Indraprastha Public School, Ghaziabad — 88%",
    period: "2023 – 2024",
  },
];

const certifications = [
  "HTML, CSS & JavaScript for Beginners",
  "Workshop on Game Development using Python",
];

const languages = ["English", "Hindi"];

const report = {
  status: "Completed",
  totalQuestions: 1,
  finalScore: 0,
  scoreMax: 10,
  createdAt: "2026-07-06T14:09:51.491Z",
  reportId: "6a4bb72f474a016f27e94d30",
  history: [
    {
      topic: "Resume",
      question:
        "Can you tell me about your experience with React and how it integrates into the MERN stack?",
      answer:
        "I have used for multiple projects like scan my menu and this interview I have used react and mern stat",
      feedback:
        "The response is incomplete and does not demonstrate a comprehensive understanding of React or its integration with the MERN stack. The candidate should provide specific examples and explain how they used React in their projects.",
      strengths: [],
      weaknesses: [
        "Lacks detailed explanation",
        "Does not mention components, hooks, state management",
        "Uses vague terms like 'used for multiple projects'",
      ],
      confidence: 0,
      correctness: 0,
      communication: 0,
      score: 0,
    },
  ],
};

const formattedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-dark-garnet-50 px-3 py-1 text-xs font-medium text-dark-garnet-800">
      {children}
    </span>
  );
}

function MetricBar({ label, value, max = 10 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  const widthClass =
    pct === 0
      ? "w-0"
      : pct <= 10
        ? "w-[10%]"
        : pct <= 20
          ? "w-[20%]"
          : pct <= 30
            ? "w-[30%]"
            : pct <= 40
              ? "w-[40%]"
              : pct <= 50
                ? "w-1/2"
                : pct <= 60
                  ? "w-[60%]"
                  : pct <= 70
                    ? "w-[70%]"
                    : pct <= 80
                      ? "w-4/5"
                      : pct <= 90
                        ? "w-[90%]"
                        : "w-full";

  return (
    <div className="min-w-30 flex-1">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-wider text-linen-700">
          {label}
        </span>

        <span className="font-mono text-xs font-semibold text-dark-garnet-800">
          {value}/{max}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-linen-300">
        <div
          className={`h-1.5 rounded-full bg-dark-garnet transition-all duration-500 ${widthClass}`}
        />
      </div>
    </div>
  );
}

function VerdictSeal({ score, max }) {
  const pct = Math.max(0, Math.min(1, score / max));
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * pct;

  const verdict =
    pct >= 0.7 ? "Strong" : pct >= 0.4 ? "Developing" : "Needs Practice";

  return (
    <div
      className="relative shrink-0 -rotate-4 select-none"
      aria-label={`Overall score ${score} out of ${max}, verdict ${verdict}`}
    >
      <div className="relative flex size-32 items-center justify-center rounded-full border-2 border-dashed border-dark-garnet-300 bg-linen-50 shadow-[0_4px_14px_rgba(106,0,2,0.18)]">
        <svg
          width="112"
          height="112"
          viewBox="0 0 100 100"
          className="absolute"
        >
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            className="stroke-linen-300"
            strokeWidth="4"
          />

          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            className="stroke-dark-garnet"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform="rotate(-90 50 50)"
          />
        </svg>

        <div className="flex rotate-4 flex-col items-center">
          <span className="font-serif text-3xl font-semibold leading-none text-dark-garnet-800">
            {score}
          </span>

          <span className="font-mono text-[10px] text-linen-700">/ {max}</span>
        </div>
      </div>

      <div className="mt-2 rotate-4 text-center text-[10px] font-semibold uppercase tracking-widest text-dark-garnet-800">
        {verdict}
      </div>
    </div>
  );
}

export default function InterviewReport() {
  return (
    <div className="min-h-screen bg-linen text-linen-950">
      {/* Letterhead */}
      <header className="relative border-b border-linen-300">
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-dark-garnet">
                AI Interview Assessment Report
              </p>

              <h1 className="font-serif text-3xl font-semibold leading-tight text-dark-garnet-950 sm:text-4xl md:text-5xl">
                {candidate.name}
              </h1>

              <p className="mt-1 text-base text-linen-700 sm:text-lg">
                {candidate.role} &middot; Candidate Evaluation
              </p>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-linen-800">
                <span className="inline-flex items-center gap-1.5">
                  <Phone size={14} className="text-dark-garnet" />
                  {candidate.phone}
                </span>

                <span className="inline-flex items-center gap-1.5 break-all">
                  <Mail size={14} className="text-dark-garnet" />
                  {candidate.email}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <FaGithub size={14} className="text-dark-garnet" />
                  {candidate.github}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <FaLinkedin size={14} className="text-dark-garnet" />
                  {candidate.linkedin}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 self-center sm:flex-col sm:items-end sm:gap-3 sm:self-start">
              <VerdictSeal score={report.finalScore} max={report.scoreMax} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-dark-garnet px-3 py-1 font-medium text-linen-50">
              <BadgeCheck size={14} />
              {report.status}
            </span>

            <span className="inline-flex items-center gap-1.5 text-linen-700">
              <Calendar size={14} />
              {formattedDate}
            </span>

            <span className="text-linen-400">&bull;</span>

            <span className="font-mono text-xs text-linen-700">
              REPORT #{report.reportId.slice(-8).toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 sm:px-8 lg:grid-cols-3">
        {/* Left: assessment */}
        <section className="space-y-6 lg:col-span-2">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-linen-300 bg-linen-50 p-5 sm:p-6">
            {[
              {
                label: "Questions Answered",
                value: `${report.history.length}/${report.totalQuestions}`,
              },
              {
                label: "Final Score",
                value: `${report.finalScore}/${report.scoreMax}`,
              },
              {
                label: "Status",
                value: report.status,
              },
            ].map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <p className="mb-1 text-[11px] uppercase tracking-wider text-linen-700">
                  {item.label}
                </p>

                <p className="font-serif text-lg font-semibold text-dark-garnet-800 sm:text-xl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <h2 className="pt-2 font-serif text-xl font-semibold text-dark-garnet-900 sm:text-2xl">
            Interview Transcript
          </h2>

          {report.history.map((item, index) => (
            <article
              key={index}
              className="rounded-2xl border border-linen-300 bg-linen-50 p-5 sm:p-7"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-dark-garnet">
                  Question {index + 1} &middot; {item.topic}
                </span>
              </div>

              <p className="mb-5 font-serif text-base italic text-linen-950 sm:text-lg">
                &ldquo;{item.question}&rdquo;
              </p>

              <div className="mb-5 rounded-xl border-l-3 border-dark-garnet-300 bg-linen-100 p-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-linen-700">
                  Candidate&rsquo;s Answer
                </p>

                <p className="text-sm leading-relaxed text-linen-950 sm:text-[15px]">
                  {item.answer}
                </p>
              </div>

              <div className="mb-5 flex flex-wrap gap-x-6 gap-y-4">
                <MetricBar label="Confidence" value={item.confidence} />

                <MetricBar label="Correctness" value={item.correctness} />

                <MetricBar label="Communication" value={item.communication} />
              </div>

              <div className="mb-5 flex gap-3 rounded-xl bg-dark-garnet-50 p-4">
                <AlertTriangle
                  size={16}
                  className="mt-0.5 shrink-0 text-dark-garnet"
                />

                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-dark-garnet-800">
                    Evaluator Feedback
                  </p>

                  <p className="text-sm leading-relaxed text-dark-garnet-900">
                    {item.feedback}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-linen-700">
                    <CheckCircle2 size={13} className="text-dark-garnet" />
                    Strengths
                  </p>

                  {item.strengths.length ? (
                    <ul className="space-y-1.5">
                      {item.strengths.map((strength, strengthIndex) => (
                        <li
                          key={strengthIndex}
                          className="text-sm text-linen-950"
                        >
                          &bull; {strength}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic text-linen-600">
                      None recorded for this answer.
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-linen-700">
                    <AlertTriangle size={13} className="text-dark-garnet" />
                    Areas to Improve
                  </p>

                  <ul className="space-y-1.5">
                    {item.weaknesses.map((weakness, weaknessIndex) => (
                      <li
                        key={weaknessIndex}
                        className="text-sm text-linen-950"
                      >
                        &bull; {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Right: candidate snapshot */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-linen-300 bg-linen-50 p-5 sm:p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-dark-garnet">
              Candidate Snapshot
            </h3>

            <p className="text-sm leading-relaxed text-linen-950">
              {candidate.summary}
            </p>
          </div>

          <div className="rounded-2xl border border-linen-300 bg-linen-50 p-5 sm:p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark-garnet">
              Skills
            </h3>

            <div className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-1.5 text-xs font-semibold text-linen-700">
                    {group.label}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-linen-300 bg-linen-50 p-5 sm:p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark-garnet">
              Projects
            </h3>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="border-b border-linen-300 pb-4 last:border-0 last:pb-0"
                >
                  <p className="mb-1 font-serif text-sm font-semibold text-linen-950">
                    {project.title}
                  </p>

                  <p className="mb-2 text-xs leading-relaxed text-linen-700">
                    {project.detail}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-linen-100 px-2 py-0.5 font-mono text-[10px] text-dark-garnet-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-linen-300 bg-linen-50 p-5 sm:p-6">
            <h3 className="mb-4 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-dark-garnet">
              <GraduationCap size={15} />
              Education
            </h3>

            <div className="relative space-y-5 pl-4">
              <div className="absolute bottom-1 left-[3px] top-1 w-px bg-linen-300" />

              {education.map((item) => (
                <div key={item.title} className="relative">
                  <div className="absolute -left-4 top-1.5 size-2 rounded-full bg-dark-garnet" />

                  <p className="text-sm font-semibold text-linen-950">
                    {item.title}
                  </p>

                  <p className="text-xs text-linen-700">{item.org}</p>

                  <p className="font-mono text-xs text-dark-garnet-400">
                    {item.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-linen-300 bg-linen-50 p-5 sm:p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-dark-garnet">
              Certifications &amp; Languages
            </h3>

            <ul className="mb-4 space-y-1.5">
              {certifications.map((certification) => (
                <li
                  key={certification}
                  className="flex items-start gap-1.5 text-sm text-linen-950"
                >
                  <Link2
                    size={13}
                    className="mt-1 shrink-0 text-dark-garnet-400"
                  />

                  {certification}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {languages.map((language) => (
                <Tag key={language}>{language}</Tag>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <footer className="border-t border-linen-300">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-5 py-6 text-xs text-linen-700 sm:flex-row sm:px-8">
          <span>
            Generated on {formattedDate} &middot; AI Interview Assessment
            Platform
          </span>

          <span className="font-mono">ID: {report.reportId}</span>
        </div>
      </footer>
    </div>
  );
}
