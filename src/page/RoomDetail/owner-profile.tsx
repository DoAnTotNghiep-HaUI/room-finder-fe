import React from "react";
import { BiShield, BiStar } from "react-icons/bi";
export const OwnerProfile = () => {
  const owner = {
    name: "Sarah Johnson",
    title: "Property Owner",
    rating: 4.8,
    responseTime: "Usually responds within 1 hour",
    verified: true,
    joinDate: "Member since 2020",
    avatar: "https://placehold.co/200x200?text=SJ",
  };
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{owner.name}</h3>
          <p className="text-sm text-gray-500">{owner.title}</p>
          <div className="mt-1 flex items-center gap-1">
            <BiStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{owner.rating}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BiShield className="h-4 w-4 text-green-600" />
          <span>Verified Owner</span>
        </div>
        <p className="text-sm text-gray-600">{owner.responseTime}</p>
        <p className="text-sm text-gray-500">{owner.joinDate}</p>
      </div>
    </div>
  );
};
