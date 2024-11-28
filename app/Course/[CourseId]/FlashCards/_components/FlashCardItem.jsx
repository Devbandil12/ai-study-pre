import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

function FlashCardItem({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const sound = new Audio("/assets/audio/cardflip.mp3");
    sound.volume = 0.3;
    sound.play();

    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center p-3">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          onClick={handleClick}
          className="w-60 border text-center font-bold pt-5 h-72 bg-gray-400 cursor-pointer flex items-center justify-center rounded-lg shadow-lg p-3"
        >
          {front}
        </div>
        <div
          onClick={handleClick}
          className="w-60 text-center text-white font-medium border pt-5 h-72 bg-primary cursor-pointer flex items-center justify-center rounded-lg shadow-lg p-3"
        >
          {back}
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlashCardItem;
