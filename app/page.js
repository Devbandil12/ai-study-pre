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
 
      <div className="bg-gradient-to-b w-full pb-10 from-black via-gray-900 to-gray-800 h-screen">
        {/* Header */}
        <motion.header
      className="flex shadow-lg border-b-[1px] p-5 justify-between px-5 items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo Section */}
      <motion.div
        className="flex gap-2 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.img
          src="/logo.svg"
          alt="Logo"
          className="w-10 h-10"
          whileHover={{
            rotate: 10,
            scale: 1.1,
            transition: { type: "spring", stiffness: 300 },
          }}
        />
        <motion.h2
          className="text-xl text-white font-bold"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Make It Easy
        </motion.h2>
      </motion.div>

      {/* Button Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Link href={"/dashboard"}>
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)",
            }}
          >
            <Button className="hover:bg-white hover:text-gray-900 transition duration-300">
              Dashboard
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.header>

        {/* Main Content */}
        <main className="pt-20  px-10 ">
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
                    className="w-32 md:w-40 rounded-2xl -rotate-12"
                  />
                </div>
                {/* Back Side */}
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                  <img
                    src="/animecode.jpg"
                    alt="Back side"
                    className="w-32 md:w-40 rounded-2xl -rotate-12"
                  />
                </div>
              </ReactCardFlip>
            </motion.div>

            {/* Center Content */}
            <motion.div
              className="text-center md:text-left flex flex-col items-center md:items-start gap-4"
              variants={textVariant}
            >
            <div className="hidden md:block">
            <motion.div
      className="rounded-full  cursor-pointer text-xs p-1 flex items-center justify-center gap-2 bg-slate-300"
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

            </div>
  

             <div className="leading-tight text-center">
             <h2 className="font-extrabold text-3xl md:text-5xl text-white">
                AI-Powered <strong className="text-primary font-bold">Exam Prep</strong>
              </h2>
              <h2 className="font-extrabold text-3xl text-white md:text-5xl">
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
              className="flex justify-center hidden md:block md:justify-end"
              variants={cardVariant}
            >
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {/* Front Side */}
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                  <img
                    src="/cuteanime.jpg"
                    alt="Front side"
                    className="w-32 md:w-40 rounded-2xl -rotate-12"
                  />
                </div>
                {/* Back Side */}
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                  <img
                    src="/animecode.jpg"
                    alt="Back side"
                    className="w-32 md:w-40 rounded-2xl -rotate-12"
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
          <Link href={"https://youtu.be/ampOXgVJijs"}>
            <Button
              variant="outline"
              className="flex items-center mt-5 md:mt-0  gap-2  md:w-auto"
              >
              <Video className=" fill-black" /> Watch Tutorial
            </Button>
              </Link>
          </motion.div>
        </main>
      </div>
   
  );
}
