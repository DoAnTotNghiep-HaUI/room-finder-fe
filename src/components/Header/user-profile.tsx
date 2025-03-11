import React, { useEffect, useState, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
export const UserProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="relative flex items-center space-x-3 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
          className="h-11 w-11 rounded-full border-2 border-gray-200 dark:border-gray-700"
          src="https://placehold.co/100x100?text=User"
          alt="User profile"
        />
        <span className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-[#e2e5e9] dark:bg-[#3b3d3e] dark:text-[#e2e5e9]">
          <BiChevronDown className="h-4 w-4" />
        </span>
      </button>
      {/* Dropdown Menu */}
      <div
        className={`${isDropdownOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} absolute right-0 mt-2 w-48 origin-top-right transform rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out dark:bg-gray-800`}
      >
        {["Account", "Settings", "Logout"].map((item) => (
          <a
            key={item}
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};
