import React, { useState } from "react";
import { BiReply } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa";
import { MdBorderVertical } from "react-icons/md";
interface CommentSectionProps {
  className?: string;
  postId: string;
}
export const CommentSection: React.FC<CommentSectionProps> = ({
  className = "",
}) => {
  const [sortBy, setSortBy] = useState<"newest" | "liked">("newest");
  const [commentText, setCommentText] = useState("");
  const comments = [
    {
      id: 1,
      author: {
        name: "John Doe",
        avatar: "https://placehold.co/100x100?text=JD",
      },
      content:
        "This article was really helpful! I especially liked the tips about budgeting.",
      date: "2 hours ago",
      likes: 5,
      replies: [
        {
          id: 2,
          author: {
            name: "Jane Smith",
            avatar: "https://placehold.co/100x100?text=JS",
          },
          content:
            "Agreed! The budget calculator mentioned was a game-changer.",
          date: "1 hour ago",
          likes: 2,
        },
      ],
    },
  ];
  return (
    <section
      className={`rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800 ${className}`}
    >
      <h2 className="mb-6 text-2xl font-semibold">Comments</h2>
      {/* Comment Form */}
      <div className="mb-8">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700"
          rows={3}
        />
        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            Post Comment
          </button>
        </div>
      </div>
      {/* Sort Options */}
      <div className="mb-6 flex items-center gap-4 border-b pb-6 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Sort by:
        </span>
        <button
          onClick={() => setSortBy("newest")}
          className={`text-sm ${sortBy === "newest" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          Newest
        </button>
        <button
          onClick={() => setSortBy("liked")}
          className={`text-sm ${sortBy === "liked" ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          Most Liked
        </button>
      </div>
      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="space-y-6"
          >
            {/* Main Comment */}
            <div className="flex gap-4">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{comment.author.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {comment.date}
                    </p>
                  </div>
                  <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MdBorderVertical className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {comment.content}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                    <FaThumbsUp className="h-4 w-4" />
                    {comment.likes}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                    <BiReply className="h-4 w-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
            {/* Replies */}
            <div className="ml-12 space-y-6">
              {comment.replies?.map((reply) => (
                <div
                  key={reply.id}
                  className="flex gap-4"
                >
                  <img
                    src={reply.author.avatar}
                    alt={reply.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{reply.author.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {reply.date}
                        </p>
                      </div>
                      <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MdBorderVertical className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {reply.content}
                    </p>
                    <div className="mt-2 flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                        <FaThumbsUp className="h-4 w-4" />
                        {reply.likes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
