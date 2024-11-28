import { GenerateCourse } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { Course_table } from "@/configs/schema";


import { NextResponse } from "next/server";



export async function POST(req) {
  const { CourseID, studyType, topic, difficulty, createBy } = await req.json();

  const prompt =
   `Generate a study material for ${topic} for ${studyType} and level of difficulty  will be <${difficulty} with sumery of course, and Coursename, List of Chapters along with summery  for each chapter also add emoji field for relevant chapters , Topic list in each chapter in  JSON format

`
  const course = await GenerateCourse.sendMessage(prompt);
  const aiRes = JSON.parse(course.response.text());
  const dbRes = await db
    .insert(Course_table)
    .values({
      CourseID: CourseID,
      studyType: studyType,
      topic: topic,
      difficulty: difficulty,
      courseLayout: aiRes,
      createBy: createBy,
    })
    .returning({ res: Course_table });

  


  return NextResponse.json({ res: dbRes[0] });
}
