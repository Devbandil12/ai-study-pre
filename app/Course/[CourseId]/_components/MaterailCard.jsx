"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

import React, { useState } from "react";

function MaterailCard({ data, studytype, course }) {
  const [loading, setLoading] = useState(false);
  const waitingsound = () => {
    const audio = new Audio("/assets/audio/waiting.mp3");
    audio.volume = 0.3;

    audio.play();
  };
  const handleGenerate = async () => {
    setLoading(true);

    const res = await axios.post("/api/Generate-FlashCard", {
      type: data?.type,
      course: course,
    });
    setLoading(false);
    console.log(res);
  };
  return (
    <div
      className={`border cursor-pointer shadow-md p-3 rounded-lg flex flex-col justify-center items-center ${
        (studytype?.[data?.type] == null && "grayscale") ||
        (studytype?.[data?.type].length == 0 && "grayscale")
      }`}
    >
      {studytype?.[data?.type] == null ||
      studytype?.[data?.type].length == 0 ? (
        <span className="font-semibold  bg-gray-500 my-2 px-1 text-white rounded-full text-xs">
          Generate
        </span>
      ) : (
        <span className="font-semibold  bg-green-500 my-2 px-1 text-white rounded-full text-xs">
          Ready
        </span>
      )}
      <img src={data?.icon} alt="" className="w-16" />
      <h2 className="font-bold my-1 text-sm ">{data?.name}</h2>
      <h2 className="text-xs text-gray-700 w-full text-center ">
        {data?.desc}
      </h2>
      {studytype?.[data?.type] == null ||
      studytype?.[data?.type].length == 0 ? (
        <Button className="w-full mt-2" onClick={handleGenerate}>
          {loading ? (
            <>
              <Loader2Icon className="animate-spin" />
              Generating..
            </>
          ) : (
            "Generate"
          )}
        </Button>
      ) : (
        <Link href={"/Course/" + course?.CourseID + "/" + data?.path}>
          {" "}
          <Button variant="outline" className="w-full mt-2">
            View
          </Button>
        </Link>
      )}
    </div>
  );
}

export default MaterailCard;
