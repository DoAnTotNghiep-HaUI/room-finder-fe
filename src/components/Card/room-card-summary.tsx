import { URL_IMAGE } from "@/constants";
import { IRoom } from "@/types/room";
import React from "react";
import { FaBuilding, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { TfiRulerAlt2 } from "react-icons/tfi";

export default function RoomCardSummary({ room }: { room: IRoom }) {
  return (
    <div className="flex items-center gap-2 overflow-hidden border-b border-[#e4e4e4]">
      <img
        src={
          room
            ? `${URL_IMAGE}/${
                room?.photos[0]?.id
              }/${room?.photos[0]?.filename_download}`
            : ""
        }
        alt={room?.title}
        className="max-w-36 rounded-2xl object-cover"
      />
      <div className="flex flex-col gap-2 p-2">
        <p className="line-clamp-1 text-sm font-semibold uppercase">
          {room?.title}
        </p>
        <p className="text-sm font-semibold text-accent">
          {room?.room_price} đ/tháng
        </p>
        <span className="line-clamp-1 text-sm">
          <FaLocationDot className="inline-block" />{" "}
          {room?.building?.specific_address},{room?.building?.ward},
          {room?.building?.district?.name},{room?.building?.city}
        </span>
        <div className="text-sm">
          <span className="inline-flex items-center gap-x-2">
            <HiHome /> {room?.room_type.name}
          </span>
          <div className="flex space-x-6">
            <span className="inline-flex items-center gap-x-2">
              <TfiRulerAlt2 />
              {room?.acreage} m²
            </span>
            <span className="inline-flex items-center gap-x-2">
              <FaUser />
              {room?.limit_people}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
