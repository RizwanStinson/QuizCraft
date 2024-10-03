"use client"
import React, { useState } from 'react';
import axios from 'axios';
import QuizList from '../components/GetQuiz';

const QuizForm = () => {
  const [title, setTitle] = useState('');
  const [timer, setTimer] = useState(30);
  const [questions, setQuestions] = useState([{ questionText: '', options: [{ id: 1, text: '' }, { id: 2, text: '' }, { id: 3, text: '' }, { id: 4, text: '' }] }]);
 const [activate, setActivate] = useState(false);


  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [{ id: 1, text: '' }, { id: 2, text: '' }, { id: 3, text: '' }, { id: 4, text: '' }] }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const quizData = {
      Title: title,
      Timer: timer,
      Activated: activate,
      Questions: questions.map((q, index) => ({
        id: index + 1,
        questionText: q.questionText,
        options: q.options
      }))
    };

    try {
      await axios.post('http://localhost:3001/quiz', quizData);
      setTitle('');
      setTimer(30);
      setQuestions([{ questionText: '', options: [{ id: 1, text: '' }, { id: 2, text: '' }, { id: 3, text: '' }, { id: 4, text: '' }] }]);
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Quiz Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Timer (seconds):
            <input
              type="number"
              value={timer}
              onChange={(e) => setTimer(Number(e.target.value))}
              required
            />
          </label>
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <label>
              Question {qIndex + 1}:
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                required
              />
            </label>
            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>
                  Option {oIndex + 1}:
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    required
                  />
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Submit Quiz</button>
      </form>
      <QuizList />
    </div>
  );
};

export default QuizForm;
