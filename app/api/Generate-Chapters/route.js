import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { Course_table, Notes_Table } from "@/configs/schema";
import { GenerateCourse } from "@/configs/AiModel";
import { eq } from "drizzle-orm";



export async function POST(req) {
  const { course } = await req.json();
  const CHAPTERS = course?.courseLayout?.chapters;

  if (!CHAPTERS || CHAPTERS.length === 0) {
    return NextResponse.json({ res: [], message: "No chapters found." });
  }

  // Use Promise.all to handle async operations
  const notes = await Promise.all(
    CHAPTERS.map(async (val,index) => {
      const prompt = "generate the answer of the following topics with almost 20-25 line  each topics,dont use any word include(`,'','), attach example with each topics in html formate(wihtout boiler plate) all data in json format, topics, description and example, topics:"+val.topics.join(", ")

   

      const Airesult = await GenerateCourse.sendMessage(prompt);
      const result = await Airesult.response.text();
         await db.insert(Notes_Table).values({
        chapterId: index + 1,
        CourseID: course?.CourseID,
        notes: result,
      });
  
    }),
    
   
    
  
  )
  await db
  .update(Course_table)
  .set({
    status: "Ready",
  })
  .where(eq(Course_table.CourseID, course?.CourseID)) 
  return NextResponse.json({ res: notes });
}
