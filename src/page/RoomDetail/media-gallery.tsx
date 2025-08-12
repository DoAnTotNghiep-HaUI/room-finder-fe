import React, { useState } from "react";
import EmblaCarousel from "@/components/Carousel/embla-thumbs/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

import "../../components/Carousel/embla-thumbs/embla.css";
import { BiImage, BiVideo } from "react-icons/bi";
import { VideoPlayer } from "./video-player";
import { IFile } from "@/types/file";
import { URL_IMAGE } from "@/constants";
interface MediaGalleryProps {
  images: any;
  video: IFile;
}
export const MediaGallery: React.FC<MediaGalleryProps> = ({
  images,
  video,
}) => {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = 10;
  console.log("images", images);

  const imgThumbs = images?.map(
    (img) => `${URL_IMAGE}/${img?.id}/${img?.filename_download}`
  );
  console.log("slides", imgThumbs);

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab("images")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 transition-colors ${activeTab === "images" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <BiImage className="h-5 w-5" />
          Ảnh ({images?.length})
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 transition-colors ${activeTab === "videos" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <BiVideo className="h-5 w-5" />
          Video
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
            <VideoPlayer
              id={video?.id}
              filename_download={video?.filename_download}
              title={video?.title}
            />
          </div>
        )}
      </div>
    </div>
  );
};
