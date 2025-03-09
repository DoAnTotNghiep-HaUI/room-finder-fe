import React, { useState } from "react";
import { BiBadgeCheck, BiHeart } from "react-icons/bi";
import { FaMapPin, FaUser } from "react-icons/fa";
import { LuBookMarked, LuBuilding2 } from "react-icons/lu";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom";

interface RoomCardProps {
  layout?: "vertical" | "horizontal";
  room: {
    id: string;
    title: string;
    price: number;
    size: number;
    capacity: number;
    location: string;
    building?: string;
    type: string;
    image: string;
    postedDate: string;
    isVerified: boolean;
  };
  onCardClick?: () => void;
}
export const RoomCard: React.FC<RoomCardProps> = ({
  layout = "vertical",
  room,
  onCardClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };
  const cardClasses = `
    group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
    transition-all duration-300 hover:shadow-xl
    ${layout === "horizontal" ? "flex" : "flex-col"}
    
  `;
  const imageContainerClasses = `
    relative overflow-hidden hover:cursor-pointer
    ${layout === "horizontal" ? "w-1/3" : "w-full aspect-[4/3]"}
  `;
  return (
    <div
      className={cardClasses}
      onClick={onCardClick}
    >
      {/* Image Section */}
      <div
        className={imageContainerClasses}
        onClick={() => navigate(`/room/${roomId}`)}
      >
        <img
          src={room.image}
          alt={room.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Action Buttons */}
        <div className="absolute right-2 top-2 flex gap-2">
          <button
            onClick={handleFavoriteClick}
            className={`rounded-full p-2 ${isFavorite ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"} transition-colors`}
            aria-label="Add to favorites"
          >
            <BiHeart
              className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
            />
          </button>
          <button
            onClick={handleSaveClick}
            className={`rounded-full p-2 ${isSaved ? "bg-blue-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"} transition-colors`}
            aria-label="Save for later"
          >
            <LuBookMarked
              className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>
      {/* Content Section */}
      <div
        className={`flex-1 p-4 ${layout === "horizontal" ? "flex flex-col justify-between" : ""}`}
      >
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3
              className="line-clamp-2 text-lg font-semibold text-gray-900 hover:cursor-pointer hover:text-primary dark:text-white"
              onClick={() => navigate(`/room/${roomId}`)}
            >
              {room.title}
            </h3>
          </div>
          {/* Tags and Verification */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {room.type}
            </span>
            {room.isVerified && (
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <BiBadgeCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
        </div>
        {/* Details */}
        <div className="mt-4 space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <TfiRulerAlt2 className="h-4 w-4" />
              {room.size}m²
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <FaUser className="h-4 w-4" />
              {room.capacity} {room.capacity === 1 ? "Person" : "People"}
            </div>
          </div>
          <div className="flex items-start gap-1 text-sm text-gray-500 dark:text-gray-400">
            <FaMapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{room.location}</span>
          </div>
          {room.building && (
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <LuBuilding2 className="h-4 w-4" />
              {room.building}
            </div>
          )}
        </div>
        {/* Posted Date */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Posted {room.postedDate}
          </p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            ${room.price}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              /mo
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
