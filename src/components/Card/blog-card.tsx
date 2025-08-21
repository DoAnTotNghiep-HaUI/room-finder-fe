import { URL_IMAGE, ViewMode } from "@/constants";
import { IBlog } from "@/types/blog";
import React from "react";
import { FaArrowRight, FaClock } from "react-icons/fa";
import avatar from "../../assets/images/Profile_avatar_placeholder_large.png";
interface BlogCardProps {
  post: IBlog;
  layout?: ViewMode;
}
const BlogCard: React.FC<BlogCardProps> = ({ post, layout = "grid" }) => {
  const isGrid = layout === "grid";
  console.log("post.image", post?.image);

  return (
    <article
      className={`group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800 ${isGrid ? "flex flex-col" : "flex gap-6"} `}
    >
      {/* Image */}
      <div
        className={`${isGrid ? "aspect-video w-full" : "w-1/3"} relative overflow-hidden`}
      >
        <img
          src={`${URL_IMAGE}/${post?.image?.id}/${post?.image?.filename_download}`}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          {/* <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
            {post?.category}
          </span> */}
        </div>
      </div>
      {/* Content */}
      <div
        className={`flex-1 p-6 ${isGrid ? "" : "flex flex-col justify-between"}`}
      >
        <div>
          {/* <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FaClock className="h-4 w-4" />
            <span>{post?.readTime}</span>
          </div> */}
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {post?.title}
          </h2>
          <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
            {post?.excerpt}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={
                post?.user_created?.avatar
                  ? `${URL_IMAGE}/${
                      post?.user_created?.avatar?.id
                    }/${post?.user_created?.avatar?.filename_download}`
                  : avatar
              }
              alt={post?.user_created?.first_name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {post?.user_created?.first_name} {post?.user_created?.last_name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {post?.user_created?.role?.name}
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            Read More
            <FaArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
export default BlogCard;
