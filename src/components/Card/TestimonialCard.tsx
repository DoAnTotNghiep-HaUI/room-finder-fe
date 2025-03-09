import React from "react";
import { FaStar } from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

interface TestimonialProps {
  text: string;
  name: string;
  position: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  text,
  name,
  position,
  avatar,
}) => {
  return (
    <div className="mx-4 min-w-96 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {/* Icon Quote */}
      <BiSolidQuoteAltLeft className="text-4xl text-blue-500" />

      {/* Nội dung đánh giá */}
      <p className="mt-3 text-gray-700 dark:text-gray-300">{text}</p>

      {/* Thông tin người đánh giá */}
      <div className="mt-5 flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 rounded-full border border-gray-300"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-500">{position}</p>
          {/* Đánh giá 5 sao */}
          <div className="mt-1 flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
