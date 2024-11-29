import { db } from "@/configs/db"
import { Chapters_Table } from "@/configs/schema"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
    const {courseid,chaptertitle,all}=await req.json()

   const res= await db.select().from(Chapters_Table).where(and((eq(Chapters_Table?.CourseID,courseid)),eq(Chapters_Table?.chapterTitle,chaptertitle)))

    return NextResponse.json({data:res})
    
}

export async function GET(req) {

    const reqURL=req.url;
    const {searchParams}=new URL(reqURL)
    const courseId=searchParams?.get("CourseId")
    const res= await db.select({ chapterTitle: Chapters_Table.chapterTitle }).from(Chapters_Table).where((eq(Chapters_Table?.CourseID,courseId)));
    return NextResponse.json({res:res})
  
}