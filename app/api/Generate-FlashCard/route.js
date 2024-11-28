import { GenerateQuiz, GeneratFlashCardAiModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { Flash_Card_Content } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { type, course } = await req.json();
  const CHAPTERS = course?.courseLayout?.chapters;
  let chaptertitle = [];
  CHAPTERS.map((val, index) => {
    chaptertitle.push(val.chapterTitle);
  });
  const chapterlist = chaptertitle.join(" | ");
  const prompt = type=="FlashCard"?
    `generate the flash cards for the given topics in json format with front and back. minimum 15, dont include symbol like(','' backtick ) ${chapterlist}` :`generate the quiz from the given chapters along with answer, all data in json format, maximum 15 and minimum 10, chapters:${chapterlist}`
    
  const res = type=="FlashCard"? await GeneratFlashCardAiModel.sendMessage(prompt):await GenerateQuiz.sendMessage(prompt);
  const aires =res.response.text();
  await db.insert(Flash_Card_Content).values({
    CourseID: course.CourseID,
    type: type,
    content: aires,
  });
  await db.update(Flash_Card_Content).set({
    status: "Ready",
  });
  return NextResponse.json({ res: "success" });
}

export async function GET(req) {

    const reqURL=req.url;
    const {searchParams}=new URL(reqURL)
    const courseId=searchParams?.get("CourseId")
    const contentType=searchParams?.get("contentType")
    const flash=await db.select().from(Flash_Card_Content).where(and(
      eq(Flash_Card_Content?.CourseID,courseId),
      eq(Flash_Card_Content?.type,contentType)
    ))
   
    return NextResponse.json({res:flash})
}