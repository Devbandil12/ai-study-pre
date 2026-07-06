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
    <div className="space-y-10">
      <CourseIntroCard course={course} />

      <section>
        <p className="eyebrow mb-1">Practice</p>
        <h2 className="text-lg font-bold tracking-tight text-white">
          Study Material
        </h2>
        <div className="mt-4">
          <StudyMaterialSelection course={course} />
        </div>
      </section>

      <section>
        <p className="eyebrow mb-1">Learn</p>
        <h2 className="text-lg font-bold tracking-tight text-white">
          Chapters
        </h2>
        <ChapterList course={course} />
      </section>
    </div>
  );
}

export default page;
