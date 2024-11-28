"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

function Welcome() {
  const { user } = useUser();
  return (
    <div className="pr-2">
      {" "}
      <div className="w-[95%] ml-5 shadow-lg bg-blue-500 mt-5 rounded-lg p-5 flex text-white font-bold">
        <img src="/pc.png" alt="laptop" className="w-28  " />
        <div className=" pl-3">
          <h2 className="text-2xl ">Hello, {user?.fullName}</h2>
          <h2 className="font-normal">
            Hello, Want to gain more skills and enhance the brainpower here you
            go click what do you want{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
