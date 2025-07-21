import { useNavigate } from "react-router-dom";
import { questionSets } from "../data/questions";
import { useState } from "react";

function Welcome() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const startQuiz = () => {
    if (!selectedCategory) return;
    const selectedSet = questionSets.find(q => q.category === selectedCategory);
    navigate("/quiz", {
      state: { questions: selectedSet.questions, category: selectedSet.category },
    });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-3 text-indigo-700">Welcome to Queez ⭐</h1>
      <p className="text-gray-600 italic text-sm mb-6">
        “Welcome to Queez app, have fun playing🌞” <br />
        
      </p>

      <label className="block mb-2 font-medium text-gray-700">Choose a Category:</label>
      <select
        className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">-- Select a category --</option>
        {questionSets.map(({ category }) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button
        onClick={startQuiz}
        disabled={!selectedCategory}
        className={`w-full px-6 py-3 rounded-full font-semibold transition-all ${
          selectedCategory
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Welcome;
