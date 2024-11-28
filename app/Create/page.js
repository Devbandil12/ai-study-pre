"use client";
import React, { useState } from "react";
import ChooseOption from "./_components/ChooseOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import { Loader } from "lucide-react";
import axios from "axios";

import { useUser } from "@clerk/nextjs";
import {v4 as uuidv4} from "uuid"
import { useRouter } from "next/navigation";
import DashboardHeader from "../dashboard/_components/DashboardHeader";

function page() {
  const [error, setError] = useState(false)
  const [state, setState] = useState(0);
  const [formaData, setFormaData] = useState([])
  const [loading, setLoading] = useState(false)
 
const router =useRouter()
  const {user}= useUser()

  const waitingsound = () => {
    const audio = new Audio("/assets/audio/waiting.mp3");
    audio.volume = 0.3;
    return audio;
  };
const submitToAi=async()=>{
  const CourseID=uuidv4()
  setLoading(true)

 try {
  const res=await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/generate-course",{

    CourseID:CourseID,
    ...formaData,
    createBy:user?.primaryEmailAddress?.emailAddress
  
  });

setLoading(false)
router.replace("/dashboard")
 } catch (error) {
   
  setError(true)
  
 }
}

  const HandleInput = (fieldName, Value) => {
    setFormaData(pre=>({
      ...pre,
      [fieldName]:Value
    }))
    console.log(formaData);

   
    
  };
  return (
    <>
    <DashboardHeader option={true}/>
    <div className="flex flex-col  items-center  mt-20">
    {
      error&&  <div className="bg-red-500 rounded-2xl p-3 ">

      something went wrong please try again
            </div>
    }
      <h2 className="text-3xl text-primary font-semibold mb-3">
        Start Building your Personal Study Material👀
      </h2>
      <h2 className="text-lg">
        Fill the Details in order to Generate Stdy material👀
      </h2>
      <div>
        {state == 0 ? (
          <ChooseOption
            selectedStudyMaterial={(value) => HandleInput("studyType", value)}
          />
        ) : (
          <TopicInput setTopic={(value)=>HandleInput("topic",value) } setDefficulty={(value)=>HandleInput("difficulty",value)} />
        )}
      </div>
      <div className=" flex justify-between p-5 px-16 w-full mt-20 ">
        {state != 0 ? (
          <Button onClick={() => setState((pre) => pre - 1)} variant="outline">
            Previous
          </Button>
        ) : (
          "-"
        )}
        {state != 0 ? (
          <Button disabled={loading} onClick={submitToAi}>{
            
            loading?<Loader className="animate-spin"/>:"genarate"}</Button>
            
            
          ) : (
            <Button onClick={() => setState((pre) => pre + 1)}>Next</Button>
          )}
      </div>
    </div>
          </>
  );
}

export default page;
