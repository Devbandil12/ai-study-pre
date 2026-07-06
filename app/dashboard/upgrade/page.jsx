"use client";

import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for trying out AI-generated study material",
    features: [
      "5 course credits",
      "AI-generated chapter notes",
      "Flashcards & quizzes",
      "Community support",
    ],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "per month",
    description: "For serious learners who want unlimited generation",
    features: [
      "Unlimited course credits",
      "AI-generated chapter notes",
      "Flashcards & quizzes",
      "Question & answer practice",
      "Priority generation speed",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
];

function Page() {
  return (
    <div className="min-h-screen px-5 pb-16">
      <div className="pt-8 text-center">
        <p className="eyebrow mb-2">Plans</p>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Upgrade your learning
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Unlock unlimited AI-generated courses, notes, flashcards and quizzes
          with the Pro plan.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`surface relative flex flex-col p-6 ${
              plan.highlighted
                ? "border-violet-500/40 bg-violet-500/[0.06]"
                : ""
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border border-violet-500/30 bg-[#0B0B10] px-3 py-1 text-[11px] font-semibold text-violet-300">
                <Sparkles className="h-3 w-3" /> Most Popular
              </span>
            )}

            <div className="mb-4 flex items-center gap-2">
              <span
                className={`inline-flex rounded-lg border p-1.5 ${
                  plan.highlighted
                    ? "border-violet-500/20 bg-violet-500/10"
                    : "border-white/10 bg-white/[0.05]"
                }`}
              >
                <Zap
                  className={`h-3.5 w-3.5 ${
                    plan.highlighted ? "text-violet-400" : "text-zinc-400"
                  }`}
                />
              </span>
              <h3 className="text-sm font-semibold text-white">{plan.name}</h3>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-white">
                {plan.price}
              </span>
              <span className="text-xs text-muted-foreground">
                {plan.period}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {plan.description}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2.5 text-sm text-zinc-300"
                >
                  <Check className="h-4 w-4 shrink-0 text-violet-400" />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.highlighted ? (
              <Button className="btn-gradient mt-6 w-full rounded-xl font-semibold">
                {plan.cta}
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled
                className="mt-6 w-full rounded-xl border-white/10 bg-white/[0.03] text-zinc-400"
              >
                {plan.cta}
              </Button>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Payments are not wired up yet — this page is the plan overview.{" "}
        <Link
          href="/dashboard"
          className="font-semibold text-violet-400 transition-colors hover:text-violet-300"
        >
          Back to dashboard
        </Link>
      </p>
    </div>
  );
}

export default Page;
