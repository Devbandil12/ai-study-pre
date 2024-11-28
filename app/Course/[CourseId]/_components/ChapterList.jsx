import React from "react";

function ChapterList({ course }) {
  const CHAPTERS = course?.courseLayout?.chapters;
  return (
    <div className="mt-3">
      <div>
        {CHAPTERS?.map((chapter, ind) => {
          return (
            <div
              key={ind}
              className="p-3 cursor-pointer flex gap-5 justify-bewteen items-center shadow-md border rounded-2xl"
            >
              <h2 className="text-xl">{chapter.emoji}</h2>
              <div>
                {" "}
                <h2 className="font-bold text-sm line-clamp-2">
                  {chapter?.chapterTitle}
                </h2>
                <h2 className="text-gray-500 font-medium text-sm line-clamp-2">
                  {chapter?.summary}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChapterList;
