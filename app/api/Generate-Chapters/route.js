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
    
    const prompt = `I am creating developer documentation for my project.

For each topic I give you, I want the output to be structured like this in json formate only :
{
   documentation:{
   - **Title:** (Use my topic name)
- **Concept:** Write a 3–5 sentence explanation of the topic, like an official documentation page would.
- **Example:** Include a clean code snippet that shows the basic usage of the topic.}
}

Write it formally but simply, in a way that beginners and intermediate developers can understand. Use code comments if necessary to explain parts of the snippet.

Format the output in Markdown so I can paste it into my docs easily.

Here your topics: ${topics.join(",")}
`
          
          const Airesult = await GenerateCourse.sendMessage(prompt);
          const result = Airesult.response.text();

          await db.insert(Chapters_Table).values({
            chapterId: chapterId ,
            CourseID: courseid,
            notes: result,
            chapterTitle:chapterTitle
          });
          console.log(result)

        

    return NextResponse.json({res:"success"})
  } catch (error) {
    console.error("Error generating chapters:", error);
    return NextResponse.json(
      { error: "Failed to generate chapters." },
      { status: 500 }
    );
  }

}




