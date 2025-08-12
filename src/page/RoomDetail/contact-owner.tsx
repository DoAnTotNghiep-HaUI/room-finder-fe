import React from "react";
import { BiHeart, BiPhone } from "react-icons/bi";
export const ContactOwner = ({ roomData }: { roomData: any }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 md:hidden">
      <div className="flex items-center gap-4">
        <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Schedule Visit
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
          <BiPhone className="h-5 w-5" />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
          <BiHeart className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
