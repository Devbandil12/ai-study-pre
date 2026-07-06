"use client";

import React, { useEffect, useState } from "react";
import Welcome from "./_components/Welcome";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./_components/CourseCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, RefreshCcw } from "lucide-react";
import Link from "next/link";

function Page() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchCourses();
    } else {
      setIsLoading(false); // Stop loading if user is not available
    }
  }, [user]);

  const fetchCourses = async () => {
    setIsLoading(true); // Set loading state
    try {
      setCourseData([]);
      const response = await axios.post("/api/user-courses", {
        createBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourseData(response.data.res || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Welcome Component */}
      <Welcome />

      {/* Header Section */}
      <div className="mt-8 flex items-center justify-between px-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            Your Courses
          </h2>
          <p className="text-xs text-muted-foreground">
            Everything you&apos;ve generated, in one place
          </p>
        </div>
        <Button
          onClick={fetchCourses}
          variant="outline"
          className="gap-2 rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white"
        >
          <RefreshCcw className={isLoading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {/* Create New Button (Mobile Only) */}
      <div className="mt-5 flex items-center justify-center px-5 md:hidden">
        <Link href="/Create" className="w-full">
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 p-5 text-center transition-all hover:border-violet-500/50 hover:bg-white/[0.03]">
            <Plus className="h-4 w-4 text-violet-400" />
            <h2 className="text-sm font-semibold text-white">Create New</h2>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {isLoading ? (
          // Loading State with Placeholder Cards
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="skeleton h-48" />
            ))}
          </div>
        ) : courseData.length === 0 ? (
          // No Courses Found
          <div className="surface mt-10 flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 inline-flex rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
              <BookOpen className="h-7 w-7 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              No courses yet
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Generate your first AI course — pick a goal, enter a topic, and
              let the AI do the rest.
            </p>
            <Link href="/Create" className="mt-6">
              <Button className="btn-gradient gap-2 rounded-xl px-6 font-semibold">
                <Plus className="h-4 w-4" /> Create New
              </Button>
            </Link>
          </div>
        ) : (
          // Render Course Cards
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {courseData.map((course, index) => (
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
