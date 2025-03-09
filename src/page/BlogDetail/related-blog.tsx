import React from "react";
import { BsArrowRight } from "react-icons/bs";
interface RelatedPostsProps {
  className?: string;
  category: string;
}
export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  className = "",
  category,
}) => {
  const relatedPosts = [
    {
      id: "1",
      title: "5 Common Mistakes First-Time Renters Make",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      excerpt:
        "Learn how to avoid these costly mistakes when renting your first apartment...",
      date: "3 days ago",
    },
    {
      id: "2",
      title: "Understanding Your Rental Agreement: A Complete Guide",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
      excerpt:
        "Everything you need to know about rental agreements and lease terms...",
      date: "1 week ago",
    },
    {
      id: "3",
      title: "How to Negotiate Rent Like a Pro",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      excerpt:
        "Expert tips on negotiating your rent and getting the best deal...",
      date: "2 weeks ago",
    },
  ];
  return (
    <section className={`${className}`}>
      <h2 className="mb-6 text-2xl font-semibold">Related Articles</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <article
            key={post.id}
            className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </span>
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  <BsArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
