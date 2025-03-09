// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
type Item = {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
};
const items: Item = [
  {
    id: 0,
    imgSrc:
      "https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/images/zQcHwVmucz1705979314.jpg",
    title: "ViDucThien",
    description: "aaa",
  },
  {
    id: 1,
    imgSrc:
      "https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/images/zQcHwVmucz1705979314.jpg",
    title: "ViDucThien",
    description: "aaa",
  },
  {
    id: 2,
    imgSrc:
      "https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/images/zQcHwVmucz1705979314.jpg",
    title: "ViDucThien",
    description: "aaa",
  },
  {
    id: 3,
    imgSrc:
      "https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/images/zQcHwVmucz1705979314.jpg",
    title: "ViDucThien",
    description: "aaa",
  },
  {
    id: 4,
    imgSrc:
      "https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/images/zQcHwVmucz1705979314.jpg",
    title: "ViDucThien",
    description: "aaa",
  },
  {
    id: 5,
    imgSrc:
      "https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/images/zQcHwVmucz1705979314.jpg",
    title: "ViDucThien",
    description: "aaa",
  },
  {
    id: 6,
    imgSrc:
      "https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/images/zQcHwVmucz1705979314.jpg",
    title: "ViDucThien",
    description: "aaa",
  },
  {
    id: 7,
    imgSrc:
      "https://rencity-bucket.s3.ap-southeast-1.amazonaws.com/images/images/zQcHwVmucz1705979314.jpg",
    title: "ViDucThien",
    description: "aaa",
  },
];
function LocationCard() {
  // const [activeItem, setActiveItem] = useState(items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

  return (
    <div className="w-full max-w-none overflow-hidden">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex cursor-grab will-change-transform active:cursor-grabbing"
      >
        {items.slice(0, 8)?.map((itemData, index) => {
          return (
            <motion.div className="group relative min-h-[25rem] min-w-[20rem] p-2">
              <img
                src={itemData.imgSrc}
                alt="img"
                className="pointer-events-none relative h-full w-full rounded-2xl object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white p-3 shadow-md">
                <div>
                  <p className="text-xs text-gray-500">
                    {itemData.title} Property
                  </p>
                  <h3 className="text-lg font-semibold">
                    {itemData.description}
                  </h3>
                </div>

                {/* Icon */}
                <motion.div className="rounded-full border border-solid border-black p-2 transition-all duration-300 group-hover:scale-125 group-hover:border-none group-hover:bg-primary group-hover:text-white">
                  <FaArrowRight size={18} />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default LocationCard;
