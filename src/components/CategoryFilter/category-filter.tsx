import React from "react";
export const CategoryFilter = () => {
  const categories = [
    "All",
    "Rental Tips",
    "Budgeting",
    "City Guides",
    "Tenant Rights",
    "Moving Hacks",
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${category === "All" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
