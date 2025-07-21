import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import ScoreSummary from "./components/ScoreSummary";
import ScoreHistory from "./components/ScoreHistory";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";



function App() {
  return (
    <BrowserRouter>
        <Navbar />
         <div className="min-h-screen bg-gradient-to-bl from-indigo-600 via-purple-400 to-pink-500 flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/score" element={<ScoreSummary />} />
          <Route path="/history" element={<ScoreHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
