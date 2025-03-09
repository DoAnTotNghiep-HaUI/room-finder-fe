import React from "react";
import BlogDetailHero from "./blog-detail-hero";
import { SocialShare } from "./social-share";
import { BlogContent } from "./blog-content";
import { RelatedPosts } from "./related-blog";
import { CommentSection } from "@/components/Comment/comment";
import { BlogSidebar } from "../Blog/blog-sidebar";
import Input from "@/components/Input/input";
import Select from "@/components/Input/selectAi";
import { Radio, RadioGroup } from "@/components/Input/radio";

export const BlogDetail = () => {
  const blogPost = {
    title: "10 Essential Tips for First-Time Renters in 2024",
    excerpt:
      "Navigate the rental market confidently with these proven tips for first-time renters...",
    content: `
      <h2>Getting Started with Your Rental Journey</h2>
      <p>When you're looking to rent your first apartment, the process can seem overwhelming...</p>
      <h3>1. Know Your Budget</h3>
      <p>Before you start your search, it's crucial to establish a realistic budget...</p>
      <blockquote>
        "The general rule of thumb is to spend no more than 30% of your monthly income on rent."
      </blockquote>
      <h3>2. Location Research</h3>
      <p>Consider these factors when choosing your location:</p>
      <ul>
        <li>Proximity to work or school</li>
        <li>Public transportation access</li>
        <li>Local amenities and services</li>
        <li>Neighborhood safety</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    author: {
      name: "Sarah Johnson",
      avatar: "https://placehold.co/100x100?text=SJ",
      role: "Housing Specialist",
      bio: "Sarah has 10+ years of experience in real estate and rental property management.",
    },
    publishDate: "2024-01-15",
    readTime: "8 min read",
    category: "Rental Tips",
    tags: ["First-time renters", "Budgeting", "Apartment hunting"],
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Blog Header */}
      <BlogDetailHero post={blogPost} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <main className="mx-auto max-w-3xl flex-1 lg:mx-0">
            {/* Social Share Buttons - Vertical */}
            <div className="fixed left-8 top-1/2 hidden -translate-y-1/2 lg:block">
              <SocialShare vertical />
            </div>
            {/* Blog Content */}
            <article className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800 sm:p-8">
              <BlogContent content={blogPost.content} />
              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2 border-t border-gray-200 pt-8 dark:border-gray-700">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Mobile Social Share */}
              <div className="mt-8 lg:hidden">
                <SocialShare />
              </div>
              {/* Author Bio */}
              <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <img
                    src={blogPost.author.avatar}
                    alt={blogPost.author.name}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {blogPost.author.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {blogPost.author.role}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {blogPost.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </article>
            {/* Related Posts */}
            <RelatedPosts
              className="mt-8"
              category={blogPost.category}
            />
            {/* Comments Section */}
            <CommentSection
              className="mt-8"
              postId={blogPost.title}
            />
          </main>
          {/* Sidebar */}
          <aside className="flex-shrink-0 lg:w-80">
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
