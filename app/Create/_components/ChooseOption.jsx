"use client";
import { Check } from "lucide-react";
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
    <div>
      <h2 className="text-center text-base font-semibold text-white">
        What are you studying for?
      </h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Pick a goal so the AI can shape your material.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {OptionList.map((icon, ind) => {
          const isSelected = selectedOption === icon.name;
          return (
            <div
              onClick={() => {
                setSelectedOption(icon.name);
                selectedStudyMaterial(icon.name);
              }}
              key={ind}
              className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border p-5 transition-all duration-300 ${
                isSelected
                  ? "border-violet-500/60 bg-violet-500/10 shadow-glow-sm"
                  : "border-white/[0.07] bg-white/[0.02] hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              {isSelected && (
                <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
                  <Check className="h-3 w-3" />
                </span>
              )}
              <img
                src={icon.icon}
                alt={icon.name}
                className="mb-3 w-14 transition-transform duration-300 group-hover:scale-110"
              />
              <h2 className="text-sm font-semibold capitalize text-zinc-200">
                {icon.name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChooseOption;
