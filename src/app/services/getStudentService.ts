import axios from "axios";

export const getStudents = async () => {
  try {
    const allStudentGet = await axios.get("http://localhost:3001/students");
    console.log("All Students: ", allStudentGet);
    return allStudentGet;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
