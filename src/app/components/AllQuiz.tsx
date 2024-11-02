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

interface IAnswer {
  questionTitle: string
  answer: string
}
interface ISubmission {
  participant: string
  answers: IAnswer[]

}

const AllQuiz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null); 
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [timer, setTimer] = useState<number | null>(null);
  const [name, setName] = useState("")
  const [answers, setAnswers] = useState<IAnswer[]>([])

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

 useEffect(() => {
   let interval: NodeJS.Timeout | null = null; // Allow interval to be initially null

   if (timer && timer > 0) {
     interval = setInterval(() => {
       setTimer((prev) => (prev ? prev - 1 : 0));
     }, 1000);
   } else if (timer === 0) {
     handleSubmit();
   }

   return () => {
     if (interval) clearInterval(interval); // Only clear if interval is not null
   };
 }, [timer]);


  const handleQuizClick = (quizId: number) => {
    setActiveQuizId((prevId) => (prevId === quizId ? null : quizId));
  };

  const handleShowQuiz = (quizId:number) => {
    const quiz = quizzes.find((q) => q.id === quizId)
    if(quiz) {
      setSelectedQuiz(quiz)
      setTimer(quiz.Timer)
       setAnswers([]);
    }
  }

  const handleAnswerSelection = (questionTitle: string, answer: string) => {
    setAnswers((prevAnswers) => {
      // Update the answer if it already exists for the question
      const existingAnswerIndex = prevAnswers.findIndex(
        (ans) => ans.questionTitle === questionTitle
      );

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex].answer = answer;
        return updatedAnswers;
      } else {
        // Add a new answer entry if it doesn't exist
        return [...prevAnswers, { questionTitle, answer }];
      }
    });
  };

   const handleSubmit = () => {
     const submission: ISubmission = {
       participant: name,
       answers,
     };
     console.log("Submission:", submission); // You can handle submission further as needed
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
                <button
                  disabled={!quiz.Activated}
                  onClick={() => handleShowQuiz(quiz.id)}
                >
                  Attend
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {selectedQuiz && (
        <div>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h2>{selectedQuiz.Title}</h2>
          <p>Time remaining: {timer} seconds</p>
          {Array.isArray(selectedQuiz.Questions) &&
            selectedQuiz.Questions.map((question) => (
              <div key={question.id}>
                <h3>{question.questionText}</h3>
                <ul>
                  {question.options.map((option: { id: string | number; text: string }) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        handleAnswerSelection(
                          question.questionText,
                          option.text
                        )
                      }
                    >
                      {option.text}
                    </button>
                  ))}
                </ul>
              </div>
            ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>

  );};
export default AllQuiz;
