"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StudyMaterialSelection from "../_components/StudyMaterialSelection";

function ViewNotes() {
  const [notes, setNotes] = useState();
  const { CourseId } = useParams();
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    getnotes();
  }, []);

  const getnotes = async () => {
    const result = await axios.post("/api/Study-Material", {
      courseId: CourseId,
      StudyType: "Notes",
    });

    // const data = await JSON.parse(result?.data);

    setNotes(result.data);
  };

  // const { content } = notes;
  return <>h</>;
}

export default ViewNotes;
