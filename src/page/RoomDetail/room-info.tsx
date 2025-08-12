import { Icon } from "@/utils/icon";
import React from "react";
import { BiBed, BiCar, BiWifi, BiWind } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosExpand } from "react-icons/io";
import { LuShowerHead } from "react-icons/lu";
import { PiStairsLight } from "react-icons/pi";

export const RoomInfo = ({ roomData }: { roomData: any }) => {
  const amenities = [
    {
      icon: <BiWifi />,
      name: "Free WiFi",
    },
    {
      icon: <BiCar />,
      name: "Parking Available",
    },
    {
      icon: <BiWind />,
      name: "Air Conditioning",
    },
    {
      icon: <BiBed />,
      name: "Furnished",
    },
    {
      icon: <LuShowerHead />,
      name: "Private Bathroom",
    },
  ];
  return (
    <div className="space-y-6">
      {/* Key Details */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <span className="inline-block">
            <IoIosExpand size={32} />
          </span>

          <div className="text-sm text-gray-500">Diện tích</div>
          <div className="font-semibold">{roomData.size}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <span className="inline-block">
            <PiStairsLight size={32} />
          </span>
          <div className="text-sm text-gray-500">Tầng</div>
          <div className="font-semibold">{roomData.rentalType}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <span className="inline-block">
            <FaUserFriends size={32} />
          </span>
          <div className="text-sm text-gray-500">Số người</div>
          <div className="font-semibold">${roomData.deposit}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <span className="inline-block">
            <FaMoneyBillTransfer size={32} />
          </span>
          <div className="text-sm text-gray-500">Đặt cọc </div>
          <div className="font-semibold text-green-600">{roomData.status}</div>
        </div>
      </div>
      {/* Amenities */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Amenities</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="gap-2 text-center"
            >
              {/* <span className="inline-block text-gray-600">{amenity.icon}</span> */}
              <span className="inline-block text-gray-600">
                <Icon />
              </span>

              <p className="">{amenity.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
