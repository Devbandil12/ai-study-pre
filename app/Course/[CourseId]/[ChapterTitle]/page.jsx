"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Loader2,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { CourseId, ChapterTitle } = useParams();

  useEffect(() => {
    if (ChapterTitle) {
      getChapter();
    }
  }, [ChapterTitle]);

  useEffect(() => {
    setCopied(false);
  }, [stepCount]);

  const getChapter = async () => {
    const res = await axios.post("/api/Getting-Chapters", {
      courseid: CourseId,
      chaptertitle: decodeURIComponent(ChapterTitle),
      all: "none",
    });
    setNotes(res.data[0]?.notes || []);
  };

  const cleanCode = (code = "") => code.replace(/```/g, "").trim();

  const currentNote = notes?.[stepCount]?.documentation;

  return notes.length > 0 ? (
    <div className="min-h-screen">
      {/* Reader toolbar */}
      <div className="mb-6 flex items-center gap-4">
        {stepCount !== 0 ? (
          <Button
            variant="outline"
            className="gap-1.5 rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white"
            onClick={() => setStepCount(stepCount - 1)}
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
        ) : (
          <Link href={`/Course/${CourseId}`}>
            <Button
              variant="outline"
              className="gap-1.5 rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Course
            </Button>
          </Link>
        )}

        {/* Progress Bar */}
        <div className="flex flex-1 items-center gap-1.5">
          {notes.map((_, index) => (
            <button
              key={index}
              onClick={() => setStepCount(index)}
              aria-label={`Go to section ${index + 1}`}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                index <= stepCount
                  ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                  : "bg-white/[0.08] hover:bg-white/[0.16]"
              }`}
            />
          ))}
        </div>

        {stepCount < notes.length - 1 && (
          <Button
            className="btn-gradient gap-1.5 rounded-xl font-semibold"
            onClick={() => setStepCount(stepCount + 1)}
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Current Note */}
      <div className="surface p-6 shadow-card md:p-10">
        {currentNote ? (
          <article key={stepCount} className="animate-fade-up">
            {/* Section meta */}
            <p className="eyebrow mb-2">
              Section {stepCount + 1} of {notes.length}
            </p>

            {/* Title */}
            <h2 className="text-2xl font-bold tracking-tight text-gradient md:text-3xl">
              {currentNote.Title}
            </h2>

            {/* Concept */}
            <div
              className="prose-invert mt-6 text-base leading-relaxed text-zinc-300 [&_b]:text-white [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: currentNote.Concept }}
            />

            {/* Example */}
            {currentNote.Example && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0E]">
                <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                    <span className="ml-2 text-xs font-medium text-muted-foreground">
                      Example
                    </span>
                  </div>
                  <button
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.1] hover:text-white"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        cleanCode(currentNote.Example)
                      );
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-300">
                  <code>{cleanCode(currentNote.Example)}</code>
                </pre>
              </div>
            )}
          </article>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-up">
            <div className="mb-5 inline-flex rounded-2xl border border-violet-500/25 bg-violet-500/10 p-4">
              <PartyPopper className="h-8 w-8 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-gradient">Thank you! 😀</h2>
            <p className="mt-2 max-w-md text-base text-muted-foreground">
              Hope you learned a lot. Let&apos;s play some games with your
              knowledge!
            </p>
            <Link href={`/Course/${CourseId}`} className="mt-8">
              <Button className="btn-gradient gap-2 rounded-xl px-6 font-semibold">
                Back to course <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  ) : (
    // Loading State
    <div className="flex h-[70vh] flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
      Loading chapter…
    </div>
  );
}
