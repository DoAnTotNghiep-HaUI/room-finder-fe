import React from "react";
import logo from "../../../public/logo.svg";
export const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <img
        className="object-cover sm:h-24 md:h-32"
        src={logo}
        alt="Room Rental"
      />
    </div>
  );
};
