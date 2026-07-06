import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function CourseCard({ course }) {
  const [refresh, setRefresh] = useState(false);
  const [progressBarVal, setProgressBarVal] = useState(0);
  const [loading, setLoading] = useState(false);
  let intervalId = null;

  const handleProgress = () => {
    // Clear any existing interval
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      setProgressBarVal((prev) => {
        if (prev >= 90) {
          clearInterval(intervalId); // Stop at 90% to wait for server response
          return prev;
        }
        return prev + 10; // Increment progress by 10%
      });
    }, 500); // Update every 500ms
  };

  const handleGenerate = async () => {
    setLoading(true);

    setProgressBarVal(0); // Reset progress
    handleProgress(); // Start progress bar

    try {
      const res = await axios.post("/api/Generate-Chapters", { course });

      setProgressBarVal(100);
      setRefresh(true);
      // Complete progress bar
    } catch (error) {
      console.error("Error generating chapters:", error);
    } finally {
      setLoading(false);

      clearInterval(intervalId); // Ensure interval is cleared
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup interval on unmount
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const chapterCount = course?.courseLayout?.chapters?.length;

  return (
    <div className="surface surface-hover group flex h-full flex-col p-5 shadow-card">
      {/* Course Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="inline-flex rounded-xl border border-violet-500/20 bg-violet-500/10 p-2.5">
          <img src="/course.png" alt="Course" className="h-8 w-8" />
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
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

      {/* Course Information */}
      <h2 className="font-bold capitalize tracking-tight text-white">
        {course.topic}
      </h2>
      <h3 className="mb-4 mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {course.courseLayout.courseSummary}
      </h3>

      {/* Progress Bar */}
      <div className="mt-auto">
        <Progress value={progressBarVal} className="h-1.5 bg-white/[0.06]" />

        {/* Generate or View Button */}
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            {chapterCount ? `${chapterCount} chapters` : "Course"}
          </span>
          <Link href={`/Course/${course?.CourseID}`}>
            <Button
              size="sm"
              className="btn-gradient gap-1 rounded-lg px-4 font-semibold"
            >
              View
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
