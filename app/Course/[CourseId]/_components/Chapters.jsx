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
    <div className="p-3 cursor-pointer flex gap-5 justify-between items-center shadow-md border rounded-2xl">
      <h2 className="text-xl">{chapter.emoji}</h2>
      <div>
        <h2 className="font-bold text-sm line-clamp-2">
          {chapter?.chapterTitle}
        </h2>
        <h2 className="text-gray-500 font-medium text-sm line-clamp-2">
          {chapter?.summary}
        </h2>
        <Progress />
      </div>
      {isChapterAvailable || result == "success" ? (
        <Link href={"/Course/" + CourseId + "/" + chapter?.chapterTitle}>
          <Button>View</Button>
        </Link>
      ) : (
        <Button
          onClick={handleChapterGenerate}
          disabled={isloading || isChapterAvailable}
        >
          {isloading ? "Generating..." : "Generate"}
        </Button>
      )}
    </div>
  );
}

export default Chapters;
