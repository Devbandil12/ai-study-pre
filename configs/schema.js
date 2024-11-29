

import { boolean, pgTable, serial, varchar ,json, integer, text} from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  ismember: boolean().default(false),
});

export const Course_table=pgTable("course",{
  id:serial().primaryKey(),
  CourseID:varchar().notNull(),
  studyType:varchar().notNull(),
  topic:varchar().notNull(),
  difficulty:varchar().default("Easy"),
  courseLayout:json(),
  createBy:varchar().notNull(),
  status:varchar().default("Generating")
});

export const Notes_Table=pgTable("Notestable",{
  id:serial().primaryKey(),
  CourseID:varchar().notNull(),
  chapterId:varchar().notNull(),
  notes:json(),
  
})
export const Flash_Card_Content=pgTable("flashCardtable",{
  id:serial().primaryKey(),
  CourseID:varchar().notNull(),
  content:json(),
  type:varchar().notNull(),
  status:varchar().default("Generating")
})

export const Chapters_Table=pgTable("chaptertable",{
  id:serial().primaryKey(),
  CourseID:varchar().notNull(),
  chapterId:varchar().notNull(),
  notes:json(),
   chapterTitle:varchar().notNull()
})