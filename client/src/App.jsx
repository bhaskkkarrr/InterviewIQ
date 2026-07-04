import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import { useAuth } from "./context/AuthContext";
import { GlobalLoader } from "./components/Loaders";
import NotFound from "./pages/Page404";

function App() {
  const { authChecking, token } = useAuth();

  if (authChecking) {
    return <GlobalLoader />;
  }

  return (
    <div className="min-w-xs bg-linear-60 from-linen to-linen-200 text-dark-garnet">
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route
          path="/interview"
          element={token ? <Interview /> : <Navigate to="/" replace />}
        /> */}

        {token && <Route path="/interview" element={<Interview />} />}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
