import React from "react";
import { BiCalendar } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

interface BlogDetailHeaderProps {
  post: {
    title: string;
    excerpt: string;
    image: string;
    author: {
      name: string;
      avatar: string;
      role: string;
    };
    publishDate: string;
    readTime: string;
  };
}
const BlogDetailHero: React.FC<BlogDetailHeaderProps> = ({ post }) => {
  return (
    <header className="relative bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={post.image}
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90" />
      </div>
      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Meta Info */}
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <BiCalendar className="h-4 w-4" />
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <BsClock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        {/* Title & Excerpt */}
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{post.title}</h1>
        <p className="mb-8 text-xl text-gray-300">{post.excerpt}</p>
        {/* Author Info */}
        <div className="flex items-center gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-sm text-gray-300">{post.author.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default BlogDetailHero;
