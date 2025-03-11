import React from "react";
import { BiX } from "react-icons/bi";
import { FaFacebookMessenger } from "react-icons/fa";
interface ChatOptionsProps {
  onSelect: (option: "direct" | "zalo") => void;
  onClose: () => void;
}
export const ChatOptions: React.FC<ChatOptionsProps> = ({
  onSelect,
  onClose,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-lg bg-white shadow-xl sm:w-96">
      <div className="flex items-center justify-between rounded-t-lg bg-blue-600 px-4 py-3 text-white">
        <h3 className="font-medium">Choose Chat Option</h3>
        <button
          className="text-white hover:text-blue-200 focus:outline-none"
          onClick={onClose}
        >
          <BiX className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4 p-6">
        <button
          className="flex w-full items-center rounded-lg border p-4 transition-colors hover:bg-blue-50"
          onClick={() => onSelect("direct")}
        >
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <FaFacebookMessenger className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-left">
            <h4 className="font-medium text-gray-900">Chat Directly</h4>
            <p className="text-sm text-gray-500">
              Message the landlord through our platform
            </p>
          </div>
        </button>
        <button
          className="flex w-full items-center rounded-lg border p-4 transition-colors hover:bg-green-50"
          onClick={() => onSelect("zalo")}
        >
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="h-6 w-6 text-green-600"
            >
              <path
                d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z"
                fill="#0068ff"
              />
              <path
                d="M33.5 22.5h-7v-3h7v3zm-7 8.5h-4v-11h4v11zm-4-8.5h-7v-3h7v3z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-left">
            <h4 className="font-medium text-gray-900">Chat via Zalo</h4>
            <p className="text-sm text-gray-500">
              Open conversation in Zalo app
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
