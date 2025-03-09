import React, { useState } from "react";
import EmblaCarousel from "@/components/Carousel/embla-thumbs/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

import "../../components/Carousel/embla-thumbs/embla.css";
import { BiImage, BiVideo } from "react-icons/bi";
import { VideoPlayer } from "./video-player";
interface MediaGalleryProps {
  images: string[];
  videos: Array<{
    url: string;
    poster: string;
    title: string;
  }>;
}
export const MediaGallery: React.FC<MediaGalleryProps> = ({
  images,
  videos,
}) => {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = 10;
  const imgThumbs = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
  ];
  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab("images")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 transition-colors ${activeTab === "images" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <BiImage className="h-5 w-5" />
          Photos ({images.length})
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 transition-colors ${activeTab === "videos" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <BiVideo className="h-5 w-5" />
          Videos ({videos.length})
        </button>
      </div>
      {/* Media Content */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        {activeTab === "images" ? (
          <EmblaCarousel
            slides={imgThumbs}
            options={OPTIONS}
          />
        ) : (
          <div className="space-y-4">
            {videos.map((video, index) => (
              <VideoPlayer
                key={index}
                {...video}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
