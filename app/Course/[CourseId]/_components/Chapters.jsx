"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowUpRight, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function Chapters({ chapter, data, index }) {
  const [isloading, setIsloading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);
  const { CourseId } = useParams();

  // Check if the chapterTitle exists in data
  const isChapterAvailable = data?.some(
    (item) => item.chapterTitle === chapter?.chapterTitle
  );

  // Handle chapter generation
  const handleChapterGenerate = async () => {
    setIsloading(true);
    setError(false);
    try {
      const res = await axios.post("/api/Generate-Chapters", {
        topics: chapter?.topics,
        courseid: CourseId,
        chapterTitle: chapter?.chapterTitle,
      });
      setResult(res?.data?.res);
    } catch (err) {
      setError(true);
    } finally {
      setIsloading(false);
    }
  };

  const isReady = isChapterAvailable || result === "success";

  return (
    <div className="surface surface-hover group flex items-center gap-4 p-4 shadow-card md:gap-5 md:p-5">
      {/* Emoji tile */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-2xl md:h-14 md:w-14 md:text-3xl">
        {chapter.emoji}
      </div>

      {/* Chapter info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Chapter {typeof index === "number" ? index + 1 : ""}
          </span>
          {isReady && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-px text-[10px] font-semibold text-emerald-300">
              <span className="h-1 w-1 rounded-full bg-emerald-400" /> Ready
            </span>
          )}
        </div>
        <h3 className="mt-0.5 line-clamp-2 font-bold tracking-tight text-white">
          {chapter?.chapterTitle}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {chapter?.summary}
        </p>
      </div>

      {/* Button Section */}
      <div className="shrink-0">
        {isReady ? (
          <Link href={`/Course/${CourseId}/${chapter?.chapterTitle}`}>
            <Button
              variant="outline"
              className="gap-1 rounded-xl border-white/10 bg-white/[0.03] font-semibold text-zinc-200 hover:bg-white/[0.08] hover:text-white"
            >
              View
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleChapterGenerate}
            disabled={isloading || isChapterAvailable}
            className="btn-gradient gap-1.5 rounded-xl font-semibold"
          >
            {isloading ? (
              <>
                <Loader2 className="animate-spin" /> Generating…
              </>
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
        )}
      </div>
    </div>
  );
}

export default Chapters;
