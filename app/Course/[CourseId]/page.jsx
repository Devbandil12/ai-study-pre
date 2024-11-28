"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntroCard from "./_components/CourseIntroCard";
import StudyMaterialSelection from "./_components/StudyMaterialSelection";
import ChapterList from "./_components/ChapterList";

function page() {
  const [course, setCourse] = useState();
  const { CourseId } = useParams();

  useEffect(() => {
    getcourse();
  }, [CourseId]);

  const getcourse = async () => {
    const result = await axios.get("/api/user-courses?CourseId=" + CourseId);
    setCourse(result.data.result);
  };
  return (
    <div>
      <div>
        <CourseIntroCard course={course} />
        <h2 className="mt-5 text-lg font-bold">Study Materail 👀</h2>
        <div className="mt-3">
          <StudyMaterialSelection course={course} />
          <h2 className="mt-2 font-bold text-xl">Chapters</h2>
        </div>
        <div>
          <ChapterList course={course} />
        </div>
      </div>
    </div>
  );
}

export default page;
