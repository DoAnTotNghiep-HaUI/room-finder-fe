import React, { useEffect, useState } from "react";

import Button from "@/components/Button/button";
import { LuSlidersVertical } from "react-icons/lu";
import AdvanceSearch from "./advance-search";
import Checkbox from "@/components/Input/checkbox";
import Select from "@/components/Input/select";
import { DualRangeSlider } from "@/components/Input/slider";
import { URL_IMAGE } from "@/constants";
import { AppDispatch, AppState } from "@/redux";
import { getListAmenities } from "@/redux/amenities/action";
import { getListFurnitures } from "@/redux/furnitures/action";
import { IAmenity, IFurniture } from "@/types/room";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  ModalTrigger,
  useModal,
} from "@/components/Modal/animated-modal";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { set } from "date-fns";
interface ChildProps {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}
export default function ModalSearch({ setValue, watch }: ChildProps) {
  const { amenitiesList } = useSelector((state: AppState) => state.amenities);
  const { furnituresList } = useSelector((state: AppState) => state.furnitures);
  const dispatch = useDispatch<AppDispatch>();
  // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  // const [selectedFurnitures, setSelectedFurnitures] = useState<string[]>([]);
  // console.log("furniturs", selectedFurnitures);

  const toggleAmenities = (amenitiesId: string) => {
    const currentAmenities = watch("amenities") || [];
    const newSelection = currentAmenities.includes(amenitiesId)
      ? currentAmenities.filter((id) => id !== amenitiesId)
      : [...currentAmenities, amenitiesId];

    setValue("amenities", newSelection);
  };

  const toggleFurnitures = (furnituresId: string) => {
    const currentFurnitures = watch("furnitures") || [];
    const newSelection = currentFurnitures.includes(furnituresId)
      ? currentFurnitures.filter((id) => id !== furnituresId)
      : [...currentFurnitures, furnituresId];

    setValue("furnitures", newSelection);
  };
  useEffect(() => {
    dispatch(getListAmenities());
    dispatch(getListFurnitures());
  }, []);
  const handleSearch = () => {
    const searchParams = watch();
    const price = [searchParams?.price[0], searchParams?.price[1]];
    console.log("price", price);

    setValue("price", price);
    setValue("area", searchParams?.area);
    setValue("contractsDuration", searchParams?.contractsDuration);
    setValue("limitPeople", searchParams?.limitPeople);
    setValue("amenities", searchParams?.amenities);
    setValue("furnitures", searchParams?.furnitures);
    console.log("searchParam", searchParams);
  };

  const selectedPrice = watch("price") || [1, 20];
  const selectedArea = watch("area") || [10, 100];
  const selectedContractsDuration = watch("contractsDuration") || "3_months";
  const selectedLimitPeople = watch("limitPeople") || 1;
  const selectedAmenities = watch("amenities") || [];
  const selectedFurnitures = watch("furnitures") || [];
  return (
    <div className="sm:w-full lg:flex lg:w-72 lg:justify-end">
      <Modal>
        <ModalTrigger className="group/modal-btn md:w-full lg:flex lg:items-center lg:justify-center">
          <div className="flex items-center justify-center gap-2 rounded-full border border-primary py-3 font-semibold text-primary duration-300 ease-in-out hover:bg-primary hover:text-white lg:px-10 xl:px-20">
            <p>Bộ lọc</p>
            <span>
              <LuSlidersVertical />
            </span>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            {/* <AdvanceSearch
              getFormValue={watch}
              setFormValue={setValue}
            /> */}
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
                        value={selectedPrice}
                        onValueChange={(value) => setValue("price", value)}
                        min={1}
                        max={20}
                        step={1}
                      />
                    </div>
                    <div className="mx-auto w-full">
                      <DualRangeSlider
                        label={() => <>m2</>}
                        title="Diện tích"
                        value={selectedArea}
                        onValueChange={(value) => setValue("area", value)}
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
                    value={selectedLimitPeople}
                    onChange={(value) => setValue("limitPeople", value)}
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
                    value={selectedContractsDuration}
                    onChange={(value) => setValue("contractsDuration", value)}
                    className="border border-accent"
                    width={72}
                  />
                </div>
                <div className="">
                  <p className="font-sm pb-2 font-semibold">Tiện nghi: </p>
                  <div className="mx-auto w-full p-4">
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                      {amenitiesList?.map((amenity: IAmenity) => {
                        const isSelected = selectedAmenities.includes(
                          amenity?.id
                        );
                        return (
                          <button
                            type="button"
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
                            <span className="text-sm font-medium">
                              {amenity?.name}
                            </span>
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
                        const isSelected = selectedFurnitures.includes(
                          furniture?.id
                        );
                        return (
                          <button
                            type="button"
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
          </ModalContent>
          <ModalFooter className="gap-4">
            <Button
              variant="primary"
              content="Lưu"
              onClick={() => {
                handleSearch();
              }}
            />
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
