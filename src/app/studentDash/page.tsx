"use client";
import { useEffect, useState } from "react";
import { getQuiz } from "../services/quizGetService";



export default function Landing() {
  const [quizTitles, setQuizTitles] = useState<string[]>([]);
   const [showQuizzes, setShowQuizzes] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuiz();
        if (response && response.data) {
          const allQuiz = response.data;
          console.log("Reload: ", allQuiz);

          setQuizTitles(
            allQuiz.map((quiz: { quizTitle: string }) => quiz.quizTitle)
          );
          console.log("new state: ", quizTitles);
        } else {
          console.error("Invalid response from getQuiz");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleButtonClick = () => {
  setShowQuizzes(prevShowQuizzes => !prevShowQuizzes); 
};


  return (
    <div>
      <button onClick={handleButtonClick}> Student 1</button>
      <button onClick={handleButtonClick}> Student 2</button>
      <button onClick={handleButtonClick}> Student 3</button>

      {showQuizzes && (
        <ul>
          {quizTitles.map((title: string, index: number) => (
            <li key={index}>
              {title}
              <button>Start</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
