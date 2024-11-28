import { db } from "@/configs/db";
import { Flash_Card_Content, Notes_Table } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, StudyType } = await req.json();
  let result=null
  if (StudyType == "ALL") 
    {
    const res = await db
      .select()
      .from(Notes_Table)
      .where(eq(Notes_Table?.CourseID, courseId));

      
      const quiz=await db.select().from(Flash_Card_Content).where(and(eq(Flash_Card_Content?.CourseID,courseId),eq(Flash_Card_Content?.type,"Quiz")))
      const flashy=await db.select().from(Flash_Card_Content).where(and(eq(Flash_Card_Content?.CourseID,courseId),eq(Flash_Card_Content?.type,"FlashCard")))

     result = {
      Notes: res,
      FlashCard: flashy,
      Quiz:quiz ,
      QNA: null,
    };
        
  return NextResponse.json(result);
  }
  if(StudyType=="Notes"){
    const notes = await db
    .select()
    .from(Notes_Table)
    .where(eq(Notes_Table?.CourseID, courseId));

     return NextResponse.json(notes)
  }
  if(StudyType=="FlashCard"){
    const flash=await db.select().from(Flash_Card_Content).where(eq(Flash_Card_Content?.CourseID,courseId))
    return NextResponse.json({res:flash})
  }
 
}
