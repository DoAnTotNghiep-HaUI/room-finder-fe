import { URL_IMAGE } from "@/constants";
import React from "react";
import { BiShield, BiStar } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import noneAvatar from "../../assets/images/Profile_avatar_placeholder_large.png";
export const OwnerProfile = ({ owner }) => {
  // const owner = {
  //   name: "Sarah Johnson",
  //   title: "Property Owner",
  //   rating: 4.8,
  //   responseTime: "Usually responds within 1 hour",
  //   verified: true,
  //   joinDate: "Member since 2020",
  //   avatar: "https://placehold.co/200x200?text=SJ",
  // };
  console.log("owner", owner);
  console.log("verified", owner?.landlord_verification[0]?.isVerified);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={
            owner?.avatar
              ? `${URL_IMAGE}/${
                  owner?.avatar?.id
                }/${owner?.avatar?.filename_download}`
              : noneAvatar
          }
          alt={owner?.last_name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {owner?.first_name} {owner?.last_name}
          </h3>

          <p className="text-sm text-gray-500">Chủ nhà</p>

          <div className="mt-1 flex items-center gap-1">
            <BiStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {/* <span className="text-sm font-medium">{owner.rating}</span> */}
            <span className="text-sm font-medium">5</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {owner?.landlord_verification[0]?.isVerified === true ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BiShield className="h-4 w-4 text-green-600" />
            <span>Đã xác minh</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CiWarning className="h-4 w-4 text-yellow-600" />
            <span>Chưa xác minh</span>
          </div>
        )}
        <p className="text-sm text-gray-600">Thường phản hồi sau 15p</p>
      </div>
    </div>
  );
};
