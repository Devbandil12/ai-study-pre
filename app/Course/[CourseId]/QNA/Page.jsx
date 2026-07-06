import { MessagesSquare } from "lucide-react";
import React from "react";

function Page() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="surface flex max-w-md flex-col items-center px-8 py-16 text-center shadow-card">
        <div className="mb-5 inline-flex rounded-2xl border border-violet-500/25 bg-violet-500/10 p-4">
          <MessagesSquare className="h-8 w-8 text-violet-400" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Q&amp;A is <span className="text-gradient">coming soon</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;re building an interactive question &amp; answer experience for
          your courses. Stay tuned!
        </p>
      </div>
    </div>
  );
}

export default Page;
