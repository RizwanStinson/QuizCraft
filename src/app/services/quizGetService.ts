import axios from "axios";


export const getQuiz = async () => {
  try {
    const allQuizGet = await axios.get("http://localhost:3001/quiz");
    console.log("All Quiz: ", allQuizGet);
    return allQuizGet;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
