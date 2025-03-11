import EmblaCarousel from "@/components/Carousel/embla-thumbs/EmblaCarousel";
import Layout from "@/layout/layout";
import { EmblaOptionsType } from "embla-carousel";
import React, { useState } from "react";
import "../../components/Carousel/embla-thumbs/embla.css";
import { MediaGallery } from "./media-gallery";
import { RoomInfo } from "./room-info";
import { LocationMap } from "./location-map";
import { ReviewSection } from "./review-section";
import { BiCalendar, BiPhone } from "react-icons/bi";
import { IoMail } from "react-icons/io5";
import { OwnerProfile } from "./owner-profile";
import { ContactOwner } from "./contact-owner";

export const RoomDetail = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const roomData = {
    title: "Modern Studio Apartment in Downtown",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
    ],
    videos: [
      {
        url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
        poster: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        title: "Living Room Tour",
      },
      {
        url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
        poster: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
        title: "Kitchen & Dining Area",
      },
    ],
    price: 1200,
    size: "450 sq ft",
    rentalType: "Monthly",
    deposit: 2400,
    status: "Available",
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "123 Main Street, New York, NY 10001",
    },
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <MediaGallery
                images={roomData.images}
                videos={roomData.videos}
              />
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h1 className="mb-4 text-2xl font-semibold text-gray-900">
                  {roomData.title}
                </h1>
                <RoomInfo roomData={roomData} />
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Location
                </h2>
                <LocationMap location={roomData.location} />
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <ReviewSection />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-2 text-3xl font-bold text-gray-900">
                    ${roomData.price}
                    <span className="text-lg font-normal text-gray-500">
                      /month
                    </span>
                  </div>
                  <div className="mt-6 space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                      <BiCalendar className="h-5 w-5" />
                      Schedule a Visit
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
                      <BiPhone className="h-5 w-5" />
                      Call Owner
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50">
                      <IoMail className="h-5 w-5" />
                      Send Message
                    </button>
                  </div>
                </div>
                <OwnerProfile />
              </div>
            </div>
          </div>
        </div>
        <ContactOwner roomData={roomData} />
      </div>
    </>
  );
};
