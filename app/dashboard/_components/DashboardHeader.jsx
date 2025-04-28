"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader({ option }) {
  return (
    <div
      className={`shadow-lg flex justify-between p-3 pb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 border-b border-gray-600 ${
        option ? "md:justify-between " : "md:justify-end"
      }`}
    >
      {/* Logo Section */}
      <div
        className={`flex gap-2 items-center ${
          option ? "md:block " : "md:hidden"
        }`}
      >
        <img
          src="/logo.svg"
          alt=""
          className="w-10 h-10 hover:rotate-12 transition-transform hover:scale-110"
        />
        <h2 className="text-2xl font-extrabold text-white hover:text-gray-300 transition-all cursor-pointer">
          Make It Easy
        </h2>
      </div>

      {/* User Button Section */}
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "border border-gray-400 hover:border-white",
          },
        }}
      />
    </div>
  );
}

export default DashboardHeader;
