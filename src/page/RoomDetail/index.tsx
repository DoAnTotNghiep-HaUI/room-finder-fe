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
import ModalAuth from "@/components/Auth/modal-auth";
import Login from "@/components/Auth/login";
import Register from "@/components/Auth/register";

export const RoomDetail = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const { roomDetail } = useSelector((state: AppState) => state.roomDetail);
  const { currentConversationId } = useSelector(
    (state: AppState) => state.conversation
  );
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  console.log("roomDetail", roomDetail);

  const { roomId } = useParams();
  useEffect(() => {
    dispatch(getRoomDetail(roomId));
  }, [roomId]);
  console.log("roomDetail", roomDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const handleOpenModal = () => {
    if (!userInfo) {
      setShowLoginModal(true);
      return;
    }
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
  console.log("userId1", userInfo?.id);
  console.log("userId2", roomDetail?.building?.landlord?.id);

  // Giả lập
  const handleChatWithOwner = async () => {
    if (!userInfo) {
      setShowLoginModal(true);
      return;
    }

    // 2. Check tồn tại
    const existingConvs = await dispatch(
      checkConversationExists({
        userId1: roomDetail?.building?.landlord?.id,
        userId2: userInfo?.id,
      })
    ).unwrap();
    console.log("existingConvs", existingConvs);

    let conversationId: string;

    if (existingConvs.length > 0) {
      conversationId = existingConvs[0].id;
      dispatch(setConversationId(conversationId));
      dispatch(openChatWithUser(roomDetail?.building?.landlord?.id));
      // Không tạo mới nữa!
      return;
    }

    // 3. Nếu chưa có, tạo mới
    const res = await dispatch(
      createConversation({
        participants: [
          { directus_users_id: userInfo.id },
          { directus_users_id: roomDetail?.building?.landlord?.id },
        ],
      })
    ).unwrap();
    conversationId = res.id;
    dispatch(setConversationId(conversationId));
    dispatch(openChatWithUser(roomDetail?.building?.landlord?.id));
  };
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
                <RoomInfo roomData={roomDetail} />
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
                  <p className="text-xl text-gray-800">Giá phòng</p>
                  <div className="mb-2 text-3xl font-bold text-gray-900 text-primary">
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
                    {/* <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
                      <BiPhone className="h-5 w-5" />
                      Gọi cho chủ phòng
                    </button> */}
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
        {/* <ContactOwner roomData={roomData} /> */}
      </div>
      {/* {bookingData && (
        <div className="mt-4 rounded-md bg-green-100 p-4">
          <h2 className="font-semibold text-green-800">Booking Confirmed!</h2>
          <p className="text-green-700">
            Date: {new Date(bookingData.date).toLocaleDateString()}
          </p>
          <p className="text-green-700">Time: {bookingData.time}</p>
        </div> */}
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
      {/* )} */}

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        room_id={roomDetail?.id}
        landlord_id={roomDetail?.building?.landlord?.id}
        tenant_id={userInfo?.id}
      />
      <Login
        isOpen={showLoginModal && isLogin}
        onClose={() => setShowLoginModal(false)}
        setIsLogin={setIsLogin}
      />
      <Register
        isOpen={showLoginModal && !isLogin}
        onClose={() => setShowLoginModal(false)}
        setIsLogin={setIsLogin}
      />
    </>
  );
};
