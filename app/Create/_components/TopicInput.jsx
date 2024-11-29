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
    <div className="w-full ">
      <h2 className="font-semibold mt-3">
        Write or Paste your topic or details to Create the Study Material and
        Also Select the difficulty Level{" "}
      </h2>
      <Textarea
        placeholder="Write Here"
        className="bg-transparent text-white p-3  mt-2 text-2xl "
        onChange={(event) => setTopic(event.target.value)}
      />
      <h2 className="mt-3 text-start font-semibold">
        select the Detailing Level
      </h2>
      <Select
        className="w-full text-black"
        onValueChange={(value) => setDefficulty(value)}
      >
        <SelectTrigger className="w-full mt-2 bg-slate-400 text-black font-bold">
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
