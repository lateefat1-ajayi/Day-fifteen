import { useLocation, useNavigate } from "react-router-dom";

function ScoreSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const score = state?.score || 0;
  const total = state?.total || 0;
  const timeTaken = state?.timeTaken || 0;

  return (
    <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md w-full">
      <blockquote className="italic text-gray-600 mb-6 text-sm border-l-4 border-indigo-600 pl-4">
        “Don’t erase progress, learn from it.” <br />
        <span className="text-indigo-700 font-semibold">— Prof Lateefat . A 😎</span>
      </blockquote>

      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Complete! 🎉</h2>
      <p className="text-lg text-gray-700 mb-2">
        You scored <span className="text-indigo-600 font-bold">{score}</span> out of{" "}
        <span className="font-semibold">{total}</span>
      </p>

      <p className="text-sm text-gray-500 mb-6">
        Time Taken: <span className="font-medium">{timeTaken} seconds</span>
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 hover:bg-indigo-700 cursor-pointer"
        >
          Restart Queez
        </button>

        <button
          onClick={() => navigate("/history")}
          className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 hover:bg-green-700 cursor-pointer"
        >
          View Score History
        </button>
      </div>
    </div>
  );
}

export default ScoreSummary;
