import { Progress } from "@/components/ui/progress";
import React from "react";

function CourseIntroCard({ course }) {
  return course ? (
    <div className="p-3 bg-slate-100 border shadow-lg  rounded-lg">
      <div className="flex gap-5 justify-between items-center">
        <img src="/course.png" alt="" className="w-20" />
        <div>
          <h2 className="text-xl font-bold">
            {course?.courseLayout?.courseName}
          </h2>
          <h2 className="text-gray-700 line-clamp-3">
            {course?.courseLayout?.courseSummary}
          </h2>
        </div>
      </div>

      <Progress className={"mt-3"} />
      <h2 className="text-lg text-primary font-semibold mt-2">
        Total Chapters:{course?.courseLayout?.chapters.length}
      </h2>
    </div>
  ) : (
    <>
      <div className="w-full p-5 h-24 bg-slate-300 animate-pulse rounded-xl"></div>
    </>
  );
}

export default CourseIntroCard;
