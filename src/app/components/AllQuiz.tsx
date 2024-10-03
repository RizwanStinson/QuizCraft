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

const AllQuiz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null); 
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/quiz");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId: number) => {
    setActiveQuizId((prevId) => (prevId === quizId ? null : quizId));
  };

  return (
    <div>
      <h1>Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <button onClick={() => handleQuizClick(quiz.id)}>
              {quiz.Title}
            </button>
            {activeQuizId === quiz.id && (
              <div>
                <button disabled={!quiz.Activated}>Barshon</button>
                <button disabled={!quiz.Activated}>Toushik</button>
                <button disabled={!quiz.Activated}>Rizwan</button>
                <button disabled={!quiz.Activated}>Rafsan</button>
                <button disabled={!quiz.Activated}>Shakib</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllQuiz;
