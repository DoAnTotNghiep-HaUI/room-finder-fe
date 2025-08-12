import type React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiCalendar, FiClock } from "react-icons/fi";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; time: string }) => void;
}

interface FormData {
  date: string;
  time: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split("T")[0];

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const submitHandler = (data: FormData) => {
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-gray-700"
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Đặt lịch hẹn xem phòng
        </h2>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-6"
        >
          {/* Date input */}
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiCalendar className="text-gray-400" />
              </div>
              <input
                id="date"
                type="date"
                className={`block w-full border py-3 pl-10 pr-3 ${
                  errors.date
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } rounded-md placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2`}
                min={today}
                {...register("date", {
                  required: "Please select a date",
                  validate: (value) =>
                    new Date(value) >= new Date(today) ||
                    "Cannot select a past date",
                })}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          {/* Time input */}
          <div className="space-y-2">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Select Time
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiClock className="text-gray-400" />
              </div>
              <input
                id="time"
                type="time"
                className={`block w-full border py-3 pl-10 pr-3 ${
                  errors.time
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } rounded-md placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2`}
                {...register("time", { required: "Please select a time" })}
              />
            </div>
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 sm:w-1/2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/2"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
