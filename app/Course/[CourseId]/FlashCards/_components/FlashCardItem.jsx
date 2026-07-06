import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { RotateCw } from "lucide-react";

function FlashCardItem({ front, back, index, total }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const sound = new Audio("/assets/audio/cardflip.mp3");
    sound.volume = 0.3;
    sound.play();

    setIsFlipped((prev) => !prev);
  };

  const counter =
    typeof index === "number" && total ? `${index + 1} / ${total}` : null;

  return (
    <div className="flex items-center justify-center p-3">
      <div className="group transition-transform duration-300 hover:-translate-y-1">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front */}
        <div
          onClick={handleClick}
          className="relative flex h-80 w-64 cursor-pointer flex-col items-center justify-center rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 text-center shadow-card transition-colors duration-300 [backface-visibility:hidden] group-hover:border-violet-500/40 group-hover:shadow-glow-sm md:w-72"
        >
          {counter && (
            <span className="absolute left-4 top-4 text-[11px] font-semibold text-muted-foreground">
              {counter}
            </span>
          )}
          <span className="absolute right-4 top-4 text-muted-foreground">
            <RotateCw className="h-3.5 w-3.5" />
          </span>
          <p className="text-lg font-bold leading-snug text-white">{front}</p>
          <span className="absolute bottom-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Question
          </span>
        </div>

        {/* Back */}
        <div
          onClick={handleClick}
          className="relative flex h-80 w-64 cursor-pointer flex-col items-center justify-center rounded-3xl border border-violet-500/40 bg-gradient-to-b from-violet-600 to-indigo-700 p-6 text-center shadow-glow [backface-visibility:hidden] md:w-72"
        >
          {counter && (
            <span className="absolute left-4 top-4 text-[11px] font-semibold text-violet-200/80">
              {counter}
            </span>
          )}
          <span className="absolute right-4 top-4 text-violet-200/80">
            <RotateCw className="h-3.5 w-3.5" />
          </span>
          <p className="max-h-52 overflow-y-auto text-base font-medium leading-relaxed text-white">
            {back}
          </p>
          <span className="absolute bottom-4 text-[11px] font-medium uppercase tracking-widest text-violet-200/80">
            Answer
          </span>
        </div>
      </ReactCardFlip>
      </div>
    </div>
  );
}

export default FlashCardItem;
