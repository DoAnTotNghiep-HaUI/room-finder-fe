import { DualRangeSlider } from "@/components/Input/slider";
import React, { useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";

interface SearchFiltersProps {
  onClose?: () => void;
}
export const SearchFilters: React.FC<SearchFiltersProps> = ({ onClose }) => {
  const [price, setPrice] = useState([1, 20]);
  return (
    <div className="h-full overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:h-auto md:shadow-none">
      {/* Mobile Close Button */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <BiX className="h-5 w-5" />
        </button>
      </div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <BiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search rooms..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      {/* Price Range */}
      <div className="mb-6">
        {/* <h3 className="mb-4 text-sm font-semibold">Price Range</h3> */}
        <DualRangeSlider
          label={() => <>Triệu</>}
          title="Giá"
          value={price}
          onValueChange={setPrice}
          min={1}
          max={20}
          step={1}
        />
      </div>
      {/* Room Type */}
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-semibold">Room Type</h3>
        <div className="space-y-2">
          {[
            "Studio Apartment",
            "Private Room",
            "Shared Room",
            "Entire House",
          ].map((type) => (
            <label
              key={type}
              className="flex items-center"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="ml-2 text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="max-h-400 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary dark:[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-1">
        {/* Furnishing */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold">Furnishing</h3>
          <div className="space-y-2">
            {["Fully Furnished", "Semi-Furnished", "Unfurnished"].map(
              (type) => (
                <label
                  key={type}
                  className="flex items-center"
                >
                  <input
                    type="radio"
                    name="furnishing"
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-sm">{type}</span>
                </label>
              )
            )}
          </div>
        </div>
        {/* Amenities */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              "WiFi",
              "Parking",
              "Air Conditioning",
              "Balcony",
              "Pet Friendly",
              "Gym",
              "Swimming Pool",
              "Security",
            ].map((amenity) => (
              <label
                key={amenity}
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Apply Filters Button */}
      <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
};
