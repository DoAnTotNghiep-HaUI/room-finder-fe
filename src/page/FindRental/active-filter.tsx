import React from "react";
import { BiX } from "react-icons/bi";

interface ActiveFiltersProps {
  className?: string;
}
export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  className = "",
}) => {
  // This would normally come from your filter state
  const activeFilters = [
    {
      id: 1,
      type: "Price",
      value: "$1000 - $2000",
    },
    {
      id: 2,
      type: "Type",
      value: "Studio Apartment",
    },
    {
      id: 3,
      type: "Amenity",
      value: "WiFi",
    },
  ];
  if (activeFilters.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {activeFilters.map((filter) => (
        <span
          key={filter.id}
          className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        >
          {filter.type}: {filter.value}
          <button className="hover:text-blue-900 dark:hover:text-blue-100">
            <BiX className="h-4 w-4" />
          </button>
        </span>
      ))}
    </div>
  );
};
