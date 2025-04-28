"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Copy, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const { CourseId, ChapterTitle } = useParams();

  useEffect(() => {
    if (ChapterTitle) {
      getChapter();
    }
  }, [ChapterTitle]);

  const getChapter = async () => {
    const res = await axios.post("/api/Getting-Chapters", {
      courseid: CourseId,
      chaptertitle: decodeURIComponent(ChapterTitle),
      all: "none",
    });
    console.log(res.data[0]);
    setNotes(res.data[0]?.notes.documentation || []);
  };

  const cleanCode = (code = "") => code.replace(/```/g, "").trim();

  const currentNote = notes?.[stepCount];

  return notes.length > 0 ? (
    <div className="p-6 h-screen  bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
      {/* Stepper Navigation */}
      <div className="flex items-center gap-3 mb-8">
        {stepCount !== 0 && (
          <Button variant="outline" onClick={() => setStepCount(stepCount - 1)}>
            Previous
          </Button>
        )}

        {/* Progress Bar */}
        {console.log(notes)}
        <div className="flex items-center flex-1 gap-2">
          {notes.map((_, index) => (
            <div
              key={index}
              className={`rounded-full h-2 flex-1 ${
                index <= stepCount ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {stepCount < notes.length - 1 && (
          <Button onClick={() => setStepCount(stepCount + 1)}>Next</Button>
        )}
      </div>

      {/* Current Note */}
      <div className="mt-5">
        {currentNote ? (
          <div key={stepCount}>
            {/* Title */}
            <h2 className="text-2xl font-bold text-blue-500 mb-3 underline">
              {currentNote.Title}
            </h2>

            {/* Concept */}
            <div
              className="text-slate-200 text-base mb-6"
              dangerouslySetInnerHTML={{ __html: currentNote.Concept }}
            />

            {/* Example */}
            {currentNote.Example && (
              <div className="text-gray-700">
                <h3 className="text-lg text-gray-100 font-semibold mb-2 flex items-center justify-between">
                  Example
                  <Copy
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        cleanCode(currentNote.Example)
                      );
                    }}
                  />
                </h3>
                <pre className="bg-gray-600 text-gray-300 p-4 rounded text-sm overflow-x-auto">
                  <code>{cleanCode(currentNote.Example)}</code>
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-40 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Thank you! 😀
            </h2>
            <p className="text-lg text-gray-300">
              Hope you learned a lot. Let's play some games with your knowledge!
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    // Loading State
    <div className="flex items-center justify-center text-white h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <Loader2 className="animate-spin mr-2" />
      Loading...
    </div>
  );
}
