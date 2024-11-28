import { db } from "@/configs/db";
import { Course_table} from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){

        const {createBy}=await req.json();
        const result=await db.select().from(Course_table).where(eq(Course_table.createBy,createBy));
        
    return NextResponse.json({res:result})
}

export async function GET(req) {

    const reqURL=req.url;
    const {searchParams}=new URL(reqURL)
    const courseId=searchParams?.get("CourseId")
    
    const res=await db.select().from(Course_table).where(eq(Course_table?.CourseID,courseId))

    return NextResponse.json({result:res[0]})
}