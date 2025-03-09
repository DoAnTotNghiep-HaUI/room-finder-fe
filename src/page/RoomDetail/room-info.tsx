import React from "react";
import { BiBed, BiCar, BiWifi, BiWind } from "react-icons/bi";
import { LuShowerHead } from "react-icons/lu";
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
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm text-gray-500">Size</div>
          <div className="font-semibold">{roomData.size}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm text-gray-500">Rental Type</div>
          <div className="font-semibold">{roomData.rentalType}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm text-gray-500">Deposit</div>
          <div className="font-semibold">${roomData.deposit}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm text-gray-500">Status</div>
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
              className="flex items-center gap-2"
            >
              <div className="text-gray-600">{amenity.icon}</div>
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
