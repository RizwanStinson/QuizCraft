"use client";
import Link from "next/link";
import TeacherButton from "./components/TeacherButton";
import StudentButton from "./components/StudentButton";

export default function Landing() {
  return (
    <div>
      <Link href={`/teacherDash`}>
        <TeacherButton />
      </Link>
      <Link href={`/studentDash`}>
        <StudentButton />
      </Link>
    </div>
  );
}



 