import React, { useState } from "react";
import { BlogHero } from "./blog-hero";
import { BlogSearch } from "./blog-search";
import { CategoryFilter } from "@/components/CategoryFilter/category-filter";
import { BlogSidebar } from "./blog-sidebar";
import { SortOptionBlog, ViewMode } from "@/constants";
import BlogCard from "@/components/Card/blog-card";
import { Pagination } from "@/components/Pagination/pagination";
import { ViewToggle } from "@/page/Blog/view-toggle";

export const Blog = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOptionBlog>("newest");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  // Sample blog posts data
  const blogPosts = [
    {
      id: "1",
      title: "10 Essential Tips for First-Time Renters",
      excerpt:
        "Navigate the rental market confidently with these proven tips for first-time renters...",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      author: {
        name: "Sarah Johnson",
        avatar: "https://placehold.co/100x100?text=SJ",
        role: "Housing Specialist",
      },
      category: "Rental Tips",
      date: "2024-01-15",
      readTime: "5 min read",
      tags: ["First-time renters", "Tips", "Housing"],
    },
    // Add more sample posts...
  ];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <BlogHero />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="mb-8 space-y-6">
          <BlogSearch />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilter />
            <div className="flex items-center gap-4">
              <ViewToggle
                current={viewMode}
                onChange={setViewMode}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOptionBlog)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rated">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Blog Posts Grid/List */}
          <main className="flex-1">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2"
                  : "space-y-6"
              }
            >
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  layout={viewMode}
                />
              ))}
            </div>
            {/* Pagination */}
            <Pagination
              className="mt-8"
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
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
