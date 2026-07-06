"use client";

import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen px-5 pb-16">
      <div className="pt-8">
        <p className="eyebrow mb-2">Account</p>
        <h2 className="text-lg font-bold tracking-tight text-white">
          Your Profile
        </h2>
        <p className="text-xs text-muted-foreground">
          Manage your account details and security settings
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <UserProfile
          routing="hash"
          appearance={{
            variables: {
              colorBackground: "#0B0B10",
              colorText: "#ffffff",
              colorTextSecondary: "#a1a1aa",
              colorPrimary: "#8b5cf6",
              colorInputBackground: "rgba(255,255,255,0.03)",
              colorInputText: "#ffffff",
              colorNeutral: "#ffffff",
              borderRadius: "0.75rem",
            },
            elements: {
              rootBox: "w-full max-w-4xl",
              cardBox:
                "w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] shadow-none",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Page;
