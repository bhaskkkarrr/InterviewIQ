import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const demoInterviewData = {
  resume_text:
    "B H A S K A R  C H A U H A N\n+ 9 1 - 9 5 8 2 3 0 7 7 3 6  |  b h a s k a r c h a u h a n 7 4 8 @ g m a i l . c o m  |  h t t p s : / / g i t h u b . c o m / b h a s k k k a r r r  |  h t t p : / / w w w . l i n k e d i n . c o m / i n / b h a s k k k a r r r\nS U M M A R Y\nM E R N  S t a c k  D e v e l o p e r  w i t h  h a n d s - o n  p r o j e c t  e x p e r i e n c e  i n  R e a c t ,  N o d e . j s ,  a n d  M o n g o D B .  P r o f i c i e n t  i n  P y t h o n ,\nN u m P y ,  a n d  P a n d a s ,  w i t h  a  s t r o n g  f o c u s  o n  b r e a k i n g  i n t o  M a c h i n e  L e a r n i n g  a n d  G e n e r a t i v e  A I .  P a s s i o n a t e  a b o u t\nb u i l d i n g  i n t e l l i g e n t ,  s c a l a b l e  w e b  a p p l i c a t i o n s .\nS K I L L\nL a n g u a g e s :   C + + ,  J a v a S c r i p t ,  P y t h o n\nF r o n t e n d :  R e a c t . j s ,  H T M L 5 ,  C S S 3 ,  B o o t s t r a p ,  T a i l w i n d  C S S\nB a c k e n d :  N o d e . j s ,  E x p r e s s . j s ,  R E S T  A P I s\nD a t a b a s e :  M o n g o D B\nD a t a  S c i e n c e  L i b r a r i e s :  N u m p y ,  P a n d a s ,  M a t p l o t l i b ,  S e a b o r n\nT o o l s  &  P l a t f o r m s :  G i t H u b ,  V S  C o d e ,  P o s t m a n ,  V e r c e l ,  R e n d e r ,  N e t l i f y\nS o f t  S k i l l s :  P r o b l e m - s o l v i n g ,  C o m m u n i c a t i o n ,  T e a m  c o l l a b o r a t i o n\nP R O J E C T S\n2 .  I P L  2 0 2 5  B a t t e r s  –  E x p l o r a t o r y  D a t a  A n a l y s i s  |  G i t H u b\nT e c h  S t a c k :  P y t h o n ,  P a n d a s ,  N u m P y ,  J u p y t e r  N o t e b o o k  \nP e r f o r m e d  e n d - t o - e n d  E D A  o n  I P L  2 0 2 5  b a t t i n g  d a t a s e t  u s i n g  P y t h o n ,  P a n d a s ,  a n d  N u m P y\nE x t r a c t e d  t e a m - l e v e l  i n s i g h t s  u s i n g  G r o u p B y  a g g r e g a t i o n s  —  i d e n t i f i e d  t o p  r u n - s c o r e r s ,  b e s t  s t r i k e  r a t e s ,  a n d\nm o s t  c o n s i s t e n t  b a t t e r s  p e r  t e a m\nF i l t e r e d  a n d  r a n k e d  p l a y e r s  u s i n g  m u l t i - c o n d i t i o n  q u e r i e s  a c r o s s  1 0 +  s t a t i s t i c a l  a t t r i b u t e s\n3 .  S c a n M y M e n u  –  Q R - B a s e d  R e s t a u r a n t  O r d e r i n g  S a a S  |  L i v e  D e m o  |  G i t H u b\nB u i l t  a  f u l l - s t a c k  w e b  a p p  t h a t  a l l o w s  r e s t a u r a n t s  t o  g e n e r a t e  a  Q R  c o d e  f o r  t h e i r  m e n u  —  c u s t o m e r s  s c a n  i t  a n d  i n s t a n t l y\nv i e w  t h e  m e n u  w i t h o u t  a n y  a p p  d o w n l o a d\nB u i l t  a  r e s t a u r a n t  a d m i n  p a n e l  w h e r e  o w n e r s  c a n  a d d ,  e d i t ,  a n d  d e l e t e  f o o d  i t e m s  a n d  m a n a g e  f o o d  c a t e g o r i e s\nd y n a m i c a l l y\nD e s i g n e d  a n d  i m p l e m e n t e d  R E S T  A P I s  w i t h  N o d e . j s  a n d  E x p r e s s  f o r  m e n u  a n d  c a t e g o r y  C R U D  o p e r a t i o n s  b a c k e d  b y\nM o n g o D B\nT e c h  S t a c k :  R e a c t . j s ,  N o d e . j s ,  E x p r e s s . j s ,  M o n g o D B ,  V e r c e l ,  R e n d e r\n1 .  B a c k e n d  A u t h e n t i c a t i o n  S y s t e m  |  G i t H u b\nT e c h  S t a c k :  N o d e . j s ,  E x p r e s s . j s ,  M o n g o D B ,  M o n g o o s e ,  J W T ,  N o d e m a i l e r ,  C r y p t o\nI m p l e m e n t e d  f u l l  a u t h  f l o w :  u s e r  r e g i s t r a t i o n ,  e m a i l  O T P  v e r i f i c a t i o n ,  l o g i n ,  l o g o u t ,  a n d  l o g o u t  f r o m  a l l  d e v i c e s\nE n g i n e e r e d  J W T - b a s e d  a c c e s s  &  r e f r e s h  t o k e n  s y s t e m  w i t h  1 0 - m i n u t e  a c c e s s  t o k e n s  a n d  7 - d a y  r o t a t i n g  r e f r e s h  t o k e n s\ns t o r e d  a s  H t t p O n l y  c o o k i e s\nI m p l e m e n t e d  s e s s i o n  m a n a g e m e n t  w i t h  I P  a n d  u s e r - a g e n t  t r a c k i n g ;  s e s s i o n s  c a n  b e  i n d i v i d u a l l y  o r  b u l k - r e v o k e d\nI n t e g r a t e d  e m a i l  s e r v i c e  f o r  O T P  d e l i v e r y  w i t h  H T M L  e m a i l  t e m p l a t e s\nA D D I T I O N A L  I N F O R M A T I O N\nL a n g u a g e s :  E n g l i s h ,  H i n d i\nC e r t i f i c a t i o n s :  -  H T M L ,  C S S  &  J a v a S c r i p t  f o r  B e g i n n e r s ,  W o r k s h o p  o n  G a m e  D e v e l o p m e n t  u s i n g  P y t h o n\nE D U C A T I O N\nB a c h e l o r  o f  C o m p u t e r  a n d  A p p l i c a t i o n\nI n s t i t u t e  o f  T e c h n o l o g y  a n d  S c i e n c e  ( C C S U )\n 2 0 2 4  - 2 0 2 7  ( E x p e c t e d )\nS e n i o r  S e c o n d a r y  ( C l a s s  X I I ) ,  C B S E\nI n d r a p r a s t h a  P u b l i c  S c h o o l ,  G h a z i a b a d  -  8 8 %\n2 0 2 3  -  2 0 2 4",
  analysis_result: {
    experience: "Fresher",
    projects: [
      "IPL 2025 Batters – Exploratory Data Analysis | Git Hub",
      "Scan My Menu – QR-Based Restaurant Ordering SaaS | Live Demo | Git Hub",
      "Backend Authentication System | Git Hub",
    ],
    skills: [
      "C++",
      "JavaScript",
      "Python",
      "React.js",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Git Hub",
      "VS Code",
      "Postman",
      "Vercel",
      "Render",
      "Netlify",
      "Problem-solving",
      "Communication",
      "Team collaboration",
    ],
    candidate_name: "B H A S K A R  C H A U H A N",
    role: "MERN Stack Developer",
    education: [
      "Bachelor of Computer and Application - Institute of Technology and Science (CCSU) 2024 - 2027 (Expected)",
      "Senior Secondary (Class XII), CBSE - Indraprastha Public School, Ghaziabad - 88%, 2023 - 2024",
    ],
    other_details: [
      "Proficient in Python, NumPy, and Pandas, with a strong focus on breaking into Machine Learning and Generative AI.",
      "Passionate about building intelligent, scalable web applications.",
    ],
  },
};

