import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TopicInput({ setTopic, setDefficulty }) {
  return (
    <div className="w-full text-left">
      <h2 className="text-base font-semibold text-white">
        What do you want to learn?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Write or paste your topic or details — the more context, the better the
        material.
      </p>
      <Textarea
        placeholder="e.g. React hooks, System design interviews, Class 12 Physics…"
        className="mt-4 min-h-32 rounded-xl border-white/10 bg-white/[0.03] p-4 text-base text-white placeholder:text-zinc-500 focus-visible:ring-violet-500/50"
        onChange={(event) => setTopic(event.target.value)}
      />

      <h2 className="mt-7 text-base font-semibold text-white">
        Difficulty level
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        How deep should the generated content go?
      </p>
      <Select onValueChange={(value) => setDefficulty(value)}>
        <SelectTrigger className="mt-3 w-full rounded-xl border-white/10 bg-white/[0.03] font-medium text-white focus:ring-violet-500/50">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent className="border-white/10 bg-[#101016] text-zinc-200">
          <SelectItem value="EASY">Easy — quick overview</SelectItem>
          <SelectItem value="MEDIUM">Medium — solid coverage</SelectItem>
          <SelectItem value="HARD">Hard — deep dive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;
