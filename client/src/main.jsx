import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { InterviewProvider } from "./context/InterviewContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InterviewProvider>
        <Toaster />
        <App />
      </InterviewProvider>
    </AuthProvider>
  </BrowserRouter>,
);
