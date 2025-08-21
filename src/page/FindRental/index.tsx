import React, { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import { SearchFilters } from "./search-filter";

import { CategoryFilter } from "@/components/CategoryFilter/category-filter";
import { RoomCard } from "@/components/Card/room-card";
import { Pagination } from "@/components/Pagination/pagination";
import { ViewToggle } from "@/page/Blog/view-toggle";
import { ActiveFilters } from "./active-filter";
import Select from "@/components/Input/selectAi";
import { SortOptionRoom, ViewMode } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import { getListRoom } from "@/redux/room/action";

const FindRental = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { roomList } = useSelector((state: AppState) => state.room);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOptionRoom>("latest");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  console.log("roomList", roomList);
  useEffect(() => {
    dispatch(getListRoom());
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Filter Toggle */}
      <div className="sticky top-20 z-30 border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:hidden">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <BiFilter className="h-4 w-4" />
          Show Filters
        </button>
      </div>
      <div className="grid grid-cols-12 gap-[2rem] sm:px-[10rem] sm:py-[2rem]">
        {/* <div className="flex flex-col gap-8 md:flex-row"> */}
        {/* Filters Sidebar */}
        <aside
          className={`fixed left-0 top-0 z-40 hidden h-full flex-shrink-0 transform transition-transform duration-300 sm:col-span-4 sm:block md:sticky md:h-auto md:transform-none ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}
        >
          <SearchFilters onClose={() => setIsMobileFiltersOpen(false)} />
        </aside>
        {/* Main Content */}
        <main className="col-span-12 flex-1 sm:col-span-8">
          {/* Controls Bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <ViewToggle
                current={viewMode}
                onChange={setViewMode}
              />
              <Select
                options={[
                  { value: "latest", label: "Latest" },
                  { value: "lowprice", label: "Low Price" },
                  { value: "highprice", label: "High Price" },
                  { value: "mostpopular", label: "Most Popular" },
                ]}
                onChange={(value: string) => setSortBy(value as SortOptionRoom)}
                value={sortBy}
              />
            </div>
            <Select
              options={[
                { value: 5, label: "5 per page" },
                { value: 10, label: "10 per page" },
                { value: 15, label: "15 per page" },
              ]}
              onChange={(value: number) => setItemsPerPage(value)}
              value={itemsPerPage}
            />
          </div>
          {/* Active Filters */}
          <div className="mb-4">
            <ActiveFilters />
          </div>
          {/* Room Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-6"
            }
          >
            {roomList?.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                layout={viewMode === "grid" ? "vertical" : "horizontal"}
              />
            ))}
          </div>
          {/* Pagination */}
          <Pagination
            className="mt-8"
            currentPage={1}
            totalPages={10}
            onPageChange={(page) => console.log("Page changed:", page)}
          />
        </main>
        {/* </div> */}
      </div>
    </div>
  );
};
export default FindRental;
