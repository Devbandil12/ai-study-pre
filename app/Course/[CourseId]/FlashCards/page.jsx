"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FlashCardItem from "./_components/FlashCardItem";
import { Layers, Loader2 } from "lucide-react";

function Page() {
  const { CourseId } = useParams();
  const [flipCardContent, setFlipCardContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (CourseId) fetchFlashCards();
  }, [CourseId]);

  const fetchFlashCards = async () => {
    try {
      const res = await axios.get(
        `/api/Generate-FlashCard?contentType=FlashCard&CourseId=${CourseId}`
      );
      const data = JSON.parse(
        res.data.res[0].content.replace("```json", "").replace("```", "")
      );
      setFlipCardContent(data || []);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    const sound = new Audio("/assets/audio/pre.mp3");
    sound.volume = 0.3;
    sound.play();
  };

  const handleNext = () => {
    const sound = new Audio("/assets/audio/woose.mp3");
    sound.volume = 0.3;
    sound.play();
  };

  return (
    <div className="flex min-h-[80vh] w-full flex-col">
      {/* Header */}
      <header className="mb-10 text-center">
        <span className="chip mb-4">
          <Layers className="h-3.5 w-3.5 text-violet-400" />
          Flashcards
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Flip. Recall. <span className="text-gradient">Remember.</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Boost your memory with quick flashcards! Remember concepts faster and
          better. 🧠✨
        </p>
      </header>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-violet-400" />
          Loading flashcards…
        </div>
      ) : (
        // Flashcard Carousel
        <div className="flex flex-1 flex-col items-center justify-center">
          <Carousel className="w-full max-w-xl">
            <CarouselContent className="p-4">
              {flipCardContent.length > 0 ? (
                flipCardContent.map((card, index) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <FlashCardItem
                      front={card.front}
                      back={card.back}
                      index={index}
                      total={flipCardContent.length}
                    />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="surface flex h-52 w-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      No FlashCards Available 😢
                    </p>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            {/* Controls */}
            <div className="mt-6 flex justify-center gap-4">
              <div onClick={handlePrevious}>
                <CarouselPrevious className="static h-11 w-11 translate-y-0 rounded-full border-white/10 bg-white/[0.04] text-zinc-200 transition-all hover:scale-105 hover:bg-white/[0.1] hover:text-white" />
              </div>
              <div onClick={handleNext}>
                <CarouselNext className="static h-11 w-11 translate-y-0 rounded-full border-none bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all hover:scale-105 hover:from-violet-500 hover:to-indigo-500" />
              </div>
            </div>
          </Carousel>
          <p className="mt-4 text-xs text-muted-foreground">
            Tap a card to flip it
          </p>
        </div>
      )}
    </div>
  );
}

export default Page;
