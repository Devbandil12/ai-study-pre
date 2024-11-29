"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

function Welcome() {
  const { user } = useUser();

  return (
    <div className="pr-2 p-3">
      <div className="w-[95%] ml-5 shadow-lg rounded-lg p-5 flex items-center text-white font-bold transition-transform hover:scale-[1.02] hover:shadow-lg bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700">
        {/* Content Container */}
        <div className="rounded-lg w-full flex items-center p-5 shadow-inner">
          <img
            src="/pc.png"
            alt="laptop"
            className="w-28 transition-transform hover:scale-110"
          />
          <div className="pl-3">
            <h2 className="text-3xl font-semibold text-primary">
              Hello, {user?.fullName}
            </h2>
            <h2 className="text-base font-light mt-2 text-gray-300">
              Want to gain more skills and enhance your brainpower? Click to
              start!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
