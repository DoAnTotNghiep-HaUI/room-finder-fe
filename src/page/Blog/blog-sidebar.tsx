import React from "react";
import { HiMail } from "react-icons/hi";
export const BlogSidebar = () => {
  const popularPosts = [
    {
      id: "1",
      title: "How to Negotiate Your Rent Like a Pro",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      date: "2 days ago",
    },
    // Add more popular posts...
  ];
  const tags = [
    "Rental Tips",
    "Apartment Living",
    "Moving Guide",
    "Budget Friendly",
    "Interior Design",
    "Tenant Rights",
  ];
  return (
    <div className="space-y-8">
      {/* Popular Posts */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <a
              key={post.id}
              href="#"
              className="group flex gap-4"
            >
              <img
                src={post.image}
                alt=""
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
      {/* Tags */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>
      {/* Newsletter Subscription */}
      <section className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
        <h3 className="mb-2 text-lg font-semibold">
          Subscribe to Our Newsletter
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Get the latest rental tips and updates delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-700"
          />
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            <HiMail className="h-4 w-4" />
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};
