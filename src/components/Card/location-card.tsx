import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { URL_IMAGE } from "@/constants";
import { useNavigate } from "react-router-dom";

function LocationCard({ districtData }: { districtData: any }) {
  // const [activeItem, setActiveItem] = useState(items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (carousel.current) {
      // Tính toán width chính xác hơn
      const scrollWidth = carousel.current.scrollWidth;
      const offsetWidth = carousel.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, [districtData]);
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
        className="flex will-change-transform"
      >
        {districtData?.slice(0, 8).map((itemData, index) => {
          return (
            <motion.div
              className="group relative min-h-[25rem] min-w-[20rem] p-2"
              key={index}
            >
              <img
                src={`${URL_IMAGE}/${
                  itemData?.photo?.id
                }/${itemData?.photo?.filename_download}`}
                alt="img"
                className="pointer-events-none relative h-full w-full rounded-3xl object-cover"
              />
              <div
                onClick={() => {
                  navigate(`/find-rental?district=${itemData?.id}`);
                }}
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white p-3 shadow-md hover:cursor-pointer"
              >
                <div>
                  {/* <p className="text-xs text-gray-500">
                    {itemData.} Property
                  </p> */}
                  <h3 className="text-lg">{itemData.name}</h3>
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
