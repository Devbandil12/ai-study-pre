"use client";
import React, { useEffect, useState } from "react";
import Chapters from "./Chapters";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

function ChapterList({ course }) {
  const [data, setData] = useState();

  const { CourseId } = useParams();

  // Extract chapters from course
  const CHAPTERS = course?.courseLayout?.chapters || [];

  useEffect(() => {
    if (CourseId) getchapter();
  }, [CourseId]);

  const getchapter = async () => {
    try {
      const res = await axios.get(`/api/Getting-Chapters?CourseId=${CourseId}`);
      setData(res?.data?.res);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  return (
    <div className="mt-3">
      {data?.map((val, ind) => console.log(val.chapterTitle))}
      {CHAPTERS.length > 0 ? (
        CHAPTERS.map((chapter, ind) => (
          <div className="my-3" key={ind}>
            <Chapters chapter={chapter} data={data} />
          </div>
        ))
      ) : (
        <div className=" text-white text-xl h-screen flex items-center justify-center ">
          {" "}
          <p>No chapters available.</p>
        </div>
      )}
    </div>
  );
}

export default ChapterList;
