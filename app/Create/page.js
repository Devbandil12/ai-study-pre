"use client";
import React, { useState } from "react";
import ChooseOption from "./_components/ChooseOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import { Loader } from "lucide-react";
import axios from "axios";

import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import DashboardHeader from "../dashboard/_components/DashboardHeader";

function Page() {
  const [error, setError] = useState(false);
  const [state, setState] = useState(0);
  const [formaData, setFormaData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const waitingsound = () => {
    const audio = new Audio("/assets/audio/waiting.mp3");
    audio.volume = 0.3;
    return audio;
  };

  const submitToAi = async () => {
    const CourseID = uuidv4();
    setLoading(true);

    try {
      const res = await axios.post("/api/generate-course", {
        CourseID: CourseID,
        ...formaData,
        createBy: user?.primaryEmailAddress?.emailAddress,
      });

      setLoading(false);
      router.replace("/dashboard");
    } catch (error) {
      setError(true);
    }
  };

  const HandleInput = (fieldName, Value) => {
    setFormaData((pre) => ({
      ...pre,
      [fieldName]: Value,
    }));
    console.log(formaData);
  };

  return (
    <>
      <div className="shadow-lg ">
        <DashboardHeader option={true} />
      </div>
      <div className="flex h-screen flex-col items-center p-10 text-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
        {error && (
          <div className="bg-red-500 rounded-2xl p-3 ">
            Something went wrong, please try again.
          </div>
        )}
       
        <div>
          {state == 0 ? (
            <ChooseOption
              selectedStudyMaterial={(value) =>
                HandleInput("studyType", value)
              }
            />
          ) : (
            <TopicInput
              setTopic={(value) => HandleInput("topic", value)}
              setDefficulty={(value) => HandleInput("difficulty", value)}
            />
          )}
        </div>
        <div className="flex justify-between text-black p-5 px-16 w-full mt-20">
          {state != 0 ? (
            <Button onClick={() => setState((pre) => pre - 1)} variant="outline">
              Previous
            </Button>
          ) : (
            "-"
          )}
          {state != 0 ? (
            <Button disabled={loading} onClick={submitToAi}>
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                "Generate"
              )}
            </Button>
          ) : (
            <Button onClick={() => setState((pre) => pre + 1)}>Next</Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
