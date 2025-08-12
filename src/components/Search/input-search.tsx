import { cn } from "@/utils/utils";
import React from "react";
interface SearchProps {
  label?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  width?: number;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}
const InputSearch: React.FC<SearchProps> = ({
  label,
  value,
  onChange,
  width,
  placeholder,
  icon,
  className,
}) => {
  return (
    <div>
      {/* Label */}
      <label className="place mb-1 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        {/* Input Field */}
        <input
          placeholder={placeholder}
          className={cn(
            "w-full rounded-md px-3 py-2 pr-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary",
            className
          )}
        />
        {/* Icon */}
        <span className="absolute inset-y-0 right-3 flex items-center">
          {icon}
        </span>
      </div>
    </div>
  );
};

export default InputSearch;
