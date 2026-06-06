import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import { useAuth } from "./context/AuthContext";
import { GlobalLoader } from "./components/Loaders";

function App() {
  const { isLoading } = useAuth();
  return (
    <>
      {isLoading && <GlobalLoader />}
      <div className="min-w-xs bg-linear-30 from-mauve-50 to-velvet-orchid-50 text-velvet-orchid-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
