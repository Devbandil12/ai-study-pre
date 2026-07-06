"use client";
import React, { useState } from "react";
import ChooseOption from "./_components/ChooseOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import { AlertCircle, ArrowLeft, ArrowRight, Loader, Sparkles } from "lucide-react";
import axios from "axios";

import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import DashboardHeader from "../dashboard/_components/DashboardHeader";

const steps = ["Choose a goal", "Describe your topic"];

function Page() {
  const [error, setError] = useState(false);
  const [state, setState] = useState(0);
  const [formaData, setFormaData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const waitingsound = () => {
    const audio = new Audio("/assets/audio/waiting.mp3");
    audio.volume = 0.3;
    return audio;
  };

  const submitToAi = async () => {
    const CourseID = uuidv4();
    setError(false);
    setLoading(true);

    try {
      const res = await axios.post("/api/generate-course", {
        CourseID: CourseID,
        ...formaData,
        createBy: user?.primaryEmailAddress?.emailAddress,
      });

      router.replace("/dashboard");
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const HandleInput = (fieldName, Value) => {
    setFormaData((pre) => ({
      ...pre,
      [fieldName]: Value,
    }));
    console.log(formaData);
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 grid-bg [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[640px] -translate-x-1/2 rounded-full glow-violet blur-3xl" />

      <DashboardHeader option={true} />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pb-20 pt-12">
        {/* Heading */}
        <span className="chip mb-4">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          AI course builder
        </span>
        <h1 className="text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
          Create new <span className="text-gradient">study material</span>
        </h1>

        {/* Stepper */}
        <div className="mt-8 flex w-full max-w-md items-center gap-3">
          {steps.map((label, index) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center gap-3">
                <div
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    index <= state ? "bg-violet-500" : "bg-white/[0.08]"
                  }`}
                />
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  index <= state ? "text-violet-300" : "text-muted-foreground"
                }`}
              >
                {index + 1}. {label}
              </span>
            </div>
          ))}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mt-6 flex w-full max-w-md items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Generation failed — the AI service may be busy. Please try again.
          </div>
        )}

        {/* Step content */}
        <div className="surface mt-8 w-full p-6 shadow-card md:p-10">
          {state == 0 ? (
            <ChooseOption
              selectedStudyMaterial={(value) =>
                HandleInput("studyType", value)
              }
            />
          ) : (
            <TopicInput
              setTopic={(value) => HandleInput("topic", value)}
              setDefficulty={(value) => HandleInput("difficulty", value)}
            />
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            {state != 0 ? (
              <Button
                onClick={() => setState((pre) => pre - 1)}
                variant="outline"
                className="gap-2 rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
            ) : (
              <span />
            )}
            {state != 0 ? (
              <Button
                disabled={loading}
                onClick={submitToAi}
                className="btn-gradient gap-2 rounded-xl px-6 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" /> Generating…
                  </>
                ) : error ? (
                  <>
                    <Sparkles className="h-4 w-4" /> Try again
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Generate
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setState((pre) => pre + 1)}
                className="btn-gradient gap-2 rounded-xl px-6 font-semibold"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
