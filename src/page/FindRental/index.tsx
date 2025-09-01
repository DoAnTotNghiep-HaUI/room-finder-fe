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
import RoomCardSummary from "@/components/Card/room-card-summary";
import Button from "@/components/Button/button";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { sortData } from "@/utils/data";
import { setCurrentPage, setSearchParam } from "@/redux/room/store";
import ModalRoomMap from "@/components/modal-map/modal-map";

const FindRental = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { roomList, searchParam, pagination } = useSelector(
    (state: AppState) => state.room
  );
  const { search } = useLocation();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("-date_created");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const handleSortChange = (newSortBy) => {
    dispatch(setSearchParam({ sortBy: newSortBy }));
    setSortBy(newSortBy);
  };
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  console.log("roomList", roomList);
  console.log("ismobile", isMobile);

  useEffect(() => {
    dispatch(
      getListRoom({ ...searchParam, sortBy, page: 1, limit: itemsPerPage })
    );
  }, [sortBy, searchParam]);
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(
      getListRoom({
        ...searchParam,
        sortBy,
        page,
        limit: pagination.itemsPerPage,
      })
    );
  };

  // const handleItemsPerPageChange = (value: number) => {
  //   dispatch(setItemsPerPage(value));
  //   dispatch(getListRoom({ ...searchParam, sortBy, page: 1, limit: value }));
  // };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Filter Toggle */}
      <div className="sticky top-20 z-30 border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:hidden">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <BiFilter className="h-4 w-4" />
          Hiển thị bộ lọc
        </button>
      </div>
      <div className="grid grid-cols-12 gap-[2rem] sm:px-4 md:py-[2rem] lg:px-[10rem]">
        {/* <div className="flex flex-col gap-8 md:flex-row"> */}
        {/* Filters Sidebar */}
        <aside
          className={`fixed left-0 top-0 z-40 hidden h-full flex-shrink-0 transform transition-transform duration-300 sm:col-span-4 sm:block md:sticky md:h-auto md:transform-none ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}
        >
          <SearchFilters
            onClose={() => setIsMobileFiltersOpen(false)}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </aside>
        {/* Main Content */}
        <main className="col-span-12 w-full md:col-span-8 md:flex-1">
          {/* Controls Bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Select
                options={sortData}
                placeholder="Sắp xếp theo"
                fullWidth
                value={sortBy}
                onChange={handleSortChange}
              />
            </div>
            <div>
              <ModalRoomMap roomList={roomList} />
            </div>
            {/* <Select
              options={[
                { value: 5, label: "5 per page" },
                { value: 10, label: "10 per page" },
                { value: 15, label: "15 per page" },
              ]}
              onChange={(value: number) => setItemsPerPage(value)}
              value={itemsPerPage}
            /> */}
          </div>
          {/* Active Filters */}
          {/* <div className="mb-4">
            <ActiveFilters />
          </div> */}
          {/* Room Grid/List */}
          <div className={"space-y-6"}>
            {roomList?.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                layout={"horizontal"}
              />
            ))}
          </div>
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              className="mt-8"
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
        {/* </div> */}
      </div>
    </div>
  );
};
export default FindRental;
