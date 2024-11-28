"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StudyMaterialSelection from "../_components/StudyMaterialSelection";

function ViewNotes() {
  const [notes, setNotes] = useState();
  const { CourseId } = useParams();
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    getnotes();
  }, []);

  const getnotes = async () => {
    const result = await axios.post("/api/Study-Material", {
      courseId: CourseId,
      StudyType: "Notes",
    });

    // const data = await JSON.parse(result?.data);

    setNotes(result.data);
  };

  // const { content } = notes;
  return (
    notes && (
      <div>
        {/* {console.log(notes.chapters[stepCount]?.content)} */}

        <div className="flex  items-center gap-3 ">
          {stepCount != 0 && (
            <Button
              variant="outline"
              onClick={() => setStepCount(stepCount - 1)}
            >
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
            </div>
          ))}
          {stepCount != notes?.length && (
            <Button onClick={() => setStepCount(stepCount + 1)}>Next</Button>
          )}
        </div>

        <div className="mt-5">
          {stepCount < notes?.length ? (
            JSON.parse(notes[stepCount]?.notes)?.topics?.map((items, index) => {
              return (
                <div key={index + 15}>
                  {console.log(items)}
                  <h2 className="text-xl font-bold text-primary">
                    {items?.topic}
                  </h2>
                  <p>{items?.description}</p>
                  <div className="my-3 w-full overflow-x-auto break-words whitespace-nowrap  rounded-xl bg-slate-300 p-3">
                    <div
                      className=""
                      dangerouslySetInnerHTML={{ __html: items?.example }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="flex justify-center items-center mt-40 ">
                <h2 className="text-2xl font-bold text-primary">
                  Thank you !😀
                </h2>

                <h2>
                  Hope you learned A lot, let play some game with you knwoledge
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}

export default ViewNotes;
