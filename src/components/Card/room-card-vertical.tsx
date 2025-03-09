import React, { useState } from "react";
import {
  FaBuilding,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import { GoDotFill, GoShieldCheck } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiHome } from "react-icons/hi2";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface RoomProps {
  id: string;
  title: string;
  price: number;
  urlImg: string;
  isVerify: boolean;
  address: string;
  roomType: string;
  building: string;
  create_at: string;
}
export default function RoomCardVertical(data: RoomProps) {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="group mx-auto h-auto overflow-hidden rounded-2xl border bg-white text-black dark:border-0 dark:bg-[#252525] dark:text-white">
        <figure className="relative h-80 w-full overflow-hidden rounded-md bg-[#f0f5fa] p-2 transition-all duration-300 group-hover:h-72 dark:bg-[#0a121a]">
          <img
            src="https://homelengohtml.vercel.app/images/banner/banner-property-3.jpg"
            alt="shoes"
            width={600}
            height={600}
            className="h-full w-full scale-105 rounded-2xl object-cover transition-all duration-300 group-hover:scale-100"
            onClick={() => navigate(`/property-detial/1`)}
          />
          {data?.isVerify ? (
            <div className="absolute inset-0">
              <div>
                <span className="inline-flex items-center gap-x-1 rounded-lg bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
                  <GoShieldCheck />
                  Uy tín
                </span>
              </div>
            </div>
          ) : null}
        </figure>
        <article className="space-y-2 p-3">
          <div>
            <div className="flex justify-between">
              <span className="inline-flex items-center text-sm font-semibold text-accent">
                <LuDot size={16} />
                {data?.create_at} trước
              </span>
              <div className="flex gap-1">
                <span
                  className="inline-flex items-center gap-x-1 px-2 py-1 text-xl font-medium"
                  onClick={() => setFavorite(true)}
                >
                  {favorite ? (
                    <FaHeart className="text-danger" />
                  ) : (
                    <FaRegHeart className="text-black" />
                  )}
                </span>
                <span
                  className="inline-flex items-center gap-x-1 px-2 py-1 text-xl font-medium"
                  onClick={() => setSave(true)}
                >
                  {save ? (
                    <FaBookmark className="text-accent" />
                  ) : (
                    <FaRegBookmark className="text-black" />
                  )}
                </span>
              </div>
            </div>

            <p
              className="truncate font-semibold uppercase hover:cursor-pointer"
              onClick={() => navigate(`/property-detail/1`)}
            >
              {data?.title}
            </p>
            <p className="text-lg font-semibold text-danger">
              Từ {data?.price} đ/tháng
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex space-x-6">
                <span className="inline-flex items-center gap-x-2">
                  <TfiRulerAlt2 />
                  20m2
                </span>
                <span className="inline-flex items-center gap-x-2">
                  <FaUser />3
                </span>
              </div>

              <span className="line-clamp-1">
                <FaLocationDot className="inline-block" /> {data?.address}
              </span>
              <div>
                <span className="inline-flex items-center gap-x-2">
                  <HiHome /> {data?.roomType}
                </span>
              </div>
              <div>
                <span className="inline-flex items-center gap-x-2">
                  <FaBuilding /> Toà nhà: {data?.building}
                </span>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="flex translate-y-2 gap-1 pt-2 text-base font-normal text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:text-white sm:hidden"
          >
            Chi tiết
            <span className="flex items-center">
              <FaChevronRight />
            </span>
          </a>
        </article>
      </div>
    </>
  );
}
