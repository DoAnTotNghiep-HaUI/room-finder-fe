import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaHeart } from "react-icons/fa6";
import Button from "../Button/button";
export default function ServiceCard() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:w-[80%] lg:grid-cols-3">
      <div className="group mx-auto rounded-2xl hover:shadow-xl">
        <div className="rounded-2xl border p-8 group-hover:border-white">
          <div className="relative flex h-56 w-full justify-center">
            <img
              src="https://homelengohtml.vercel.app/images/service/home-1.png"
              alt="shoes"
              className="rounded-2xl object-cover group-hover:animate-flip"
            />
          </div>
          <article className="space-y-2 p-2 pb-3 text-black">
            <div className="flex flex-col items-center justify-center space-y-6 pt-6">
              <p className="text-2xl font-medium">Buy A New Home</p>
              <span className="text-center">
                Discover your dream home effortlessly. Explore diverse
                properties and expert guidance for a seamless buying experience.
              </span>
              <Button
                variant="outline"
                content="Tìm Hiểu Thêm"
                className="rounded-full group-hover:bg-primary group-hover:px-8 group-hover:text-white"
                icon={<FaArrowRight />}
              />
            </div>
          </article>
        </div>
      </div>
      <div className="group mx-auto rounded-2xl hover:shadow-xl">
        <div className="rounded-2xl border p-8 group-hover:border-white">
          <div className="relative flex h-56 w-full justify-center">
            <img
              src="https://homelengohtml.vercel.app/images/service/home-2.png"
              alt="shoes"
              className="rounded-2xl object-cover group-hover:animate-flip"
            />
          </div>
          <article className="space-y-2 p-2 pb-3 text-black">
            <div className="flex flex-col items-center justify-center space-y-6 pt-6">
              <p className="text-2xl font-medium">Sell a home</p>
              <span className="text-center">
                Sell confidently with expert guidance and effective strategies,
                showcasing your property's best features for a successful sale.
              </span>
              <Button
                variant="outline"
                content="Tìm Hiểu Thêm"
                className="rounded-full group-hover:bg-primary group-hover:px-8 group-hover:text-white"
                icon={<FaArrowRight />}
              />
            </div>
          </article>
        </div>
      </div>
      <div className="group mx-auto gap-4 rounded-2xl hover:shadow-xl md:col-span-2 md:w-[50%] lg:col-span-1 lg:w-full">
        <div className="rounded-2xl border p-8 group-hover:border-white">
          <div className="relative flex h-56 w-full justify-center">
            <img
              src="https://homelengohtml.vercel.app/images/service/home-3.png"
              alt="shoes"
              className="rounded-2xl object-cover group-hover:animate-flip"
            />
          </div>
          <article className="space-y-2 p-2 pb-3 text-black">
            <div className="flex flex-col items-center justify-center space-y-6 pt-6">
              <p className="text-2xl font-medium">Rent a home</p>
              <span className="text-center">
                Discover your perfect rental effortlessly. Explore a diverse
                variety of listings tailored precisely to suit your unique
                lifestyle needs.
              </span>
              <Button
                variant="outline"
                content="Tìm Hiểu Thêm"
                className="rounded-full group-hover:bg-primary group-hover:px-8 group-hover:text-white"
                icon={<FaArrowRight />}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
