"use client";

import React, { useEffect, useState } from "react";
import Welcome from "./_components/Welcome";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./_components/CourseCard";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
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
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen text-gray-100">
      {/* Welcome Component */}
      <Welcome />

      {/* Header Section */}
      <div className="flex justify-between px-3 items-center mt-5">
        <h2 className="text-xl font-bold hover:underline transition-all">
          Your Courses
        </h2>
        <Button
          onClick={fetchCourses}
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-gray-100 hover:bg-gray-600"
        >
          <RefreshCcw />
          Refresh
        </Button>
      </div>

      {/* Create New Button (Mobile Only) */}
      <div className="flex justify-center items-center mt-5 md:hidden">
        <Link href="/Create">
          <div className="w-40 border-dashed rounded-xl p-5 border-gray-500 text-center hover:bg-gray-700 hover:text-gray-100 transition-all">
            <h2 className="text-lg font-bold text-primary">+ Create New</h2>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {isLoading ? (
          // Loading State with Placeholder Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-40 rounded-lg shadow-md animate-pulse bg-gray-700"
              ></div>
            ))}
          </div>
        ) : courseData.length === 0 ? (
          // No Courses Found
          <div className="flex justify-center items-center mt-28">
            <Link href="/Create">
              <Button variant="outline" className="p-5 w-40 text-black border-gray-500 hover:bg-gray-700 hover:text-gray-100">
                + Create New
              </Button>
            </Link>
          </div>
        ) : (
          // Render Course Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courseData.map((course, index) => (
              <div
                key={index}
                className="m-2 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all"
              >
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
