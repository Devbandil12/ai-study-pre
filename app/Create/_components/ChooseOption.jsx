"use client";
import React, { useState } from "react";

function ChooseOption({ selectedStudyMaterial }) {
  const OptionList = [
    {
      name: "exam",
      icon: "/exam.png",
    },
    {
      name: "Job Prep",
      icon: "/job.png",
    },
    {
      name: "Coding Pratice",
      icon: "/coding practice.png",
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
    <div className=" flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-xl text-white font-medium mb-6">
          Select the Option You Want to Create...!
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {OptionList.map((icon, ind) => {
            return (
              <div
                onClick={() => {
                  setSelectedOption(icon.name);
                  selectedStudyMaterial(icon.name);
                }}
                key={ind}
                className={`flex flex-col items-center justify-center p-6 border font-semibold  text-white  bg-gray-800  shadow-lg hover:shadow-xl cursor-pointer  border-slate-200 hover:border-primary hover:bg-white/40 hover:text-white rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedOption === icon.name && "border-4 border-primary"
                }`}
              >
                <img
                  src={icon.icon}
                  alt={icon.name}
                  className="w-24 px-4 mb-3 transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <h2 className="text-lg">{icon.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChooseOption;
