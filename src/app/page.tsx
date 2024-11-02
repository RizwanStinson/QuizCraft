"use client";
import Link from "next/link";
import TeacherButton from "./components/TeacherButton";
import StudentButton from "./components/StudentButton";
import simple from "../../public/simple.png"
import Image from "next/image";

export default function Landing() {
  return (
    <div>
    <div className="relative min-h-screen">
      <Image
        src={simple}
        alt="Background"
      />
      </div>
      <div>
        <Link href={`/teacherDash`}>
          <TeacherButton />
        </Link>
        <Link href={`/studentDash`}>
          <StudentButton />
        </Link>
      </div>
    </div>
  );
}
