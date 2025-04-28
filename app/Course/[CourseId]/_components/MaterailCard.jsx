"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function MaterailCard({ data, studytype, course }) {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  // Play sound when generating flashcards
  const waitingsound = () => {
    const audio = new Audio("/assets/audio/waiting.mp3");
    audio.volume = 0.3;
    audio.play();
  };

  // Handle Generate button click
  const handleGenerate = async () => {
    setLoading(true);
    waitingsound();

    try {
      const res = await axios.post("/api/Generate-FlashCard", {
        type: data?.type,
        course: course,
      });
      setRefresh(true);
      console.log(res);
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`border cursor-pointer shadow-lg p-5 rounded-lg flex flex-col justify-center items-center transition-transform hover:scale-105 hover:shadow-2xl ${
        (studytype?.[data?.type] == null && "grayscale") ||
        (studytype?.[data?.type]?.length === 0 && "grayscale")
      } bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900`}
    >
      {/* Status Badge */}
      <span
        className={`font-semibold my-2 px-2 text-white rounded-full text-xs ${
          studytype?.[data?.type] == null ||
          studytype?.[data?.type]?.length === 0
            ? "bg-red-500"
            : "bg-green-500"
        }`}
      >
        {studytype?.[data?.type] == null ||
        studytype?.[data?.type]?.length === 0
          ? "Generate"
          : "Ready"}
      </span>

      {/* Icon */}
      <img
        src={data?.icon}
        alt={data?.name}
        className="w-16 text-white fill-current filter drop-shadow-lg transition-transform hover:scale-110"
      />

      {/* Name & Description */}
      <h2 className="font-bold my-1 text-sm text-primary">{data?.name}</h2>
      <h2 className="text-xs text-gray-300 w-full text-center">{data?.desc}</h2>

      {/* Action Button */}
      {studytype?.[data?.type] == null ||
      studytype?.[data?.type]?.length === 0 ? (
        <Button
          className="w-full mt-2"
          onClick={handleGenerate}
          disabled={
            loading ||
            refresh ||
            data?.name === "Question&Answer" ||
            data?.name === "Matching Pairs"
          }
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin mr-2" />
              Generating...
            </>
          ) : refresh ? (
            "Refresh the Page"
          ) : data?.name === "Question&Answer" ||
            data?.name === "Matching Pairs" ? (
            "Comming soon.."
          ) : (
            "Generate"
          )}
        </Button>
      ) : (
        <Link href={`/Course/${course?.CourseID}/${data?.path}`}>
          <Button variant="outline" className="  mt-2">
            View
          </Button>
        </Link>
      )}
    </div>
  );
}

export default MaterailCard;
