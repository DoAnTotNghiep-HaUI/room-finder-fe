import React from "react";
import { FaBuilding, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { TfiRulerAlt2 } from "react-icons/tfi";

export default function RoomCardSummary() {
  return (
    <div className="flex items-center gap-2 overflow-hidden border-b border-[#e4e4e4]">
      <img
        src="https://homelengohtml.vercel.app/images/home/house-sm-11.jpg"
        alt=""
        className="max-w-36 rounded-2xl object-cover"
      />
      <div className="flex flex-col gap-2 p-2">
        <p className="line-clamp-1 text-sm font-semibold uppercase">
          PHÒNG TRỌ ĐẸP NGUYỄN AN NINH, TRƯƠNG ĐỊNH, TÂN MAI
        </p>
        <p className="text-sm font-semibold text-accent">4.000.000 đ/tháng</p>
        <span className="line-clamp-1 text-sm">
          <FaLocationDot className="inline-block" /> 3 P. Phú Kiều, Phúc Diễn,
          Bắc Từ Liêm, Hà Nội, Việt Nam
        </span>
        <div className="text-sm">
          <span className="inline-flex items-center gap-x-2">
            <HiHome /> Phòng đơn
          </span>
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
    </div>
  );
}
