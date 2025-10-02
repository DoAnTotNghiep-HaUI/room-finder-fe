import { URL_IMAGE } from "@/constants";
import { uploadFilesToDirectus } from "@/hooks/useChat";
import { AppDispatch, AppState } from "@/redux";
import { getBookingsByUser } from "@/redux/booking/action";
import { IBooking } from "@/types/booking";
import { IUser } from "@/types/user";
import { formatDate } from "@/utils/utils";
import type React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiCamera, FiTrash2, FiSave, FiEdit2, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
  bookings: IBooking[];
  onUpdateUser: (data: IUser) => void;
  onDeleteBooking: (bookingId: string) => void;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
}

export function AccountModal({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onDeleteBooking,
}: AccountModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings } = useSelector((state: AppState) => state.booking);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    `${URL_IMAGE}/${user?.avatar?.id}/${user?.avatar?.filename_download}`
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone_number,
      avatar: `${URL_IMAGE}/${user.avatar?.id}/${user.avatar?.filename_download}`,
    },
  });
  useEffect(() => {
    dispatch(getBookingsByUser(user.id));
  }, [user.id]);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    let avatarId = user.avatar?.id;
    if (avatarFile) {
      const uploaded = await uploadFilesToDirectus([avatarFile]);
      avatarId = uploaded[0]?.id;
    }
    onUpdateUser({
      ...user,
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phone,
      avatar: avatarId as any,
    });
    setIsEditing(false);
    setAvatarFile(null);
  };
  const handleCancel = () => {
    reset();
    setAvatarPreview(
      `${URL_IMAGE}/${user?.avatar?.id}/${user?.avatar?.filename_download}`
    );
    setIsEditing(false);
  };

  const getStatusStyle = (status: IBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "cancelled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusText = (status: IBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "cancelled":
        return "Đã hủy";
      case "rejected":
        return "Đã từ chối";
      case "completed":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Tài khoản của tôi - UUID: {user.id}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Đóng modal"
          >
            <FiX className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-8 p-6">
          {/* Personal Information Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Thông tin cá nhân
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  <FiEdit2 className="h-4 w-4" />
                  Chỉnh sửa
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    <FiSave className="h-4 w-4" />
                    Lưu
                  </button>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview || "/placeholder.svg"}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-semibold text-gray-500 dark:text-gray-400">
                        {user.first_name.charAt(0)}
                        {user.last_name.charAt(0)}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                    >
                      <FiCamera className="h-4 w-4" />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        disabled={!isEditing}
                      />
                    </label>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isEditing
                      ? "Nhấp vào biểu tượng camera để thay đổi ảnh đại diện"
                      : "Ảnh đại diện"}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Họ <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName", { required: "Tên là bắt buộc" })}
                    disabled={!isEditing}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-700"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName", { required: "Họ là bắt buộc" })}
                    disabled={!isEditing}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-700"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Email không thể thay đổi
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone", {
                      //   required: "Số điện thoại là bắt buộc",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                    disabled={!isEditing}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-700"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Booking History Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Lịch sử đặt phòng
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                      Thời gian đặt
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                      Ngày hẹn xem
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                      Phòng hẹn xem
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                      Trạng thái
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="border border-gray-300 px-4 py-8 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400"
                      >
                        Chưa có lịch sử đặt phòng
                      </td>
                    </tr>
                  ) : (
                    bookings?.map((booking) => (
                      <tr
                        key={booking.id}
                        className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 dark:border-gray-600 dark:text-gray-100">
                          {formatDate(booking.date_created)}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 dark:border-gray-600 dark:text-gray-100">
                          {formatDate(booking.scheduled_date)}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 dark:border-gray-600 dark:text-gray-100">
                          <p>
                            {booking.room_id.building.name} -{" "}
                            {booking.room_id.number_room}
                          </p>
                          <p>
                            {booking.room_id.building.specific_address},{" "}
                            {booking.room_id.building.district.name},{" "}
                            {booking.room_id.building.city}
                          </p>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-sm dark:border-gray-600">
                          <div>
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(booking.status)}`}
                            >
                              {getStatusText(booking.status)}
                            </span>
                            {booking.status === "rejected" &&
                              booking.reject_reason && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                  {booking.reject_reason}
                                </p>
                              )}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center dark:border-gray-600">
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Bạn có chắc chắn muốn xóa lịch đặt phòng này?"
                                )
                              ) {
                                onDeleteBooking(booking.id);
                              }
                            }}
                            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="Xóa"
                          >
                            <FiTrash2 className="h-4 w-4" />
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
