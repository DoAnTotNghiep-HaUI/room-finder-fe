import React from "react";
import { BiSearch } from "react-icons/bi";
export const BlogSearch = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
      />
      <BiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    </div>
  );
};
