import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
interface SocialShareProps {
  vertical?: boolean;
}
export const SocialShare: React.FC<SocialShareProps> = ({
  vertical = false,
}) => {
  const shareButtons = [
    {
      icon: <FaFacebook className="h-5 w-5" />,
      label: "Share on Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: <FaTwitter className="h-5 w-5" />,
      label: "Share on Twitter",
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      icon: <FaLinkedin className="h-5 w-5" />,
      label: "Share on LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      icon: <IoMail className="h-5 w-5" />,
      label: "Share via Email",
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} gap-2`}>
      {shareButtons.map((button, index) => (
        <button
          key={index}
          className={`${button.color} ${vertical ? "p-3" : "px-4 py-2"} flex items-center gap-2 rounded-full text-white transition-colors`}
          aria-label={button.label}
        >
          {button.icon}
          {!vertical && (
            <span className="text-sm">{button.label.split(" ")[2]}</span>
          )}
        </button>
      ))}
    </div>
  );
};
