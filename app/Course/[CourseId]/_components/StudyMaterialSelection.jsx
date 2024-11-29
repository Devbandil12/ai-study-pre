"use client";
import React, { useEffect, useState } from "react";
import MaterailCard from "./MaterailCard";
import axios from "axios";

function StudyMaterialSelection({ course }) {
  const [studyTypeContent, setStudyTypeContent] = useState();
  const [isCardVisible, setIsCardVisible] = useState(true);

  const materialList = [
    {
      name: "FlashCards",
      icon: "/flashcards.png",
      desc: "Learn with flashcards and keep it remeber",
      type: "FlashCard",
      path: "/FlashCards",
    },
    {
      name: "Quizz",
      icon: "/Quizz.png",
      desc: "Enough Learning, Are You Ready For Quizz.!",
      type: "Quiz",
      path: "/Quiz",
    },
    {
      name: "Question&Answer",
      icon: "/QNA.png",
      desc: "Lets Have A QNA, what do you Think..?",
      type: "QNA",
      path: "/QNA",
    },
    {
      name: "Matching Pairs",
      icon: "/matching.png",
      desc: "Learn with Matchings and easy Peasy Learning",
      type: "Matching",
      path: "/Matching",
    },
  ];

  useEffect(() => {
    course && getdata();
  }, [course]);
  const getdata = async () => {
    const res = await axios.post("/api/Study-Material", {
      courseId: course?.CourseID,
      StudyType: "ALL",
    });
    // console.log(res.data);
    setStudyTypeContent(res.data);
  };
  return studyTypeContent ? (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
      {materialList.map((materail, index) => {
        return (
          <MaterailCard
            key={index}
            course={course}
            data={materail}
            studytype={studyTypeContent}
          />
        );
      })}
    </div>
  ) : (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {[1, 2, 3, 4].map((val, ind) => {
          return (
            <div
              key={ind}
              className="w-40 m-2 h-48 bg-slate-300 animate-pulse rounded-2xl "
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default StudyMaterialSelection;
