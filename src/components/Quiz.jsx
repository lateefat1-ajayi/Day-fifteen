import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { questions, category } = state || {};

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime] = useState(Date.now()); // ✅ Start time when quiz loads

  // Timer logic
  useEffect(() => {
    if (showAnswer || selected) return;

    if (timeLeft === 0) {
      setShowAnswer(true);
      setTimeout(() => handleNext(), 1500); // auto move after 1.5s
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showAnswer, selected]);

  const handleAnswer = (option) => {
    if (selected || showAnswer) return;
    setSelected(option);
    setShowAnswer(true);

    const correct = questions[current].answer;
    if (option === correct) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    setSelected("");
    setShowAnswer(false);
    setTimeLeft(30);
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      const endTime = Date.now(); // ✅ End time
      const durationSeconds = Math.floor((endTime - startTime) / 1000);

      const date = new Date().toLocaleString();
      const newScore = {
        category,
        score,
        total: questions.length,
        date,
        timeTaken: durationSeconds,
      };

      const prev = JSON.parse(localStorage.getItem("queezHistory")) || [];
      localStorage.setItem("queezHistory", JSON.stringify([newScore, ...prev]));
      navigate("/score", { state: newScore });
    }
  };

  if (!questions) return <p className="text-white text-lg">No quiz loaded.</p>;

  const currentQ = questions[current];

  return (
    <div className="w-full max-w-xl text-center bg-white p-6 rounded-xl shadow-xl">
      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <span>{category}</span>
        <span>Question {current + 1} of {questions.length}</span>
        <span className="text-red-500 font-bold">{timeLeft}s</span>
      </div>

      <h2 className="text-lg font-semibold text-indigo-700 mb-4">{currentQ.question}</h2>

      <div className="flex flex-col gap-3 mb-6">
        {currentQ.options.map((option, index) => {
          const isCorrect = option === currentQ.answer;
          const isSelected = option === selected;
          const showFeedback = showAnswer;

          let btnClass = "bg-gray-100 hover:bg-indigo-100";
          if (showFeedback) {
            if (isCorrect) btnClass = "bg-green-500 text-white";
            else if (isSelected) btnClass = "bg-red-500 text-white";
          } else if (isSelected) {
            btnClass = "bg-indigo-600 text-white";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer hover:-translate-y-0.5 ${btnClass}`}
              disabled={!!selected || showAnswer}
            >
              {option}
            </button>
          );
        })}
      </div>

      {(selected || showAnswer || timeLeft === 0) && (
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 hover:bg-indigo-700 cursor-pointer"
        >
          {current + 1 === questions.length ? "Finish Quiz" : "Next"}
        </button>
      )}
    </div>
  );
}

export default Quiz;
