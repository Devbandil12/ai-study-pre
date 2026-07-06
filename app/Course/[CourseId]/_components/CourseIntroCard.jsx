import { BookOpen, Sparkles } from "lucide-react";
import React from "react";

function CourseIntroCard({ course }) {
  return course ? (
    <div className="surface relative overflow-hidden p-6 shadow-card md:p-8">
      {/* Ambient accents */}
      <div className="pointer-events-none absolute -top-28 -right-20 h-72 w-72 rounded-full glow-violet blur-2xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full glow-indigo blur-2xl" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
        {/* Course Image */}
        <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/10">
          <img
            src="/course.png"
            alt="Course Image"
            className="h-12 w-12 object-cover"
          />
        </div>

        {/* Course Details */}
        <div className="min-w-0">
          <span className="chip mb-2.5">
            <Sparkles className="h-3 w-3 text-violet-400" />
            AI-generated course
          </span>
          <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            {course?.courseLayout?.courseName}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {course?.courseLayout?.courseSummary}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="chip">
              <BookOpen className="h-3 w-3 text-violet-400" />
              {course?.courseLayout?.chapters?.length} chapters
            </span>
            {course?.difficulty && (
              <span className="chip capitalize">{course.difficulty.toLowerCase()}</span>
            )}
            {course?.studyType && (
              <span className="chip capitalize text-violet-300">
                {course.studyType}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="skeleton h-44 w-full" />
  );
}

export default CourseIntroCard;
