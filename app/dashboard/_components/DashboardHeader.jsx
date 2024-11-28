"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader({ option }) {
  return (
    <div
      className={`shadow-lg flex justify-between p-3 ${
        option ? "md:justify-between " : "md:justify-end"
      }`}
    >
      <div
        className={`flex gap-2 items-center  ${
          option ? "md:block md:flex" : "md:hidden"
        }`}
      >
        <img
          src="/logo.svg"
          alt=""
          className=" hover:rotate-12 transition-all hover:scale-105"
        />
        <h2 className="text-xl font-bold hover:scale-105 transition-all cursor-pointer ">
          Make It Easy
        </h2>
      </div>

      <UserButton />
    </div>
  );
}

export default DashboardHeader;
