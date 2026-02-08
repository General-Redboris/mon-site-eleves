"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface LessonViewProps {
  content: string;
  titre: string;
}

export default function LessonView({ content, titre }: LessonViewProps) {
  return (
    <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
        {titre}
      </h1>
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
