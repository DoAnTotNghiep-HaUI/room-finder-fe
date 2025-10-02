import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import { getBookingsByUser } from "@/redux/booking/action";
import { deleteItem } from "@directus/sdk";
import directus from "@/utils/directus";
import { toast } from "react-toastify";

interface BookingListProps {
  tenant_id: string;
}

export const BookingList: React.FC<BookingListProps> = ({ tenant_id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading, error } = useSelector(
    (state: AppState) => state.booking
  );

  useEffect(() => {
    if (tenant_id) {
      dispatch(getBookingsByUser(tenant_id));
    }
  }, [tenant_id, dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await directus.request(deleteItem("booking", id));
      toast.success("Xoá lịch thành công!");
      dispatch(getBookingsByUser(tenant_id));
    } catch (err) {
      toast.error("Xoá lịch thất bại!");
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Lịch đã đặt</h2>
      {bookings.length === 0 ? (
        <div className="text-gray-500">Bạn chưa có lịch đặt nào.</div>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking: any) => (
            <li
              key={booking.id}
              className="flex flex-col rounded-md border p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="font-medium text-gray-900">
                  Phòng: {booking.room_id?.title || booking.room_id}
                </div>
                <div className="text-gray-700">
                  Ngày:{" "}
                  {booking.scheduled_date
                    ? new Date(booking.scheduled_date).toLocaleDateString()
                    : ""}
                  {" - "}
                  Giờ:{" "}
                  {booking.scheduled_date
                    ? new Date(booking.scheduled_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
                <div className="text-sm text-gray-500">
                  Trạng thái: {booking.status}
                </div>
              </div>
              <button
                onClick={() => handleDelete(booking.id)}
                className="mt-3 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 md:mt-0"
              >
                Xoá
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
