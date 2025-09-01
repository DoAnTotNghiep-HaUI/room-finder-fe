import { cn } from "@/utils/utils";
import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  options: Array<{ value: string | number; label: string }>;
  value?: string | number | Array<string | number>;
  onChange: (value: string | number | Array<string | number>) => void;
  multiple?: boolean;
  className?: string;
  width?: number;
  placeholder?: string;
}

const Select: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  width = 32,
  placeholder,
  className,
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (
    selectedValue: string | number | Array<string | number>
  ) => {
    if (multiple) {
      // Xử lý cho multiple selection
      onChange(Array.isArray(selectedValue) ? selectedValue : [selectedValue]);
    } else {
      // Xử lý cho single selection
      onChange(Array.isArray(selectedValue) ? selectedValue[0] : selectedValue);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative w-${width}`}>
      {/* Label */}
      <label className={`place mb-1 block text-sm font-semibold text-gray-700`}>
        {label}
      </label>
      {/* Select Box */}
      <div
        className={cn(
          `flex cursor-pointer items-center justify-between rounded-md px-4 py-2`,
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="pr-4">
          {options?.find((option) => option.value === value)?.label ||
            `${placeholder}`}
        </span>
        <span className={cn(isOpen ? "rotate-180 duration-300" : "rotate-0")}>
          <IoIosArrowUp />
        </span>
      </div>

      {/* Dropdown */}
      <div
        className={cn(
          "max-h-80 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary dark:[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-1",
          "absolute left-0 right-0 z-10 mt-1 rounded-md bg-white shadow-lg",
          "transform transition-all duration-300 ease-in-out",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        {options?.map((option) => (
          <div
            key={option.value}
            className="flex cursor-pointer items-center justify-between rounded px-4 py-2 hover:bg-primary hover:text-white"
            onClick={() => handleOptionClick(option.value)}
          >
            <span>{option.label}</span>
            <span>
              {value === option.value && <HiCheck className="text-primary" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
