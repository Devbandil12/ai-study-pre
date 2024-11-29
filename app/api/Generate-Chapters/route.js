import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { Chapters_Table } from "@/configs/schema";
import { GenerateCourse } from "@/configs/AiModel";
import { eq } from "drizzle-orm";
import {v4 as uuidv4} from "uuid"

export async function POST(req) {
  try {
    const chapterId=uuidv4()
    const { topics,courseid,chapterTitle } = await req.json();
    
    const prompt = `Generate detailed notes for the following topics (HTML format, JSON response),also add example field, in content field only content dont add example in it  . Topics: ${topics.join(
            ", "
          )}`;
          
          const Airesult = await GenerateCourse.sendMessage(prompt);
          const result = Airesult.response.text();

          await db.insert(Chapters_Table).values({
            chapterId: chapterId ,
            CourseID: courseid,
            notes: result,
            chapterTitle:chapterTitle
          });

        

    return NextResponse.json({res:"success"})
  } catch (error) {
    console.error("Error generating chapters:", error);
    return NextResponse.json(
      { error: "Failed to generate chapters." },
      { status: 500 }
    );
  }

}




