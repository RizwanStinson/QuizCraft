import axios from "axios";
import { IQuizForm } from "../interfaces/interface";

export const submitQuiz = async (formData: IQuizForm) => {
  try {
    const response = await axios.post("http://localhost:3001/quiz", formData);
    const allQuizGet = await axios.get("http://localhost:3001/quiz");
    console.log("All Quiz: ", allQuizGet)
    console.log("Response:", response.data);
    return allQuizGet 
  } catch (error) {
    console.error("Error submitting form:", error); 
  }
};
