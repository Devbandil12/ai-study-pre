import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
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
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/Generate-Chapters",
        { course }
      );

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

  return (
    <div className="p-3 ">
      <div>
        {/* Course Header */}
        <div className="flex justify-between gap-5 items-center mb-3">
          <div className="flex justify-between items-center px-3">
            <img src="/course.png" alt="Course" className="w-10 h-10" />
          </div>
          <h2 className="text-white text-xs p-1 bg-primary rounded-lg ">
            22nd Dec/2024
          </h2>
        </div>

        {/* Course Information */}
        <h2 className="font-bold uppercase">{course.topic}</h2>
        <h3 className="text-sm line-clamp-2 text-gray-700 mb-1">
          {course.courseLayout.courseSummary}
        </h3>

        {/* Progress Bar */}
        <Progress value={progressBarVal} />

        {/* Generate or View Button */}
        <div className="flex justify-end mt-3">
          {course.status === "Generating" ? (
            <Button
              disabled={loading || refresh}
              onClick={handleGenerate}
              className={`text-sm rounded-full ${loading && "bg-slate-400"}`}
            >
              {loading ? (
                <>
                  <RefreshCcw className="animate-spin" />
                  Generating...
                </>
              ) : refresh ? (
                "Refresh the Page"
              ) : (
                "Generate"
              )}
            </Button>
          ) : (
            <Link href={`/Course/${course?.CourseID}`}>
              <Button>View</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
