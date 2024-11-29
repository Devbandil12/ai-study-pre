import { Progress } from "@/components/ui/progress";
import React from "react";
import "./courseintro.css";

function CourseIntroCard({ course }) {
  return course ? (
    <div className="p-5 bg-gradient-to-r from-teal-600 via-blue-500 to-purple-600 border border-gray-300 shadow-lg rounded-lg flex flex-col gap-4 animate-gradient-background">
      <div className="flex gap-6 items-center">
        {/* Course Image */}
        <img
          src="/course.png"
          alt="Course Image"
          className="w-20 h-20 object-cover rounded-md shadow-md"
        />

        {/* Course Details */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-white">
            {course?.courseLayout?.courseName}
          </h2>
          <p className="text-white text-sm line-clamp-3">
            {course?.courseLayout?.courseSummary}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress className="mt-4 bg-gradient-to-r from-teal-500 via-blue-400 to-purple-500" />

      {/* Total Chapters */}
      <h2 className="text-lg font-semibold text-white mt-4">
        Total Chapters: {course?.courseLayout?.chapters?.length}
      </h2>
    </div>
  ) : (
    <div className="w-full p-5 h-24 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 animate-pulse rounded-lg"></div>
  );
}

export default CourseIntroCard;
