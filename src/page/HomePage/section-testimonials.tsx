import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import TestimonialCard from "@/components/Card/TestimonialCard";
import { useInViewEffect } from "@/hooks/useInviewEffect";
type Item = {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
};
const items: Item[] = [
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
export default function SectionTestimonials() {
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);
  const testimonials = useInViewEffect();
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);
  return (
    <div
      ref={testimonials.ref}
      className="my-8 bg-background lg:py-[128px]"
    >
      <div className="pb-6">
        <p className="pb-2 text-center text-lg text-primary">
          CẢM NHẬN CỦA KHÁCH HÀNG
        </p>
        <p className="text-center text-4xl">MỌI NGƯỜI NÓI GÌ VỀ CHÚNG TÔI?</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={testimonials.isInView ? { opacity: 1, y: 0 } : ""}
        transition={{ duration: 0.75, delay: 0.25, ease: "easeIn" }}
        className="w-full overflow-hidden"
      >
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
          {[...Array(20).keys()].map((i) => (
            <TestimonialCard
              key={i}
              avatar="aa"
              name="ViDucThien"
              position="User"
              text="Our seasoned team excels in real estate with years of successful market
navigation, offering informed decisions and optimal results."
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
