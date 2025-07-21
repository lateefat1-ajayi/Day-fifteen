import { useEffect, useState } from "react";

function ScoreHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("queezHistory")) || [];
    setHistory(saved);
  }, []);

  const handleDelete = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("queezHistory", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all history?")) {
      setHistory([]);
      localStorage.removeItem("queezHistory");
    }
  };

  const getStars = (score, total) => {
    const percentage = (score / total) * 100;
    const stars = Math.round((percentage / 100) * 5);
    return "⭐".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div className="max-w-2xl m-20 p-4 bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-indigo-700 text-center">
        “Don't erase progress, learn from it.” — Lateefat . A😎
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">No past quiz history yet.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {history.map((entry, index) => (
              <li
                key={index}
                className="bg-gray-50 rounded-md p-3 border shadow-sm text-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-semibold text-indigo-600">{entry.category}</p>
                    <p className="text-gray-700">
                      Score: {entry.score} / {entry.total}
                    </p>
                    <p className="text-yellow-500">{getStars(entry.score, entry.total)}</p>
                    {entry.timeTaken !== undefined && (
                      <p className="text-gray-500">⏱️ Time: {entry.timeTaken}s</p>
                    )}
                    <p className="text-gray-400 text-xs">{entry.date}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center mt-5">
            <button
              onClick={handleClearAll}
              className="text-white bg-red-600 px-4 py-1.5 text-sm rounded-full hover:bg-red-700 transition"
            >
              Clear All History
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ScoreHistory;
