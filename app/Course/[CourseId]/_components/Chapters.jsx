"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function Chapters({ chapter, data }) {
  const [isloading, setIsloading] = useState(false);
  const [result, setResult] = useState("");
  const { CourseId } = useParams();

  // Check if the chapterTitle exists in data
  const isChapterAvailable = data?.some(
    (item) => item.chapterTitle === chapter?.chapterTitle
  );

  // Handle chapter generation
  const handleChapterGenerate = async () => {
    setIsloading(true);
    const res = await axios.post("/api/Generate-Chapters", {
      topics: chapter?.topics,
      courseid: CourseId,
      chapterTitle: chapter?.chapterTitle,
    });
    setIsloading(false);
    setResult(res?.data?.res);
  };

  return (
    <div className="p-4 flex gap-6 items-start justify-between shadow-lg border rounded-xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
      <div className="flex flex-col items-start">
        <h2 className="text-3xl">{chapter.emoji}</h2>
        <h3 className="font-bold text-white text-lg mt-2 line-clamp-2">
          {chapter?.chapterTitle}
        </h3>
        <p className="text-sm text-gray-400 font-medium mt-1 line-clamp-2">
          {chapter?.summary}
        </p>

        <div className="mt-4 w-full">
          <Progress value={isloading ? 50 : 100} />{" "}
          {/* Example progress value */}
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-col items-center justify-center">
        {isChapterAvailable || result === "success" ? (
          <Link href={`/Course/${CourseId}/${chapter?.chapterTitle}`}>
            {" "}
            <Button className="w-full mt-2">View</Button>
          </Link>
        ) : (
          <Button
            onClick={handleChapterGenerate}
            disabled={isloading || isChapterAvailable}
            className="w-full mt-2"
          >
            {isloading ? "Generating..." : "Generate"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Chapters;
