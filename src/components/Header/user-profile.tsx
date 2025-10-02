import store, { AppDispatch, AppState } from "@/redux";
import { logout, setUserInfo } from "@/redux/auth/store";
import React, { useEffect, useState, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
import avatar from "../../assets/images/Profile_avatar_placeholder_large.png";
import { URL_IMAGE } from "@/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/types/user";
import { IBooking } from "@/types/booking";
import { AccountModal } from "../Modal/account-modal";
import { deleteBooking, getBookingsByUser } from "@/redux/booking/action";
import { updateUserInfo } from "@/redux/auth/action";
import { uploadFilesToDirectus } from "@/hooks/useChat";
// import { useNavigate } from "react-router-dom";
const dropdownMenu = [
  // {
  //   item: "Tài khoản",
  //   // href: "/account",
  // },
  // {
  //   item: "Xem lịch đã đặt",
  //   href: "/bookings",
  // },

  {
    item: "Quản lý hợp đồng",
    href: "/contract-billing",
  },
  {
    item: "Đăng xuất",
    href: "/logout",
  },
];
export const UserProfile = ({ user }) => {
  if (!user) {
    return null;
  }
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [bookings, setBookings] = useState<IBooking[]>();

  const handleUpdateUser = async (updatedUser: IUser) => {
    await dispatch(
      updateUserInfo({
        id: updatedUser.id,
        update: {
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          phone_number: updatedUser.phone_number,
          avatar: updatedUser.avatar,
        },
      })
    );
  };

  const handleDeleteBooking = (bookingId: string) => {
    dispatch(deleteBooking(bookingId));
    dispatch(getBookingsByUser(user.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="relative flex items-center space-x-3 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
          className="h-11 w-11 rounded-full border-2 border-gray-200 dark:border-gray-700"
          src={
            user?.avatar
              ? `${URL_IMAGE}/${
                  user?.avatar?.id
                }/${user?.avatar?.filename_download}`
              : avatar
          }
          alt="User profile"
        />
        <span className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-[#e2e5e9] dark:bg-[#3b3d3e] dark:text-[#e2e5e9]">
          <BiChevronDown className="h-4 w-4" />
        </span>
      </button>
      {/* Dropdown Menu */}
      <div
        className={`${isDropdownOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} absolute right-0 mt-2 w-48 origin-top-right transform rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out dark:bg-gray-800`}
      >
        <p
          className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          onClick={() => {
            setIsAccountModalOpen(true);
          }}
        >
          Tài khoản
        </p>
        {dropdownMenu.map((menu, i) => (
          <p
            key={i}
            className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              if (menu.href === "/logout") {
                dispatch(logout());
              } else if (menu.href === "/contract-billing" && navigate) {
                navigate("/contract-billing");
              } else if (navigate) {
                navigate(menu.href);
              }
            }}
          >
            {menu.item}
          </p>
        ))}
      </div>

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        user={user}
        bookings={bookings}
        onUpdateUser={handleUpdateUser}
        onDeleteBooking={handleDeleteBooking}
      />
    </div>
  );
};
