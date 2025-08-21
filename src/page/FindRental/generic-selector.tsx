"use client";

import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export interface SelectableItem {
  id: string;
  name: string;
}

interface GenericSelectorProps {
  title?: string;
  items: SelectableItem[];
  selectedItem?: string;
  onItemChange?: (itemId: string) => void;
  placeholder?: string;
  noResultsMessage?: string;
  maxHeight?: string;
  allowDeselect?: boolean;
}

export default function GenericSelector({
  title,
  items,
  selectedItem,
  onItemChange,
  placeholder = "Tìm kiếm",
  noResultsMessage = "Không tìm thấy kết quả nào",
  maxHeight = "max-h-80",
  allowDeselect = false,
}: GenericSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelect = (itemId: string) => {
    if (allowDeselect && selectedItem === itemId) {
      onItemChange?.("");
    } else {
      onItemChange?.(itemId);
    }
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg bg-white">
      {title && (
        <div className="px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}

      {/* Search Input */}
      <div className="relative p-4">
        <div className="relative">
          <BsSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
          />
        </div>
      </div>

      {/* Items List */}
      <div
        className={`${maxHeight} overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary dark:[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-1`}
      >
        {filteredItems.length > 0 ? (
          <div className="p-2">
            {filteredItems.map((item) => (
              <label
                key={item.id}
                className="group flex cursor-pointer items-center rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50"
              >
                <div className="relative">
                  <input
                    type="radio"
                    name="selector-item"
                    value={item.id}
                    checked={selectedItem === item.id}
                    onChange={() => handleItemSelect(item.id)}
                    className="sr-only"
                  />
                  <div
                    className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                      selectedItem === item.id
                        ? "border-[#1E88E5] bg-[#1E88E5]"
                        : "border-gray-300 group-hover:border-[#1E88E5]"
                    }`}
                  >
                    {selectedItem === item.id && (
                      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <span
                  className={`ml-3 text-sm transition-colors duration-200 ${
                    selectedItem === item.id
                      ? "font-medium text-[#1E88E5]"
                      : "text-gray-700 group-hover:text-[#1E88E5]"
                  }`}
                >
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-sm text-gray-500">
            {noResultsMessage}
          </div>
        )}
      </div>

      {/* Accent Line */}
      {/* <div className="h-1 bg-gradient-to-r from-[#1E88E5] to-[#42A5F5]" /> */}
    </div>
  );
}
