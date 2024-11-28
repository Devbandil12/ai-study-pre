import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { Course_table, Notes_Table } from "@/configs/schema";
import { GenerateCourse } from "@/configs/AiModel";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { course } = await req.json();
    if (!course || !course.courseLayout?.chapters || !course.CourseID) {
      return NextResponse.json(
        { error: "Invalid course data." },
        { status: 400 }
      );
    }

    const CHAPTERS = course.courseLayout.chapters;

    const notes = await Promise.all(
      CHAPTERS.map(async (chapter, index) => {
        try {
          const prompt = `Generate detailed notes for the following topics (HTML format, JSON response). Topics: ${chapter.topics.join(
            ", "
          )}`;
          
          const Airesult = await GenerateCourse.sendMessage(prompt);
          const result = await Airesult.response.text();

          await db.insert(Notes_Table).values({
            chapterId: index + 1,
            CourseID: course.CourseID,
            notes: result,
          });

          return result;
        } catch (error) {
          console.error(`Error processing chapter ${index + 1}:`, error);
          return null; // Return null if processing fails
        }
      })
    );

    // Update course status
    await db
      .update(Course_table)
      .set({ status: "Ready" })
      .where(eq(Course_table.CourseID, course.CourseID));

    return NextResponse.json({
      res: notes.filter((note) => note !== null), // Filter out failed notes
    });
  } catch (error) {
    console.error("Error generating chapters:", error);
    return NextResponse.json(
      { error: "Failed to generate chapters." },
      { status: 500 }
    );
  }
}
