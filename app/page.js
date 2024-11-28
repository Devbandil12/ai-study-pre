"use client";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowRight, Mail, Video } from "lucide-react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const sound = new Audio("/assets/audio/cardflip.mp3");
    sound.volume = 0.3;
    sound.play();

    setIsFlipped((prev) => !prev);
  };

  // Animation Variants
  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const textVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
  };

  return (
    <>
      <div>
        {/* Header */}
        <header className="flex shadow-lg p-5 justify-between px-5 items-center">
          <div className="flex gap-1 items-center">
            <img src="/logo.svg" alt="Logo" className="w-10 h-10 hover:rotate-6" />
            <h2 className="text-xl font-bold">Make It Easy</h2>
          </div>
        
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
        </header>

        {/* Main Content */}
        <main className="pt-20 px-10">
          {/* Responsive Container */}
          <motion.div
            className="flex flex-col gap-10 md:flex-row md:justify-between md:items-center px-8"
            initial="hidden"
            animate="visible"
          >
            {/* Left Flip Card */}
            <motion.div
              className="flex justify-center md:justify-between"
              variants={cardVariant}
            >
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {/* Front Side */}
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                  <img
                    src="/cuteanime.jpg"
                    alt="Front side"
                    className="w-32 md:w-40 -rotate-12"
                  />
                </div>
                {/* Back Side */}
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                  <img
                    src="/animecode.jpg"
                    alt="Back side"
                    className="w-32 md:w-40 -rotate-12"
                  />
                </div>
              </ReactCardFlip>
            </motion.div>

            {/* Center Content */}
            <motion.div
              className="text-center md:text-left flex flex-col items-center md:items-start gap-4"
              variants={textVariant}
            >
              <motion.div
      className="rounded-full cursor-pointer text-xs p-1 flex items-center justify-center gap-2 bg-slate-300"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }} // Slight zoom on hover
      transition={{ duration: 0.3 }}
    >
      <motion.h2
        className="font-semibold flex items-center gap-2"
        initial={{ x: -10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }} // Slides in from the left on hover
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs bg-primary rounded-2xl px-3 py-1.5 text-white font-medium">
          Mail
        </span>{" "}
       
        Devbandil120@gmail.com
      </motion.h2>
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 15 }} // Small rotation on hover
        transition={{ duration: 0.3 }}
      >
        <Mail className="w-4" />
      </motion.div>
    </motion.div>
  

             <div className="leading-tight">
             <h2 className="font-extrabold text-3xl md:text-5xl">
                AI-Powered <strong className="text-primary">Exam Prep</strong>
              </h2>
              <h2 className="font-black text-3xl md:text-5xl">
                Material Generator
              </h2>
             
             </div>
             <h2 className="text-gray-400 font-bold mt-2 md:mt-4 text-sm md:text-base">
                Make Your Examination And Interview Easy: Learn with
                FlashCards, Give Quiz and Q&A.
              </h2>
            </motion.div>

            {/* Right Flip Card */}
            <motion.div
              className="flex justify-center md:justify-end"
              variants={cardVariant}
            >
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {/* Front Side */}
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                  <img
                    src="/cuteanime.jpg"
                    alt="Front side"
                    className="w-32 md:w-40 -rotate-12"
                  />
                </div>
                {/* Back Side */}
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                  <img
                    src="/animecode.jpg"
                    alt="Back side"
                    className="w-32 md:w-40 -rotate-12"
                  />
                </div>
              </ReactCardFlip>
            </motion.div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-3 mt-10 justify-center items-center"
            variants={buttonVariant}
          >
            <Link href={"/dashboard"}><Button className="flex gap-2 p-3 w-full md:w-auto">
              Get Started <ArrowRight />
            </Button></Link>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <Video className="fill-black" /> Watch Tutorial
            </Button>
          </motion.div>
        </main>
      </div>
    </>
  );
}
