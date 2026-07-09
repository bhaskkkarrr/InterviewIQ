import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth, authProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useInterview } from "./InterviewContext";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(false);
  const navigate = useNavigate();
  const login = async () => {
    try {
      setIsLoading(true);
      const res = await signInWithPopup(auth, authProvider);
      const User = res.user;
      let name = User.displayName;
      let email = User.email;
      const result = await axiosInstance.post("/api/auth/sign-in", {
        name,
        email,
      });
      setToken(result.data.token);
      setUser(result.data.user);
      toast.success("Logged in successfully");
      return { success: true };
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Token:", token, "User:", user);

  const getUser = async () => {
    try {
      setAuthChecking(true);
      const res = await axiosInstance.get("/api/auth/get-access-token");
      console.log("res", res);
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true, message: "User found" };
      } else {
        return { success: false, message: "Access not granted" };
      }
    } catch (error) {
      setToken(null);
      setUser(null);
      return { success: false, message: error.message };
    } finally {
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logOut = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/logout");
      console.log("RES", res);
      if (res.data.success) {
        setToken(null);
        setUser(null);
        getUser();
        navigate("/");
        toast.success("Logged out");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isLoading,
        setIsLoading,
        login,
        logOut,
        authChecking,
        setAuthChecking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
