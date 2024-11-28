"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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
  const [flipCardContent, setFlipCardContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (CourseId) fetchFlashCards();
  }, [CourseId]);

  const fetchFlashCards = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Generate-FlashCard?contentType=FlashCard&CourseId=${CourseId}`
      );
      const data = JSON.parse(
        res.data.res[0].content.replace("```json", "").replace("```", "")
      );
      setFlipCardContent(data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const hadnlepre = () => {
    const sound = new Audio("/assets/audio/pre.mp3");
    sound.volume = 0.3;
    sound.play();
  };
  const hadnlenext = () => {
    const sound = new Audio("/assets/audio/woose.mp3");
    sound.volume = 0.3;
    sound.play();
  };
  return (
    <div>
      <header>
        <h2 className="text-xl font-bold">FlashCards</h2>
        <p className="font-medium">
          FlashCards: These will help you remember concepts more effectively.
        </p>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader2 className="animate-spin w-12 h-12 text-gray-500" />
        </div>
      ) : (
        <div className="mt-10 p-5">
          <Carousel>
            <CarouselContent>
              {flipCardContent && flipCardContent.length > 0 ? (
                flipCardContent.map((card, index) => (
                  <CarouselItem key={index}>
                    <FlashCardItem front={card.front} back={card.back} />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="flex justify-center items-center w-60 h-48 bg-gray-200 rounded-lg border">
                    <p className="text-gray-500">No FlashCards Available</p>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <div onClick={hadnlepre}>
              <CarouselPrevious />
            </div>
            <div onClick={hadnlenext}>
              <CarouselNext className="bg-primary text-white" />
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default Page;
