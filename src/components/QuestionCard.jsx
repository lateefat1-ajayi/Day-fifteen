function QuestionCard({ questionData, currentIndex, handleAnswer, selectedOption }) {
  const { question, options } = questionData;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-xl w-full text-center">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        Question {currentIndex + 1}
      </h2>
      <p className="text-lg text-gray-700 mb-6">{question}</p>

      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`px-4 py-2 rounded-full border font-semibold transition-all cursor-pointer hover:-translate-y-0.5 ${
              selectedOption === option
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 hover:bg-indigo-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
