import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const font = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Make It Easy — AI Study Prep",
  description:
    "AI-powered study workspace. Generate courses, notes, flashcards and quizzes for any topic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${font.className} min-h-screen bg-background text-foreground`}>
        <ClerkProvider>
          <Provider>{children}</Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
