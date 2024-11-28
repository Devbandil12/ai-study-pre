"use client";
import React, { useState } from "react";

function ChooseOption({ selectedStudyMaterial }) {
  const OptionList = [
    {
      name: "exam",
      icon: "/exam.png",
    },
    {
      name: "JOb Prep",
      icon: "/job.png",
    },
    {
      name: "Code",
      icon: "/code.png",
    },
    {
      name: "Course",
      icon: "/course.png",
    },
    {
      name: "other",
      icon: "/others.png",
    },
  ];
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div>
      <h2 className="text-lg text-center font-bold m-5">
        Select the Option You want to Create...!
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
        {OptionList.map((icon, ind) => {
          return (
            <div
              onClick={() => {
                setSelectedOption(icon.name);
                selectedStudyMaterial(icon.name);
              }}
              key={ind}
              className={`flex flex-col items-center justify-center p-4  bg-slate-100 border hover:border-slate-500 rounded-xl ${
                selectedOption == icon.name && "border-slate-800"
              }`}
            >
              <img src={icon.icon} alt="" height={8} className="w-24 px-4" />
              <h2>{icon.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChooseOption;
