import React from "react";
import { FaBuilding, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { TfiRulerAlt2 } from "react-icons/tfi";

export default function RoomCardHorizontal() {
  return (
    <div className="flex items-center gap-4 overflow-hidden rounded-2xl border border-[#e4e4e4]">
      <img
        src="https://homelengohtml.vercel.app/images/home/house-sm-11.jpg"
        alt=""
        className="max-w-64 rounded-2xl object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <p className="text-lg font-semibold uppercase">
          PHÒNG TRỌ ĐẸP NGUYỄN AN NINH, TRƯƠNG ĐỊNH, TÂN MAI
        </p>
        <p className="text-lg font-semibold text-accent">4.000.000 đ/tháng</p>
        <span className="line-clamp-1">
          <FaLocationDot className="inline-block" /> 3 P. Phú Kiều, Phúc Diễn,
          Bắc Từ Liêm, Hà Nội, Việt Nam
        </span>
        <div>
          <span className="inline-flex items-center gap-x-2">
            <HiHome /> Phòng đơn
          </span>
        </div>
        <div>
          <span className="inline-flex items-center gap-x-2">
            <FaBuilding /> Toà nhà: LPD_YX
          </span>
        </div>
        <div className="flex space-x-6">
          <span className="inline-flex items-center gap-x-2">
            <TfiRulerAlt2 />
            20m2
          </span>
          <span className="inline-flex items-center gap-x-2">
            <FaUser />3
          </span>
        </div>
      </div>
    </div>
  );
}
