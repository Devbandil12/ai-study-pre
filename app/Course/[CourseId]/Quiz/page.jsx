"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function Page() {
  const { CourseId } = useParams();
  const [option, setOption] = useState("");
  const [stepComplete, setStepComplete] = useState(0);
  const [numquiz, setNumquiz] = useState(0);
  const [quizContent, setQuizContent] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (CourseId) fetchQuiz();
  }, [CourseId]);

  const fetchQuiz = async () => {
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

  const playSound = (type) => {
    const audio = new Audio(
      type === "correct"
        ? "/assets/audio/correct.mp3"
        : "/assets/audio/wrong.mp3"
    );
    audio.volume = 0.3;
    audio.play();
  };

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);

    const currentAnswer = quizContent?.quiz[stepComplete]?.answer;
    const isAnswerCorrect = currentAnswer === selectedOption;

    setIsCorrect(isAnswerCorrect);
    playSound(isAnswerCorrect ? "correct" : "wrong");

    setTimeout(() => {
      setIsCorrect(null);
      setOption("");
      setNumquiz((pre) => pre + 1);
      setStepComplete((prev) => prev + 1);
    }, 2500);
  };

  return (
    <div className=" rounded-md min-h-screen p-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary">
          Quiz Competition 🎯
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Test your knowledge with quick questions!
        </p>
      </header>

      {/* Main Content */}
      {quizContent ? (
        <div className=" flex flex-col justify-center items-center w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ">
          {/* Progress */}
          <Progress
            value={(numquiz / quizContent?.quiz?.length) * 100}
            className="my-10 mx-5"
          />
          {/* <div className="flex items-center gap-2 mb-8">
            {quizContent.quiz.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all ${
                  index < stepComplete
                    ? "bg-green-500"
                    : index === stepComplete
                    ? "bg-primary"
                    : "bg-gray-500"
                }`}
              />
            ))}
          </div> */}

          {/* Question */}
          <div className="text-center max-w-2xl">
            {quizContent?.quiz?.length == stepComplete ? (
              <Link
                href={"/dashboard"}
                className=" text-white text-xl underline"
              >
                Thanks for playing Go Home
              </Link>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Q{stepComplete + 1}:{" "}
                  {quizContent?.quiz[stepComplete]?.question}
                </h2>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {quizContent?.quiz[stepComplete]?.options?.map(
                    (optionValue, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(optionValue)}
                        className={`border border-gray-700 rounded-lg p-4 text-lg font-semibold transition-all ${
                          option === optionValue
                            ? "bg-primary text-white scale-105"
                            : "bg-gray-800 hover:bg-primary hover:text-white"
                        }`}
                      >
                        {optionValue}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Feedback */}
            {isCorrect !== null && (
              <div
                className={`mt-6 p-4 text-xl font-bold rounded-xl animate-pulse ${
                  isCorrect ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {isCorrect
                  ? "✅ Correct!"
                  : `❌ Wrong! Correct Answer: ${quizContent?.quiz[stepComplete]?.answer}`}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Loading spinner
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="animate-spin text-primary w-16 h-16" />
        </div>
      )}
    </div>
  );
}

export default Page;
