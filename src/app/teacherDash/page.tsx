
"use client"
import React, { useState, useEffect } from "react";
import { submitQuiz } from "../services/quizPostService";
import { IQuizForm } from "../interfaces/interface";
import { getQuiz } from "../services/quizGetService";




const QuizForm = () => {

  const [firstForm, setfirstForm] = useState<IQuizForm>({
    quizTitle:"",
    timer:"",
    type:"",
    startTime:"",
    endTime:"",
    date:"",
    questions:[{
      questionTitle:"",
      options:["", "", "", ""]
    }]
  })
console.log("Form", firstForm)

 const [quizTitles, setQuizTitles] = useState<string[]>([]);

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


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setfirstForm({ ...firstForm, [name]: value });
  };
  console.log("handleChange", handleChange)

  const handleQuestions = (index:number, event: React.ChangeEvent<HTMLInputElement> ) => {
    const {name, value} = event.target
    const allQuestions = [...firstForm.questions]
    if(name === 'questionTitle'){
      allQuestions[index].questionTitle = value
    }else{
      const optionIndex = parseInt(name.replace("option", "")) - 1;
      allQuestions[index].options[optionIndex] = value;
    }
   setfirstForm({ ...firstForm, questions: allQuestions });
  }

    const addQuestion = () => {
      setfirstForm({
        ...firstForm,
        questions: [
          ...firstForm.questions,
          {
            questionTitle: "",
            options: ["", "", "", ""]
          }
        ]
      });
    };

    const submitForm = async () => {
      const formData: IQuizForm = firstForm;
      console.log("formData", formData);
      const response = await submitQuiz(formData);
      console.log("response from here", response);
      if (response && response.data) {
        setQuizTitles(
          response.data.map((quiz: { quizTitle: string }) => quiz.quizTitle)
        );
      }
    }
  return (
    <div>
      <form>
        <input
          type="text"
          name="quizTitle"
          value={firstForm.quizTitle}
          placeholder="Quiz Title"
          onChange={handleChange}
        ></input>
        <input
          type="Number"
          name="timer"
          value={firstForm.timer}
          placeholder="Timer (minutes)"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="type"
          value={firstForm.type}
          placeholder="MCQ or T/F"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="startTime"
          value={firstForm.startTime}
          placeholder="Start Time"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="endTime"
          value={firstForm.endTime}
          placeholder="End Time"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="date"
          value={firstForm.date}
          placeholder="Quiz Date"
          onChange={handleChange}
        ></input>
        {firstForm.questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              name="questionTitle"
              value={question.questionTitle}
              placeholder={`Question ${index + 1}`}
              onChange={(event) => handleQuestions(index, event)}
            />
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                name={`option${optionIndex + 1}`}
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) => handleQuestions(index, e)}
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
      </form>
      <button type="button" onClick={submitForm}>
        Submit Quiz
      </button>
      <div>
        <h3> All Quizzes </h3>
        <ul>
          {quizTitles.map((title,index) => (
            <li key={index}>{title}
            <button>Activate</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default QuizForm