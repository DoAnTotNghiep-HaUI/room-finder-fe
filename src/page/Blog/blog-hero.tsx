import React from "react";
import { BsClock } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
export const BlogHero = () => {
  const featuredPost = {
    title: "The Ultimate Guide to Finding Your Perfect Rental Home in 2024",
    excerpt:
      "Discover expert strategies, insider tips, and comprehensive advice to help you find and secure your ideal rental property in today's competitive market.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    author: "Sarah Johnson",
    date: "January 15, 2024",
    readTime: "10 min read",
  };
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src={featuredPost.image}
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-sm">
            <BsClock className="h-4 w-4" />
            <span>{featuredPost.readTime}</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold">{featuredPost.title}</h1>
          <p className="mb-6 text-lg text-gray-200">{featuredPost.excerpt}</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="https://placehold.co/100x100?text=SJ"
                alt={featuredPost.author}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <div className="font-medium">{featuredPost.author}</div>
                <div className="text-sm text-gray-300">{featuredPost.date}</div>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20">
              Read Article
              <FaArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
