import ReusableCategorySelector from "@/components/CategoryFilter/category-selector";
import { DualRangeSlider } from "@/components/Input/slider";
import { AppDispatch, AppState } from "@/redux";
import { getListAmenities } from "@/redux/amenities/action";
import { getListFurnitures } from "@/redux/furnitures/action";
import { getListRoomType } from "@/redux/room-type/action";
import { getDistrict } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import GenericSelector from "./generic-selector";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchParam } from "@/redux/room/store";
import { getListRoom } from "@/redux/room/action";
import { set } from "date-fns";
import Radio from "@/components/Input/radio";
import { contractDurationOptions, limitPeople } from "@/utils/data";
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
  onSortChange?: (sortBy: string) => void;
  sortBy?: string;
}
export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onClose,
  sortBy,
  onSortChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { searchParam } = useSelector((state: AppState) => state.room);
  // const [price, setPrice] = useState([1, 20]);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({
    price: false,
    amenities: false,
    furnitures: false,
  });
  console.log("searchParam", searchParam);
  // const [selectedDistrict, setSelectedDistrict] = useState("");
  const { amenitiesList } = useSelector((state: AppState) => state.amenities);
  const { furnituresList } = useSelector((state: AppState) => state.furnitures);
  const { roomTypeList } = useSelector((state: AppState) => state.roomType);
  const [districts, setDistricts] = useState([]);
  // const [keyword, setKeyword] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);
  const { reset, register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      price: searchParam?.price || [1, 20],
      area: searchParam?.area || [1, 100],
      amenities: searchParam?.amenities || [],
      furnitures: searchParam?.furnitures || [],
      district: searchParam?.district || "",
      roomType: searchParam?.roomType || "",
      limitPeople: searchParam?.limitPeople || 1,
      contractsDuration: searchParam?.contractsDuration || "6_months",
      sortBy: sortBy || "latest",
      title: "",
    },
  });

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
  const selectedPriceRange = watch("price");
  const selectedAreaRange = watch("area");
  const selectedAmenities = watch("amenities");
  const selectedFurnitures = watch("furnitures");
  const selectedRoomType = watch("roomType");
  const selectedDistrict = watch("district");
  const selectedLimitPeople = watch("limitPeople");
  const selectedContractDuration = watch("contractsDuration");
  const title = watch("title");
  console.log("districtId", selectedDistrict);
  useEffect(() => {
    if (sortBy) {
      setValue("sortBy", sortBy);
    }
  }, [sortBy, setValue]);
  useEffect(() => {
    if (searchParam) {
      reset({
        price: searchParam?.price || [1, 20],
        area: searchParam?.area || [10, 100],
        amenities: searchParam?.amenities || [],
        furnitures: searchParam?.furnitures || [],
        district: searchParam?.district || "",
        roomType: searchParam?.roomType || "",
        contractsDuration: searchParam?.contractsDuration || "6_months",
        limitPeople: searchParam?.limitPeople || 1,
        sortBy: sortBy || "latest",
        title: "",
      });
    }
  }, [searchParam, reset]);
  useEffect(() => {
    dispatch(getListAmenities());
    dispatch(getListFurnitures());
    dispatch(getListRoomType());
  }, []);
  const handleDistrictChange = (districtId: string) => {
    setValue("district", districtId);
  };
  const handleFilterSubmit = (data: any) => {
    const newSearchParam = {
      ...searchParam,
      ...data,
      sortBy: data.sortBy,
    };
    if (onSortChange && data.sortBy !== sortBy) {
      onSortChange(data.sortBy);
    }
    console.log("newSearchParam", newSearchParam);

    dispatch(setSearchParam(newSearchParam));
    const queryParams = new URLSearchParams();
    if (newSearchParam.sortBy)
      queryParams.append("sortBy", newSearchParam.sortBy);
    if (newSearchParam?.title)
      queryParams.append("title", newSearchParam.title);
    if (newSearchParam.roomType)
      queryParams.append("roomType", newSearchParam.roomType);
    if (newSearchParam.district)
      queryParams.append("district", newSearchParam.district);
    if (newSearchParam.price)
      queryParams.append(
        "priceRange",
        `[${newSearchParam.price[0]}, ${newSearchParam.price[1]}]`
      );
    if (newSearchParam.area)
      queryParams.append(
        "areaRange",
        `[${newSearchParam.area[0]}, ${newSearchParam.area[1]}]`
      );
    if (newSearchParam.amenities && newSearchParam.amenities.length > 0)
      queryParams.append("amenities", newSearchParam.amenities);
    if (newSearchParam.furnitures && newSearchParam.furnitures.length > 0)
      queryParams.append("furnitures", newSearchParam.furnitures);

    navigate(`/find-rental?${queryParams.toString()}`);
    dispatch(getListRoom(newSearchParam));
    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      {/* Mobile Close Button */}

      <form
        onSubmit={handleSubmit(handleFilterSubmit)}
        className="col-span-3 sm:col-span-4 sm:block"
      >
        <input
          type="hidden"
          {...register("sortBy")}
        />

        <div
          ref={componentRef}
          className={`flex h-[calc(100vh)] w-full flex-col rounded-2xl bg-white px-4 py-4 sm:!h-[calc(100vh-150px)] sm:h-[calc(100vh-97px)]`}
        >
          <div className="mb-4 mt-20 flex items-center justify-between md:hidden">
            <h2 className="text-lg font-semibold">Bộ lọc</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BiX className="h-5 w-5" />
            </button>
          </div>
          {/* Search Bar */}
          <div className="relative mb-6 flex items-center justify-between">
            <BiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              value={title}
              onChange={(e) => setValue("title", e.target.value)}
              type="text"
              placeholder="Search rooms..."
              className="w-full rounded-lg border border-primary bg-white py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {/* Price Range */}
          <div
            className="overflow-y-auto pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary dark:[&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-1"
            style={{ height: "inherit" }}
          >
            <div className="mt-6 flex flex-col">
              <div className="border-gray-150 border-b px-4 pb-8">
                <button
                  onClick={() => toggleDropdown("price")}
                  type="button"
                  className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
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
                      value={selectedPriceRange}
                      onValueChange={(value: number[]) =>
                        setValue("price", value)
                      }
                      min={1}
                      max={20}
                      step={1}
                    />
                  </motion.div>
                  //   </motion.div>
                  // </motion.div>
                )}
              </div>
              <div className="border-gray-150 border-b px-4 py-8">
                <button
                  onClick={() => toggleDropdown("area")}
                  type="button"
                  className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
                >
                  Diện tích
                  <motion.div
                    animate={{ rotate: openDropdowns.area ? 90 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <IoIosArrowForward className={`h-5 w-5`} />
                  </motion.div>
                </button>
                {openDropdowns.area && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <DualRangeSlider
                      label={() => <>m2</>}
                      // title="Giá"
                      value={selectedAreaRange}
                      onValueChange={(value) => setValue("area", value)}
                      min={10}
                      max={100}
                      step={1}
                    />
                  </motion.div>
                  //   </motion.div>
                  // </motion.div>
                )}
              </div>

              <div className="border-gray-150 border-b px-4 py-8">
                <button
                  onClick={() => toggleDropdown("location")}
                  type="button"
                  className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
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
                      selectedItem={selectedDistrict}
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
              <div className="border-gray-150 border-b px-4 py-8">
                <button
                  onClick={() => toggleDropdown("roomType")}
                  type="button"
                  className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
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
                    <div className="mt-6 space-y-2">
                      <ReusableCategorySelector
                        name="roomType"
                        cols={2}
                        watch={watch}
                        setValue={setValue}
                        categories={roomTypeList}
                        maxSelections={1}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
              {/* Furnishing */}
              <div className="border-gray-150 border-b px-4 py-8">
                <button
                  onClick={() => toggleDropdown("amenities")}
                  type="button"
                  className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
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
                    <div className="mt-6 space-y-2">
                      <ReusableCategorySelector
                        name="amenities"
                        cols={2}
                        categories={amenitiesList}
                        setValue={setValue}
                        watch={watch}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
              {/* Amenities */}
              <div className="border-gray-150 border-b px-4 py-8">
                <button
                  onClick={() => toggleDropdown("furnitures")}
                  type="button"
                  className="flex w-full items-center justify-between text-left text-lg font-semibold"
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
                    <div className="mt-6 space-y-2">
                      <ReusableCategorySelector
                        name="furnitures"
                        cols={2}
                        categories={furnituresList}
                        setValue={setValue}
                        watch={watch}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="border-gray-150 border-b px-4 py-8">
                <button
                  onClick={() => toggleDropdown("other")}
                  type="button"
                  className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
                >
                  Khác
                  <motion.div
                    animate={{ rotate: openDropdowns.other ? 90 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <IoIosArrowForward className={`h-5 w-5`} />
                  </motion.div>
                </button>
                {openDropdowns.other && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mt-6"
                  >
                    <div className="p-4">
                      <Radio
                        name="limitPeople"
                        options={limitPeople}
                        value={selectedLimitPeople}
                        onChange={(value) => setValue("limitPeople", value)}
                        gridCols={2}
                        layout="grid"
                        title="Số người tối đa"
                      />
                    </div>
                    <div className="p-4">
                      <Radio
                        name="contractDuration"
                        options={contractDurationOptions}
                        value={selectedContractDuration}
                        onChange={(value) =>
                          setValue("contractsDuration", value)
                        }
                        gridCols={2}
                        layout="grid"
                        title="Thời gian hợp đồng"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Áp dụng
          </button>
        </div>
        {/* Apply Filters Button */}
      </form>
    </>
  );
};
