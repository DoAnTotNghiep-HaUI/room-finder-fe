import { URL_IMAGE } from "@/constants";
import { IRoom } from "@/types/room";
import React from "react";
import { BiBed, BiCar, BiWifi, BiWind } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosExpand } from "react-icons/io";
import { LuShowerHead } from "react-icons/lu";
import { PiStairsLight } from "react-icons/pi";
import IconFurniture from "../../assets/images/noi-that.svg";
import IconAmenities from "../../assets/images/noi-that.svg";
import IconSerivce from "../../assets/images/noi-that.svg";
import IconDetail from "../../assets/images/write.svg";
import ReactMarkdown from "react-markdown";

export const RoomInfo = ({ roomData }: { roomData: IRoom }) => {
  return (
    <div className="space-y-6">
      {/* Key Details */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <span className="inline-block">
            <IoIosExpand size={32} />
          </span>

          <div className="text-sm text-gray-500">Diện tích</div>
          <div className="font-semibold">{roomData?.acreage} m2</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <span className="inline-block">
            <PiStairsLight size={32} />
          </span>
          <div className="text-sm text-gray-500">Tầng</div>
          <div className="font-semibold">{roomData?.floor}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <span className="inline-block">
            <FaUserFriends size={32} />
          </span>
          <div className="text-sm text-gray-500">Số người</div>
          <div className="font-semibold">{roomData?.limit_people}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <span className="inline-block">
            <FaMoneyBillTransfer size={32} />
          </span>
          <div className="text-sm text-gray-500">Đặt cọc </div>
          <div className="font-semibold text-green-600">
            {roomData?.deposit.toLocaleString("vi-VN")} VNĐ
          </div>
        </div>
      </div>
      {/* Service */}
      <div className="my-6">
        {/* <h3 className="mb-4 text-lg font-semibold">Tiện nghi</h3> */}
        <div className="mb-4 flex w-fit items-center space-x-[0.5rem] rounded-[1.375rem] border-[1px] px-[0.5rem] py-[0.125rem] sm:px-[0.75rem] sm:py-[0.25rem]">
          <div className="relative size-[1.5rem] sm:size-[2rem]">
            <img
              alt="image"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="h-8 w-8 object-contain"
              src={IconSerivce}
            />
          </div>
          <div className="text-text-default-d text-[0.875rem] font-semibold leading-[1.75rem] sm:text-[1.125rem]">
            Phí dịch vụ
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {roomData?.services.map((service, index) => (
            <div
              key={index}
              className="gap-2 text-center"
            >
              {/* <span className="inline-block text-gray-600">{`${URL_IMAGE}/${amenity?.icon.id}/${amenity?.icon.filename_download}`}</span> */}
              <img
                className="inline-block h-8 w-8"
                src={`${URL_IMAGE}/${service?.icon.id}/${service?.icon.filename_download}`}
                alt=""
              />
              <p className="pt-2">{service?.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Furnitures */}
      <div className="my-6">
        {/* <h3 className="mb-4 text-lg font-semibold">Tiện nghi</h3> */}
        <div className="mb-4 flex w-fit items-center space-x-[0.5rem] rounded-[1.375rem] border-[1px] px-[0.5rem] py-[0.125rem] sm:px-[0.75rem] sm:py-[0.25rem]">
          <div className="relative size-[1.5rem] sm:size-[2rem]">
            <img
              alt="image"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="h-8 w-8 object-contain"
              src={IconFurniture}
            />
          </div>
          <div className="text-text-default-d text-[0.875rem] font-semibold leading-[1.75rem] sm:text-[1.125rem]">
            Nội thất
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {roomData?.furnitures.map((furniture, index) => (
            <div
              key={index}
              className="gap-2 text-center"
            >
              {/* <span className="inline-block text-gray-600">{`${URL_IMAGE}/${amenity?.icon.id}/${amenity?.icon.filename_download}`}</span> */}
              <img
                className="inline-block h-8 w-8"
                src={`${URL_IMAGE}/${furniture?.icon.id}/${furniture?.icon.filename_download}`}
                alt=""
              />
              <p className="pt-2">{furniture?.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="my-6">
        {/* <h3 className="mb-4 text-lg font-semibold">Amenities</h3> */}
        <div className="mb-4 flex w-fit items-center space-x-[0.5rem] rounded-[1.375rem] border-[1px] px-[0.5rem] py-[0.125rem] sm:px-[0.75rem] sm:py-[0.25rem]">
          <div className="relative size-[1.5rem] sm:size-[2rem]">
            <img
              alt="image"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="h-8 w-8 object-contain"
              src={IconAmenities}
            />
          </div>
          <div className="text-text-default-d text-[0.875rem] font-semibold leading-[1.75rem] sm:text-[1.125rem]">
            Tiện nghi
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {roomData?.amenities.map((amenity, index) => (
            <div
              key={index}
              className="gap-2 text-center"
            >
              {/* <span className="inline-block text-gray-600">{`${URL_IMAGE}/${amenity?.icon.id}/${amenity?.icon.filename_download}`}</span> */}
              <img
                className="inline-block h-8 w-8"
                src={`${URL_IMAGE}/${amenity?.icon.id}/${amenity?.icon.filename_download}`}
                alt=""
              />
              <p className="pt-2">{amenity?.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="my-8">
        {/* <h3 className="mb-4 text-lg font-semibold">Amenities</h3> */}
        <div className="mb-4 flex w-fit items-center space-x-[0.5rem] rounded-[1.375rem] px-[0.5rem] py-[0.125rem] sm:px-[0.75rem] sm:py-[0.25rem]">
          <div className="relative size-[1.5rem] sm:size-[2rem]">
            <img
              alt="image"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="h-8 w-8 object-contain"
              src={IconDetail}
            />
          </div>
          <div className="text-text-default-d text-[0.875rem] font-semibold leading-[1.75rem] sm:text-[1.125rem]">
            Chi tiết
          </div>
        </div>
        <div>
          <ReactMarkdown className="px-6">
            {roomData?.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
