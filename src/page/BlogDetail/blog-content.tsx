import React from "react";
interface BlogContentProps {
  content: string;
}
export const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
};
