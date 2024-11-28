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
    <div className="w-full mt-10">
      <h2 className="font-semibold">
        Write or Paste your topic or details to Create the Study Material and
        Also Select the difficulty Level{" "}
      </h2>
      <Textarea
        placeholder="Write Here"
        className="bg-slate-100 p-3 mt-2 text-2xl font-bold"
        onChange={(event) => setTopic(event.target.value)}
      />
      <h2>select the Detailing Level</h2>
      <Select
        className="w-full"
        onValueChange={(value) => setDefficulty(value)}
      >
        <SelectTrigger className="w-full mt-2 bg-slate-100 font-bold">
          <SelectValue placeholder="Defficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="EASY">EASY</SelectItem>
          <SelectItem value="MEDIUM">MEDIUM</SelectItem>
          <SelectItem value="HARD">HARD</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;
