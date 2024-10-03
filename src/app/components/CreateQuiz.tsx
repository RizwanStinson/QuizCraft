
import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [questions, setQuestions] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);

  useEffect(() => {
    fetchActiveQuiz();
  }, []);

  const fetchActiveQuiz = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes?active=true`
      );
      setActiveQuiz(response.data[0] || null);
    } catch (error) {
      console.error("Error fetching active quiz:", error);
    }
  };

  const addQuestion = (type) => {
    setQuestions([
      ...questions,
      { type, text: "", options: type === "MCQ" ? ["", "", "", ""] : null },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const createQuiz = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes`,
        {
          title: quizTitle,
          timeLimit: parseInt(timeLimit),
          questions,
          active: false,
          createdAt: new Date().toISOString(),
        }
      );
      console.log("Quiz created:", response.data);
      clearForm();
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const activateQuiz = async () => {
    if (!activeQuiz) return;
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${activeQuiz.id}`,
        { active: true }
      );
      fetchActiveQuiz();
    } catch (error) {
      console.error("Error activating quiz:", error);
    }
  };

  const endQuiz = async () => {
    if (!activeQuiz) return;
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${activeQuiz.id}`,
        { active: false }
      );
      setActiveQuiz(null);
    } catch (error) {
      console.error("Error ending quiz:", error);
    }
  };

  const clearForm = () => {
    setQuizTitle("");
    setTimeLimit("");
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Teacher Panel
            </h2>

            {activeQuiz ? (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">
                  Active Quiz: {activeQuiz.title}
                </h3>
                <button
                  onClick={endQuiz}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  End Quiz
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createQuiz();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="Quiz Title"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  placeholder="Time Limit (minutes)"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {questions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) =>
                        updateQuestion(index, "text", e.target.value)
                      }
                      placeholder={`Question ${index + 1}`}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                    {question.type === "MCQ" &&
                      question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.options];
                            newOptions[optionIndex] = e.target.value;
                            updateQuestion(index, "options", newOptions);
                          }}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        />
                      ))}
                  </div>
                ))}
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => addQuestion("MCQ")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add MCQ
                  </button>
                  <button
                    type="button"
                    onClick={() => addQuestion("TrueFalse")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add True/False
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                  Create Quiz
                </button>
              </form>
            )}

            {!activeQuiz && (
              <button
                onClick={activateQuiz}
                className="mt-4 w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Activate Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