export const InterviewContext = createContext();
export const InterviewProvider = ({ children }) => {
  const { token } = useAuth();
  const [isResumeAnalysing, setIsResumeAnalysing] = useState(false);
  const [preparingInterview, setPreparingInterview] = useState(false);
  const [resumeAnalysed, setResumeAnalysed] = useState(false);
  const [interviewOn, setInterviewOn] = useState(false);
  const [resumeText, setResumeText] = useState(null);
  const [interviewState, setInterviewState] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalysingInterview, setIsAnalysingInterview] = useState(false);
  const [allInterviews, setAllInterviews] = useState(null);
  const [isGettingInterviews, setIsGettingInterviews] = useState(false);
  const handleAnalyzeResume = async (data) => {
    try {
      setIsResumeAnalysing(true);

      const res = await axiosInstance.post("/api/interview/analyze", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalysisResult(res.data.data.analysis_result);
      setResumeText(res.data.data.resume_text);
      setResumeAnalysed(true);

      toast.success("Resume analysed successfully");
      console.log("RES", res);

      return { success: true };
    } catch (error) {
      console.error("Resume analysis failed:", error);
      toast.error("Resume analysis failed");
      return { success: false };
    } finally {
      setIsResumeAnalysing(false);
    }
  };

  const handleInterviewSubmit = async () => {
    try {
      setPreparingInterview(true);
      const res = await axiosInstance.post(
        "/api/interview/",
        {
          resume_text: resumeText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Interview Started");
        setInterviewOn(true);
        setInterviewState(res.data.interviewSession);
        setCurrentQuestion(res.data.question);
        localStorage.setItem(
          "Interview State",
          JSON.stringify(res.data.interviewSession),
        );
        localStorage.setItem(
          "Current Question",
          JSON.stringify(res.data.question),
        );
      }
      console.log("Response: \n", res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPreparingInterview(false);
    }
  };

  const handleInterviewProcess = async (answer) => {
    if (!answer?.trim()) {
      return {
        success: false,
        message: "Answer is required",
      };
    }

    if (!interviewState?._id) {
      return {
        success: false,
        message: "Interview session not found",
      };
    }

    try {
      setIsAnalysingInterview(true);

      const res = await axiosInstance.post(
        "/api/interview/",
        {
          interviewSessionId: interviewState._id,
          answer: answer.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.data.success) {
        return {
          success: false,
          message: res.data.message,
        };
      }

      if (res.data?.interviewCompleted) {
        const completedSession = res.data.interviewSession;

        setInterviewState(completedSession);
        setCurrentQuestion(null);

        localStorage.setItem(
          "Interview State",
          JSON.stringify(completedSession),
        );

        localStorage.removeItem("Current Question");

        return {
          success: true,
          interviewCompleted: true,
          interviewSession: completedSession,
          evaluation: res.data.evaluation,
          message: "Interview completed successfully",
        };
      } else {
        const updatedSession = res.data.interviewSession;
        const nextQuestion = res.data.question;

        setInterviewState(updatedSession);
        setCurrentQuestion(nextQuestion);

        localStorage.setItem("Interview State", JSON.stringify(updatedSession));

        localStorage.setItem("Current Question", JSON.stringify(nextQuestion));

        return {
          success: true,
          question: nextQuestion,
          evaluation: res.data.evaluation,
        };
      }
    } catch (error) {
      console.error("Continue interview error:", error.response?.data || error);

      toast.error(
        error.response?.data?.message || "Could not continue interview",
      );

      return {
        success: false,
      };
    } finally {
      setIsAnalysingInterview(false);
    }
  };

  const handleEndInterview = async () => {
    setInterviewOn(false);
    localStorage.removeItem("Interview State");
    localStorage.removeItem("Current Question");
    setInterviewState(null);
    setAnalysisResult(null);
    setCurrentQuestion(null);
    setResumeText(null);
    setResumeAnalysed(false);
    toast.success("Interview Ended");
  };

  const getAllInterviews = async () => {
    setIsGettingInterviews(true);
    console.log("Reached");
    try {
      const res = await axiosInstance.get("/api/interview/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllInterviews(res.data.allInterviews);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsGettingInterviews(false);
    }
  };

  // useEffect(() => {
  //   if (token) getAllInterviews();
  // }, [token]);

  return (
    <InterviewContext.Provider
      value={{
        handleAnalyzeResume,
        isAnalysingInterview,
        setIsAnalysingInterview,
        handleInterviewProcess,
        handleEndInterview,
        preparingInterview,
        resumeText,
        handleInterviewSubmit,
        resumeAnalysed,
        interviewState,
        currentQuestion,
        isResumeAnalysing,
        analysisResult,
        interviewOn,
        setInterviewOn,
        getAllInterviews,
        allInterviews,
        isGettingInterviews,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  return useContext(InterviewContext);
};
