"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, LoaderPinwheelIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [notes, setNotes] = useState();
  const [stepCount, setStepCount] = useState(0);
  const { CourseId, ChapterTitle } = useParams();

  useEffect(() => {
    ChapterTitle && getchapter();
  }, [ChapterTitle]);

  const getchapter = async () => {
    const res = await axios.post("/api/Getting-Chapters", {
      courseid: CourseId,
      chaptertitle: decodeURIComponent(ChapterTitle),
      all: "none",
    });
    setNotes(res.data?.data[0]?.notes?.notes);
  };
  return notes ? (
    <div>
      {/* {console.log(notes.chapters[stepCount]?.content)} */}

      <div className="flex  items-center gap-3  ">
        {stepCount != 0 && (
          <Button variant="outline" onClick={() => setStepCount(stepCount - 1)}>
            Previous
          </Button>
        )}
        {notes?.map((items, index) => (
          <div
            key={index}
            className={`rounded-full  h-2 w-full ${
              index < stepCount ? "bg-primary" : "bg-gray-300"
            } `}
          >
            {" "}
            {console.log(notes)}
          </div>
        ))}
        {stepCount != notes?.length && (
          <Button onClick={() => setStepCount(stepCount + 1)}>Next</Button>
        )}
      </div>

      <div className="mt-5">
        {stepCount < notes?.length ? (
          notes.map((items, index) => {
            console.log(items);
            return (
              <div key={index + 15}>
                <h2 className="text-xl font-bold text-primary mb-3 mt-3 underline">
                  {items?.topic}
                </h2>
                <div
                  className="text-slate-200"
                  dangerouslySetInnerHTML={{ __html: items?.content }}
                />
                <div
                  className=" bg-slate-300 rounded-lg p-3 mt-3"
                  dangerouslySetInnerHTML={{ __html: items?.example }}
                />
              </div>
            );
          })
        ) : (
          <>
            <div className="flex justify-center items-center mt-40 ">
              <h2 className="text-2xl font-bold text-primary">Thank you !😀</h2>

              <h2>
                Hope you learned A lot, let play some game with you knwoledge
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <>
      <div className="flex items-center justify-center text-white h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ">
        Loading......
      </div>
    </>
  );
}

export default page;
