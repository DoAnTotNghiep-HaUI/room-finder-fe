import EmblaCarousel from "@/components/Carousel/embla-thumbs/EmblaCarousel";
import Layout from "@/layout/layout";
import { EmblaOptionsType } from "embla-carousel";
import React, { useEffect, useState } from "react";
import "../../components/Carousel/embla-thumbs/embla.css";
import { MediaGallery } from "./media-gallery";
import { RoomInfo } from "./room-info";
import { LocationMap } from "./location-map";
import { ReviewSection } from "./review-section";
import { BiCalendar, BiPhone } from "react-icons/bi";
import { IoMail } from "react-icons/io5";
import { OwnerProfile } from "./owner-profile";
import { ContactOwner } from "./contact-owner";
import { AppDispatch, AppState } from "@/redux";
import { getRoomDetail } from "@/redux/room-detail/action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookingModal from "@/components/Modal/booking-modal";
import { Bounce, Slide, toast, ToastContainer } from "react-toastify";
import {
  openTempConversation,
  setConversationId,
} from "@/redux/conversation/store";
import {
  checkConversationExists,
  createConversation,
  openChatWithUser,
} from "@/redux/conversation/action";

export const RoomDetail = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const { roomDetail } = useSelector((state: AppState) => state.roomDetail);
  const { currentConversationId } = useSelector(
    (state: AppState) => state.conversation
  );
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const { roomId } = useParams();
  useEffect(() => {
    dispatch(getRoomDetail(roomId));
  }, [roomId]);
  console.log("roomDetail", roomDetail);
  console.log("photo", roomDetail?.photos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: { date: string; time: string }) => {
    console.log("Booking submitted:", data);
    setBookingData(data);
    toast(`Đặt lịch thành công ${data.date} ${data.time}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    // In a real app, you would send this data to your backend
  };
  console.log("currentConversationId", currentConversationId);

  const handleChatWithOwner = async () => {
    const existingConvs = await dispatch(
      checkConversationExists({
        userId1: userInfo.id,
        userId2: roomDetail?.building?.landlord?.id,
      })
    ).unwrap();

    let conversationId: string;

    // 2. Nếu đã tồn tại
    if (existingConvs.length > 0) {
      conversationId = existingConvs[0].id;
      console.log("Using existing conversation:", conversationId);
    }
    // 3. Nếu chưa tồn tại, tạo mới
    else {
      const res = await dispatch(
        createConversation({
          participants: [
            { directus_users_id: userInfo.id },
            { directus_users_id: roomDetail?.building?.landlord?.id },
          ],
        })
      ).unwrap();
      conversationId = res.id;
      console.log("Created new conversation:", conversationId);
    }
    dispatch(setConversationId(conversationId));
    dispatch(openChatWithUser(roomDetail?.building?.landlord?.id));
  };
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
  console.log("video", roomDetail?.video);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {roomDetail?.photos && (
                <MediaGallery
                  images={roomDetail.photos}
                  video={roomDetail.video}
                />
              )}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h1 className="mb-4 text-2xl font-semibold text-gray-900">
                  {roomDetail?.title}
                </h1>
                <RoomInfo roomData={roomData} />
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Địa chỉ
                </h2>
                <LocationMap location={roomDetail?.building} />
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <ReviewSection />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-2 text-3xl font-bold text-gray-900">
                    {roomDetail?.room_price.toLocaleString("vi-VN")} Đ
                    <span className="text-lg font-normal text-gray-500">
                      /Tháng
                    </span>
                  </div>
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleOpenModal}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                      <BiCalendar className="h-5 w-5" />
                      Đặt lịch xem phòng
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
                      <BiPhone className="h-5 w-5" />
                      Gọi cho chủ phòng
                    </button>
                    <button
                      onClick={handleChatWithOwner}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <IoMail className="h-5 w-5" />
                      Gửi tin nhắn
                    </button>
                  </div>
                </div>
                <OwnerProfile owner={roomDetail?.building?.landlord} />
              </div>
            </div>
          </div>
        </div>
        <ContactOwner roomData={roomData} />
      </div>
      {bookingData && (
        // <div className="mt-4 rounded-md bg-green-100 p-4">
        //   <h2 className="font-semibold text-green-800">Booking Confirmed!</h2>
        //   <p className="text-green-700">
        //     Date: {new Date(bookingData.date).toLocaleDateString()}
        //   </p>
        //   <p className="text-green-700">Time: {bookingData.time}</p>
        // </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};
