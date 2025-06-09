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
import { Loader2 } from "lucide-react";

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
    <div className="h-screen w-full flex flex-col p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="mb-10">
        <h2 className="text-3xl font-extrabold text-center mb-2">
          🚀 FlashCards
        </h2>
        <p className="text-center text-gray-400 max-w-md mx-auto">
          Boost your memory with quick flashcards! Remember concepts faster and
          better. 🧠✨
        </p>
      </header>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <Loader2 className="animate-spin w-16 h-16 text-primary" />
        </div>
      ) : (
        // Flashcard Carousel
        <div className="flex-1 flex flex-col justify-center items-center">
          <Carousel className="w-full max-w-xl">
            <CarouselContent className="p-4">
              {flipCardContent.length > 0 ? (
                flipCardContent.map((card, index) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <FlashCardItem front={card.front} back={card.back} />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="flex justify-center items-center w-72 h-52 bg-gray-700 rounded-lg border border-gray-600">
                    <p className="text-gray-400">No FlashCards Available 😢</p>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            {/* Controls */}
            <div className="flex justify-between mt-4">
              <div onClick={handlePrevious}>
                <CarouselPrevious className="hover:scale-110 text-black transition-transform hover:bg-primary hover:text-white" />
              </div>
              <div onClick={handleNext}>
                <CarouselNext className="hover:scale-110 transition-transform bg-primary text-white hover:bg-purple-700" />
              </div>
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default Page;
