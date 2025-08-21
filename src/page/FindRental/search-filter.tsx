import ReusableCategorySelector from "@/components/CategoryFilter/category-selector";
import { DualRangeSlider } from "@/components/Input/slider";
import { AppDispatch, AppState } from "@/redux";
import { getListAmenities } from "@/redux/amenities/action";
import { getListFurnitures } from "@/redux/furnitures/action";
import { getListRoomType } from "@/redux/room-type/action";
import { getDistrict } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import GenericSelector from "./generic-selector";
const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

interface SearchFiltersProps {
  onClose?: () => void;
}
export const SearchFilters: React.FC<SearchFiltersProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [price, setPrice] = useState([1, 20]);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({
    price: false,
    amenities: false,
    furnitures: false,
  });
  const [sortBy, setSortBy] = useState("new");
  const { amenitiesList } = useSelector((state: AppState) => state.amenities);
  const { furnituresList } = useSelector((state: AppState) => state.furnitures);
  const { roomTypeList } = useSelector((state: AppState) => state.roomType);
  const [districts, setDistricts] = useState([]);
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };
  useEffect(() => {
    getDistrict().then((data) => {
      const result = data?.districts?.map((district) => ({
        id: district?.codename,
        name: district?.name,
      }));
      setDistricts(result);
    });
  }, []);
  console.log("Districts:", districts);

  useEffect(() => {
    dispatch(getListAmenities());
    dispatch(getListFurnitures());
    dispatch(getListRoomType());
  }, []);
  const handleDistrictChange = (districtId: string) => {
    console.log("Selected district:", districtId);
  };
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:h-auto md:shadow-none">
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
      <div className="max-h-screen overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary dark:[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-1">
        {/* Price Range */}
        <div className="mb-6 border-b border-gray-300 px-4 py-6">
          <button
            onClick={() => toggleDropdown("price")}
            className="mb-3 flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
          >
            Giá
            <motion.div
              animate={{ rotate: openDropdowns.price ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IoIosArrowForward className={`h-5 w-5`} />
            </motion.div>
          </button>
          {openDropdowns.price && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <DualRangeSlider
                label={() => <>Triệu</>}
                // title="Giá"
                value={price}
                onValueChange={setPrice}
                min={1}
                max={20}
                step={1}
              />
            </motion.div>
            //   </motion.div>
            // </motion.div>
          )}
        </div>
        <div className="mb-6 border-b border-gray-300 px-4 py-6">
          <button
            onClick={() => toggleDropdown("sortBy")}
            className="mb-3 flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
          >
            Sắp xếp theo
            <motion.div
              animate={{ rotate: openDropdowns.sortBy ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IoIosArrowForward className={`h-5 w-5`} />
            </motion.div>
          </button>
          {openDropdowns.sortBy && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <DualRangeSlider
                label={() => <>Triệu</>}
                // title="Giá"
                value={price}
                onValueChange={setPrice}
                min={1}
                max={20}
                step={1}
              />
            </motion.div>
            //   </motion.div>
            // </motion.div>
          )}
        </div>
        <div className="mb-6 border-b border-gray-300 px-4 py-6">
          <button
            onClick={() => toggleDropdown("location")}
            className="mb-3 flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
          >
            Khu vực
            <motion.div
              animate={{ rotate: openDropdowns.location ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IoIosArrowForward className={`h-5 w-5`} />
            </motion.div>
          </button>
          {openDropdowns.location && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <GenericSelector
                // title="Thành phố"
                items={districts}
                onItemChange={handleDistrictChange}
                placeholder="Tìm kiếm thành phố..."
                noResultsMessage="Không tìm thấy thành phố nào"
                allowDeselect={true}
              />
            </motion.div>
            //   </motion.div>
            // </motion.div>
          )}
        </div>
        {/* Room Type */}
        <div className="mb-6 border-b border-gray-300 px-4 py-6">
          <button
            onClick={() => toggleDropdown("roomType")}
            className="mb-3 flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
          >
            Loại phòng
            <motion.div
              animate={{ rotate: openDropdowns.roomType ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IoIosArrowForward className={`h-5 w-5`} />
            </motion.div>
          </button>
          {openDropdowns.roomType && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <ReusableCategorySelector
                  cols={2}
                  categories={roomTypeList}
                />
              </div>
            </motion.div>
          )}
        </div>
        {/* Furnishing */}
        <div className="mb-6 border-b border-gray-300 px-4 py-6">
          <button
            onClick={() => toggleDropdown("amenities")}
            className="mb-3 flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
          >
            Tiện nghi
            <motion.div
              animate={{ rotate: openDropdowns.amenities ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IoIosArrowForward className={`h-5 w-5`} />
            </motion.div>
          </button>
          {openDropdowns.amenities && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <ReusableCategorySelector
                  cols={2}
                  categories={amenitiesList}
                />
              </div>
            </motion.div>
          )}
        </div>
        {/* Amenities */}
        <div className="mb-6 border-b border-gray-300 px-4 py-6">
          <button
            onClick={() => toggleDropdown("furnitures")}
            className="mb-3 flex w-full items-center justify-between text-left text-lg font-semibold"
          >
            Nội thất
            <motion.div
              animate={{ rotate: openDropdowns.furnitures ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IoIosArrowForward className={`h-5 w-5`} />
            </motion.div>
          </button>
          {openDropdowns.furnitures && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <ReusableCategorySelector
                  cols={2}
                  categories={furnituresList}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {/* Apply Filters Button */}
      <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
};
