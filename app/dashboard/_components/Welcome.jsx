"use client";
import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import React from "react";

function Welcome() {
  const { user } = useUser();

  return (
    <div className="px-5 pt-6">
      <div className="surface relative overflow-hidden p-6 md:p-8">
        {/* Ambient accent */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full glow-violet blur-2xl" />

        <div className="relative flex items-center gap-5">
          <img
            src="/pc.png"
            alt="laptop"
            className="hidden w-24 animate-float md:block"
          />
          <div>
            <span className="chip mb-3">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              Your AI workspace
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Hello, <span className="text-gradient">{user?.fullName}</span>
            </h2>
            <p className="mt-1.5 max-w-lg text-sm text-muted-foreground">
              Want to gain more skills and enhance your brainpower? Pick up
              where you left off, or create something new.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
