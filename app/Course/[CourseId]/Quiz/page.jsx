"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Target, Trophy, XCircle } from "lucide-react";
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
    // ignore clicks while feedback for the previous answer is still showing,
    // otherwise each click queues another timeout and the counters run past
    // the quiz length (progress > 100% and the finish screen unmounts)
    if (isCorrect !== null) return;

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

  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="flex min-h-[80vh] flex-col">
      {/* Header */}
      <header className="mb-8 text-center">
        <span className="chip mb-4">
          <Target className="h-3.5 w-3.5 text-violet-400" />
          Quiz mode
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Quiz <span className="text-gradient">Competition</span> 🎯
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Test your knowledge with quick questions!
        </p>
      </header>

      {/* Main Content */}
      {quizContent ? (
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center">
          {/* Progress */}
          <div className="mb-10 w-full">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>
                Question {Math.min(stepComplete + 1, quizContent?.quiz?.length)}{" "}
                of {quizContent?.quiz?.length}
              </span>
              <span>
                {Math.min(
                  100,
                  Math.round((numquiz / quizContent?.quiz?.length) * 100)
                )}
                %
              </span>
            </div>
            <Progress
              value={Math.min(100, (numquiz / quizContent?.quiz?.length) * 100)}
              className="h-2 bg-white/[0.06]"
            />
          </div>

          {/* Question */}
          <div className="w-full text-center">
            {stepComplete >= quizContent?.quiz?.length ? (
              <div className="surface animate-fade-up flex flex-col items-center px-6 py-16">
                <div className="mb-5 inline-flex rounded-2xl border border-violet-500/25 bg-violet-500/10 p-4">
                  <Trophy className="h-8 w-8 text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-gradient">
                  Quiz complete!
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thanks for playing — keep the streak going.
                </p>
                <Link href={"/dashboard"} className="mt-8">
                  <Button className="btn-gradient gap-2 rounded-xl px-6 font-semibold">
                    Go Home <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div key={stepComplete} className="animate-fade-up">
                <h2 className="mb-8 text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
                  {quizContent?.quiz[stepComplete]?.question}
                </h2>

                {/* Options */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {quizContent?.quiz[stepComplete]?.options?.map(
                    (optionValue, index) => (
                      <button
                        key={index}
                        disabled={isCorrect !== null}
                        onClick={() => handleOptionClick(optionValue)}
                        className={`group flex items-center gap-3 rounded-2xl border p-4 text-left text-base font-semibold transition-all duration-300 ${
                          option === optionValue
                            ? "border-violet-500/60 bg-violet-500/15 text-white shadow-glow-sm"
                            : "border-white/[0.08] bg-white/[0.03] text-zinc-200 hover:-translate-y-0.5 hover:border-violet-500/40 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-colors ${
                            option === optionValue
                              ? "border-violet-400/60 bg-violet-500 text-white"
                              : "border-white/10 bg-white/[0.04] text-muted-foreground group-hover:text-violet-300"
                          }`}
                        >
                          {optionLetters[index]}
                        </span>
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
                className={`animate-fade-up mt-8 flex items-center justify-center gap-2.5 rounded-2xl border p-4 text-base font-bold ${
                  isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/40 bg-red-500/10 text-red-300"
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" /> Correct!
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 shrink-0" />
                    Wrong! Correct Answer:{" "}
                    {quizContent?.quiz[stepComplete]?.answer}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Loading spinner
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-violet-400" />
          Loading quiz…
        </div>
      )}
    </div>
  );
}

export default Page;
