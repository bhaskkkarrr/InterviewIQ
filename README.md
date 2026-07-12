# 🎯 InterviewIQ – AI Mock Interview Platform

An AI-powered mock interview platform that simulates technical interviews by analyzing a candidate's resume, generating personalized interview questions, evaluating responses, and providing detailed performance feedback.

InterviewIQ combines Full Stack Development with Generative AI to deliver an interactive interview experience using Large Language Models (LLMs), voice interaction, and intelligent answer evaluation.

---

# 🚀 Live Demo

🔗 Frontend: https://interview-iq-blush.vercel.app/

---

# 📌 Problem Statement

Preparing for technical interviews often requires experienced mentors, interviewers, or expensive coaching platforms.

InterviewIQ solves this problem by allowing users to:

- Upload their resume
- Start an AI-powered interview
- Answer personalized questions
- Receive detailed AI-generated feedback
- Identify strengths and weaknesses
- Practice interviews anytime

---

# ✨ Features

## 👤 Authentication

- Secure JWT Authentication
- Google Sign-In
- Access Token + Refresh Token Authentication
- HttpOnly Cookies
- Protected Routes

---

## 📄 Resume Analysis

- Upload Resume (PDF)
- Resume Parsing
- AI Resume Understanding
- Resume Summary Generation

---

## 🤖 AI Interview

- Personalized Interview Questions
- One Question at a Time
- Questions Generated from Resume
- Context-Aware Interview Flow
- Adaptive Follow-up Questions
- Difficulty Control

---

## 🎤 Voice Interview

- Text-to-Speech
- Speech Recognition
- Voice-Based Interview Experience
- Hands-Free Interaction

---

## 📊 Performance Report

- Overall Score
- Correctness Score
- Communication Score
- Confidence Score
- Strength Analysis
- Weakness Analysis
- Personalized Improvement Suggestions

---

## 📈 Dashboard

- Interview History
- Previous Reports
- Performance Tracking

---

# 🏗️ System Architecture

```

                React Frontend
                       │
        ───────────────┼───────────────
                       │
             Axios REST API Calls
                       │
                       ▼
             Node.js + Express Server
                       │
        ───────────────┼───────────────
        │                              │
        ▼                              ▼
    MongoDB                     Python FastAPI
                                      │
                                      ▼
                               LangChain Pipeline
                                      │
        ──────────────────────────────┼──────────────────────────
        │                             │
        ▼                             ▼
 Resume Analysis              Question Generation
                                      │
                                      ▼
                              Answer Evaluation
                                      │
                                      ▼
                            Performance Report

```

---

# ⚙️ Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios

---

## Backend

- Node.js
- Express.js
- JWT
- Multer
- Cookie Parser

---

## Database

- MongoDB
- Mongoose

---

## AI Backend

- Python
- FastAPI
- LangChain

---

## LLM

- Mistral Small 2506
- OpenRouter (Optional)

---

## Embedding Model

- BAAI/bge-small-en-v1.5

---

## AI Concepts

- Prompt Engineering
- Resume Understanding
- Contextual Question Generation
- Answer Evaluation
- Structured Outputs

---

## Deployment

Frontend

- Vercel

Backend

- Render

AI Service

- Render

Database

- MongoDB Atlas

---

# 🔄 Application Workflow

```

User Login
      │
      ▼
Upload Resume
      │
      ▼
Resume Sent to Backend
      │
      ▼
Python AI Service
      │
Resume Analysis
      │
      ▼
Interview Session Created
      │
      ▼
Generate Question
      │
      ▼
User Answers
      │
      ▼
AI Evaluates Answer
      │
      ▼
Next Question
      │
      ▼
Interview Ends
      │
      ▼
Generate Final Report
      │
      ▼
Store in MongoDB

```

---

# 📂 Project Structure

```

InterviewIQ

├── client/
│
├── server/
│
├── python-ai/
│
├── uploads/
│
├── chroma-db/
│
├── README.md

```

---

# 📁 Backend Responsibilities

- User Authentication
- Session Management
- Resume Upload
- API Gateway
- MongoDB Operations
- Report Storage

---

# 🤖 AI Service Responsibilities

- Resume Analysis
- Interview Question Generation
- Resume Summarization
- Answer Evaluation
- Feedback Generation

---

# 🗄️ Database Schema

Collections

- Users
- Interview Sessions

Interview Session stores

- Resume Summary
- Questions
- Answers
- Scores
- Feedback
- Final Report

---

# 🔐 Authentication Flow

```

User Login
      │
      ▼
Generate Access Token
      │
Generate Refresh Token
      │
HttpOnly Cookie
      │
Protected APIs
      │
Refresh Token Rotation

```

---

# 📡 API Endpoints

## Authentication

```

POST /api/auth/signup

POST /api/auth/login

POST /api/auth/logout

POST /api/auth/verify-email

POST /api/auth/send-otp

```

---

## Resume

```

POST /api/interview/analyze

POST /api/interview/start

```

---

## AI

```

POST /resume/analyze

POST /interview/question

POST /interview/evaluate

```

---

# 🧠 AI Prompt Engineering

The application uses carefully designed prompts for:

- Resume Understanding
- Interview Question Generation
- Answer Evaluation
- Performance Feedback

The prompts enforce:

- One question at a time
- Resume-aware interviews
- Context continuity
- Professional interview style
- Structured JSON outputs

---

# 🔥 Challenges Faced

- Multi-service communication between Node.js and Python
- Prompt Engineering
- Voice interaction
- AI response consistency
- Resume parsing
- Session management
- Deployment across multiple services
- Handling AI service cold starts

---

# 🚀 Future Improvements

- AI Interview Avatar
- Real-Time Emotion Detection
- Company-Specific Interview Modes
- Coding Interview Support
- Multi-Language Interviews
- AI Interview Analytics
- Recruiter Dashboard
- Team Interview Rooms
- Docker Deployment
- Kubernetes Support
- AI Agent Integration

---

# 📸 Screenshots

- Home Page
- Dashboard
- Resume Upload
- Interview Screen
- AI Feedback Report

(Add screenshots here)

---

# 📈 Learning Outcomes

Through this project I gained hands-on experience with:

- Full Stack Development
- REST API Design
- Authentication Systems
- Multi-Service Architecture
- FastAPI
- LangChain
- Large Language Models
- Prompt Engineering
- MongoDB
- React
- Deployment
- AI Application Development

---

# 🛠️ Installation

Clone Repository

```bash
git clone https://github.com/yourusername/interviewiq.git
```

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm run dev
```

AI Service

```bash
cd python-ai
pip install -r requirements.txt
uvicorn main:app --reload
```

---

# 📬 Contact

**Bhaskar Chauhan**

📧 Email: bhaskarchauhan748@gmail.com

💼 LinkedIn: https://linkedin.com/in/bhaskkkarrr

🐙 GitHub: https://github.com/bhaskkkarrr
