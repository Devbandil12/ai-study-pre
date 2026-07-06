"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowUpRight, Loader2Icon, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function MaterailCard({ data, studytype, course }) {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Play sound when generating flashcards
  const waitingsound = () => {
    const audio = new Audio("/assets/audio/waiting.mp3");
    audio.volume = 0.3;
    audio.play();
  };

  // Handle Generate button click
  const handleGenerate = async () => {
    setLoading(true);
    setError(false);
    waitingsound();

    try {
      const res = await axios.post("/api/Generate-FlashCard", {
        type: data?.type,
        course: course,
      });
      setRefresh(true);
      console.log(res);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty =
    studytype?.[data?.type] == null || studytype?.[data?.type]?.length === 0;
  const isComingSoon =
    data?.name === "Question&Answer" || data?.name === "Matching Pairs";

  return (
    <div
      className={`surface surface-hover group flex flex-col items-center p-5 text-center shadow-card ${
        isEmpty ? "opacity-80" : ""
      }`}
    >
      {/* Status Badge */}
      <span
        className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
          isEmpty
            ? "border-white/10 bg-white/[0.04] text-zinc-400"
            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isEmpty ? "bg-zinc-500" : "bg-emerald-400"
          }`}
        />
        {isEmpty ? "Not generated" : "Ready"}
      </span>

      {/* Icon */}
      <div
        className={`mb-4 inline-flex rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3.5 transition-transform duration-300 group-hover:scale-105 ${
          isEmpty ? "grayscale" : ""
        }`}
      >
        <img src={data?.icon} alt={data?.name} className="w-10" />
      </div>

      {/* Name & Description */}
      <h2 className="text-sm font-bold text-white">{data?.name}</h2>
      <h2 className="mt-1 min-h-8 text-xs leading-relaxed text-muted-foreground">
        {data?.desc}
      </h2>

      {/* Action Button */}
      {isEmpty ? (
        <Button
          className={`mt-4 w-full gap-1.5 rounded-xl font-semibold ${
            isComingSoon
              ? "bg-white/[0.05] text-zinc-500"
              : "btn-gradient"
          }`}
          onClick={handleGenerate}
          disabled={loading || refresh || isComingSoon}
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin" />
              Generating…
            </>
          ) : refresh ? (
            "Refresh the Page"
          ) : isComingSoon ? (
            "Coming soon"
          ) : error ? (
            <>
              <Sparkles className="h-3.5 w-3.5" /> Try again
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" /> Generate
            </>
          )}
        </Button>
      ) : (
        <Link href={`/Course/${course?.CourseID}/${data?.path}`} className="mt-4 w-full">
          <Button
            variant="outline"
            className="w-full gap-1 rounded-xl border-white/10 bg-white/[0.03] font-semibold text-zinc-200 hover:bg-white/[0.08] hover:text-white"
          >
            View <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default MaterailCard;
