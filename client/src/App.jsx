import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import { useAuth } from "./context/AuthContext";
import { GlobalLoader } from "./components/Loaders";
import NotFound from "./pages/Page404";
import Report from "./pages/Report";
import History from "./pages/History";
import Pricing from "./pages/Pricing";
import NavBar from "./components/NavBar";

function App() {
  const { authChecking, token } = useAuth();

  if (authChecking) {
    return <GlobalLoader />;
  }

  return (
    <div className="min-w-xs bg-linear-60 pt-4 px-2 from-linen-50 to-linen-200 text-dark-garnet">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route
          path="/interview"
          element={token ? <Interview /> : <Navigate to="/" replace />}
        /> */}

        {token && <Route path="/interview" element={<Interview />} />}
        <Route path="/:id/report" element={<Report />} />
        <Route path="/history" element={<History />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
