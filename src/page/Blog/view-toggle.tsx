import { ViewMode } from "@/constants";
import React from "react";
import { BiGrid } from "react-icons/bi";
import { BsGrid3X3, BsGrid3X3Gap } from "react-icons/bs";
import { PiListBold } from "react-icons/pi";

interface ViewToggleProps {
  current: ViewMode;
  onChange: (mode: ViewMode) => void;
}
export const ViewToggle: React.FC<ViewToggleProps> = ({
  current,
  onChange,
}) => {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onChange("grid")}
        className={`p-2 ${current === "grid" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
        aria-label="Grid view"
      >
        <BsGrid3X3Gap className="h-5 w-5" />
      </button>
      <button
        onClick={() => onChange("list")}
        className={`p-2 ${current === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
        aria-label="List view"
      >
        <PiListBold className="h-5 w-5" />
      </button>
    </div>
  );
};
