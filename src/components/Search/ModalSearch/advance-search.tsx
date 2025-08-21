import Checkbox from "@/components/Input/checkbox";
import Select from "@/components/Input/select";
import { DualRangeSlider } from "@/components/Input/slider";
import { URL_IMAGE } from "@/constants";
import { AppDispatch, AppState } from "@/redux";
import { getListAmenities } from "@/redux/amenities/action";
import { getListFurnitures } from "@/redux/furnitures/action";
import { IAmenity, IFurniture } from "@/types/room";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface CategorySelectorProps {
  onSelectionChange?: (selectedCategories: string[]) => void;
}
export default function AdvanceSearch() {
  const [price, setPrice] = useState([1, 20]);
  const [area, setArea] = useState([10, 100]);
  const [rooms, setRooms] = useState<string | number>("1");
  const [contactsDuration, setContractsDuration] = useState<string | number>(
    "3_months"
  );
  const [litmitPeople, setLimitPeople] = useState(1);
  const [checked, setChecked] = useState(false);
  const { amenitiesList } = useSelector((state: AppState) => state.amenities);
  const { furnituresList } = useSelector((state: AppState) => state.furnitures);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedFurnitures, setSelectedFurnitures] = useState<string[]>([]);
  console.log("furniturs", selectedFurnitures);

  const toggleAmenities = (amenitiesId: string) => {
    const newSelection = selectedAmenities.includes(amenitiesId)
      ? selectedAmenities.filter((id) => id !== amenitiesId)
      : [...selectedAmenities, amenitiesId];

    setSelectedAmenities(newSelection);
    // onSelectionChange?.(newSelection);
  };
  const toggleFurnitures = (furnituresId: string) => {
    const newSelection = selectedFurnitures.includes(furnituresId)
      ? selectedFurnitures.filter((id) => id !== furnituresId)
      : [...selectedFurnitures, furnituresId];

    setSelectedFurnitures(newSelection);
    // onSelectionChange?.(newSelection);
  };
  useEffect(() => {
    dispatch(getListAmenities());
    dispatch(getListFurnitures());
  }, []);
  return (
    <div>
      <p className="text-center text-3xl font-bold text-primary">
        Tìn phòng theo sở thích của bạn!
      </p>
      <div className="max-h-[55vh] overflow-y-auto">
        <div className="sm:py-8 lg:p-8 lg:py-0">
          <div className="grid gap-4 sm:grid-rows-2 lg:grid-cols-2">
            <div className="mx-auto w-full">
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
            <div className="mx-auto w-full">
              <DualRangeSlider
                label={() => <>m2</>}
                title="Diện tích"
                value={area}
                onValueChange={setArea}
                min={10}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 pb-8 sm:grid-cols-1 lg:grid-cols-3 lg:px-8">
          <Select
            label="Số lượng người"
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
            ]}
            value={1}
            onChange={(value) => setRooms(value)}
            className="border border-accent"
            width={48}
          />
          <Select
            label="Loại hợp đồng"
            options={[
              { value: "3_months", label: "3 tháng" },
              { value: "6_months", label: "6 tháng" },
              { value: "1_year", label: "1 năm" },
              { value: "2_years", label: "2 năm" },
            ]}
            value={"3_months"}
            onChange={(value) => setContractsDuration(value)}
            className="border border-accent"
            width={72}
          />
        </div>
        <div className="">
          <p className="font-sm pb-2 font-semibold">Tiện nghi: </p>
          <div className="mx-auto w-full p-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {amenitiesList?.map((amenity: IAmenity) => {
                const isSelected = selectedAmenities.includes(amenity?.id);
                return (
                  <button
                    key={amenity?.id}
                    onClick={() => toggleAmenities(amenity?.id)}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-4 transition-all duration-200 ${
                      isSelected
                        ? "border-[#1E88E5] bg-[#1E88E5]/10 text-[#1E88E5]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#1E88E5]/50 hover:bg-[#1E88E5]/5"
                    } `}
                  >
                    <img
                      className="inline-block h-8 w-8"
                      src={`${URL_IMAGE}/${amenity?.icon.id}/${amenity?.icon.filename_download}`}
                      alt=""
                    />
                    <span className="text-sm font-medium">{amenity?.name}</span>
                  </button>
                );
              })}
            </div>

            {selectedAmenities.length > 0 && (
              <div className="mt-4 rounded-lg bg-[#1E88E5]/10 p-3">
                <p className="text-sm font-medium text-[#1E88E5]">
                  Đã chọn: {selectedAmenities.length} danh mục
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="font-sm pb-2 font-semibold">Nội thất: </p>
          <div className="mx-auto w-full p-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {furnituresList?.map((furniture: IFurniture) => {
                const isSelected = selectedFurnitures.includes(furniture?.id);
                return (
                  <button
                    key={furniture?.id}
                    onClick={() => toggleFurnitures(furniture?.id)}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-4 transition-all duration-200 ${
                      isSelected
                        ? "border-[#1E88E5] bg-[#1E88E5]/10 text-[#1E88E5]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#1E88E5]/50 hover:bg-[#1E88E5]/5"
                    } `}
                  >
                    <img
                      className="inline-block h-8 w-8"
                      src={`${URL_IMAGE}/${furniture?.icon.id}/${furniture?.icon.filename_download}`}
                      alt=""
                    />
                    <span className="text-sm font-medium">
                      {furniture?.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedFurnitures.length > 0 && (
              <div className="mt-4 rounded-lg bg-[#1E88E5]/10 p-3">
                <p className="text-sm font-medium text-[#1E88E5]">
                  Đã chọn: {selectedFurnitures.length} danh mục
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
