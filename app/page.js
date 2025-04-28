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
          className="w-8 h-8 "  // Slightly bigger logo for more impact
          whileHover={{
            rotate: 15,
            scale: 1.15,  // Slightly larger scale on hover
            transition: { type: "spring", stiffness: 400 },
          }}
        />
        <motion.h2
          className="text-1xl text-white font-bold tracking-wide"  // Increased text size for more impact
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
              boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.4)",  // More prominent hover effect
            }}
            whileTap={{ scale: 0.98 }}  // Slight shrink on click for a more interactive feel
          >
            <Button className="bg-pink-600 hover:bg-white hover:text-gray-900 text-white transition duration-300 py-2 px-6 rounded-lg font-semibold">
              Dashboard
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.header>

        {/* Main Content */}
        <main className="pt-[5rem] px-10">
  {/* Responsive Container */}
  <motion.div
    className="flex flex-col gap-10 md:flex-row md:justify-between md:items-center px-8"
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {/* Left Flip Card */}
    <motion.div
      className="flex justify-center md:justify-between"
      variants={cardVariant}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front Side */}
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <img
            src="/cuteanime.jpg"
            alt="Front side"
            className="w-32 md:w-40 rounded-2xl transform transition-all duration-500 hover:rotate-6"
          />
        </div>
        {/* Back Side */}
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <img
            src="/animecode.jpg"
            alt="Back side"
            className="w-32 md:w-40 rounded-2xl transform transition-all duration-500 hover:rotate-6"
          />
        </div>
      </ReactCardFlip>
    </motion.div>

    {/* Center Content */}
    <motion.div
      className="text-center md:text-left flex flex-col items-center md:items-start gap-4"
      variants={textVariant}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="hidden md:block"></div>

      <div className="leading-tight text-center">
        <h2 className="font-extrabold text-3xl md:text-5xl text-white">
          AI-Powered <strong className="text-primary font-bold">Exam Prep</strong>
        </h2>
        <h2 className="font-extrabold text-3xl text-white md:text-5xl">
          Material Generator
        </h2>
      </div>
      <h2 className="text-gray-400 font-bold mt-2 md:mt-4 text-sm md:text-base">
        Make Your Examination And Interview Easy: Learn with FlashCards, Give Quiz and Q&A.
      </h2>
    </motion.div>

    {/* Right Flip Card */}
    <motion.div
      className="flex justify-center hidden md:block md:justify-end"
      variants={cardVariant}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front Side */}
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <img
            src="/cuteanime.jpg"
            alt="Front side"
            className="w-32 md:w-40 rounded-2xl transform transition-all duration-500 hover:rotate-6"
          />
        </div>
        {/* Back Side */}
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <img
            src="/animecode.jpg"
            alt="Back side"
            className="w-32 md:w-40 rounded-2xl transform transition-all duration-500 hover:rotate-6"
          />
        </div>
      </ReactCardFlip>
    </motion.div>
  </motion.div>

  {/* Call to Action Buttons */}
  <motion.div
    className="flex flex-col md:flex-row gap-3 mt-10 justify-center items-center"
    variants={buttonVariant}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.7, delay: 0.3 }}
  >
    <Link href={"/dashboard"}>
      <Button className="flex gap-2 p-3 w-full md:w-auto bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
        Get Started <ArrowRight />
      </Button>
    </Link>
    <Link href={"https://youtu.be/ampOXgVJijs"}>
      <Button
        variant="outline"
        className="flex items-center mt-5 md:mt-0 gap-2 md:w-auto text-primary border-primary hover:bg-primary hover:text-white transition duration-300 ease-in-out"
      >
        <Video className="fill-primary" /> Watch Tutorial
      </Button>
    </Link>
  </motion.div>
</main>


      </div>
   
  );
}
