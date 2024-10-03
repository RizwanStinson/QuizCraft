"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IQuestion } from "../interfaces/interface";

interface Quiz {
  id: number;
  Title: string;
  Timer: number;
  Activated: boolean;
  Questions: IQuestion;
}

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/quiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const toggleActivation = async (
    quizId: number,
    currentActivation: boolean
  ) => {
    try {
      await axios.patch(`http://localhost:3001/quiz/${quizId}`, {
        Activated: !currentActivation,
      });

      const updatedQuizResponse = await axios.get(
        `http://localhost:3001/quiz/${quizId}`
      );
      const updatedQuiz = updatedQuizResponse.data;


      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) => (quiz.id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error toggling quiz activation:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
      <ul className="space-y-2">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <span className="font-medium">{quiz.Title || "Untitled Quiz"}</span>
            <button
              onClick={() => toggleActivation(quiz.id, quiz.Activated)}
              className={`px-4 py-2 rounded ${
                quiz.Activated
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {quiz.Activated ? "Deactivate" : "Activate"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
