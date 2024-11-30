"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { CourseId } = useParams(); // Avoid "let" for destructuring constants
  const [option, setOption] = useState("");
  const [stepComplete, setStepComplete] = useState(0);
  const [quizContent, setQuizContent] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (CourseId) getQuiz();
  }, [CourseId]);

  // Fetch quiz data
  const getQuiz = async () => {
    try {
      const res = await axios.get(
        `/api/Generate-FlashCard?contentType=Quiz&CourseId=${CourseId}`
      );
      const data = JSON.parse(
        res.data.res[0].content.replace("```json", "").replace("```", "")
      );
      setQuizContent(data);
    } catch (error) {
      console.error("Error fetching quiz content:", error);
    }
  };
  const handlewrongsound = () => {
    const audio = new Audio("/assets/audio/wrong.mp3");
    audio.volume = 0.3;
    audio.play();
  };
  const handlecorrect = () => {
    const audio = new Audio("/assets/audio/correct.mp3");
    audio.volume = 0.3;
    audio.play();
  };

  // H
  // Handle option click
  const handleClick = (selectedOption) => {
    setOption(selectedOption);

    const currentAnswer = quizContent?.quiz[stepComplete]?.answer;
    if (currentAnswer == selectedOption) {
      setIsCorrect(true);
      handlecorrect();
    } else {
      handlewrongsound();
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsCorrect(null);
      setOption("");
      setStepComplete((prev) => prev + 1);
    }, 3000);
  };

  return (
    <div className="h-screen">
      {quizContent ? (
        <div>
          <header className="text-3xl text-center font-bold text-primary">
            Quiz Competition
          </header>

          {/* Progress Bar */}
          <div className="flex justify-center items-center gap-3 pt-5">
            {stepComplete > 0 && (
              <Button
                variant="outline"
                onClick={() => setStepComplete((prev) => prev - 1)}
              >
                Prev
              </Button>
            )}

            {quizContent.quiz.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-5 rounded-2xl px-1 ${
                  index < stepComplete ? "bg-blue-600" : "bg-slate-300"
                }`}
              ></div>
            ))}

            {stepComplete < quizContent.quiz.length - 1 && (
              <Button onClick={() => setStepComplete((prev) => prev + 1)}>
                Next
              </Button>
            )}
          </div>

          {/* Quiz Question */}
          <div className="mt-10">
            <h2 className="text-xl text-slate-200 font-semibold mb-5">
              Q.{quizContent?.quiz[stepComplete]?.question}
            </h2>

            {/* Quiz Options */}
            <div className="grid font-bold grid-cols-1 md:grid-cols-2 gap-5">
              {quizContent?.quiz[stepComplete]?.options?.map(
                (optionValue, index) => (
                  <h2
                    key={index}
                    onClick={() => handleClick(optionValue)}
                    className={`w-full text-slate-200 cursor-pointer shadow-md p-3 border text-center hover:bg-primary hover:text-white rounded-xl ${
                      option === optionValue ? "bg-primary text-white" : ""
                    }`}
                  >
                    {optionValue}
                  </h2>
                )
              )}
            </div>
          </div>

          {/* Feedback Message */}
          {isCorrect !== null && (
            <div
              className={`mt-5 p-5 text-center font-bold text-xl rounded-3xl border shadow-lg ${
                isCorrect
                  ? "bg-green-400 animate-pulse border-green-600"
                  : "bg-red-400 animate-pulse border-red-500"
              }`}
            >
              {isCorrect ? (
                "Correct!"
              ) : (
                <>
                  <h2>Incorrect!</h2>
                  <h3 className="font-medium text-lg">
                    the Correct Answer is :{" "}
                    {quizContent?.quiz[stepComplete]?.answer}
                  </h3>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center mt-10">
            <img src="/logo.svg" alt="" className="w-16 animate-spin" />
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
