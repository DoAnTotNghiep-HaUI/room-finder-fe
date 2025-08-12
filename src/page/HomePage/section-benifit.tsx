import React from "react";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { FaRegHandshake } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useInViewEffect } from "@/hooks/useInviewEffect";

const features = [
  {
    id: 1,
    icon: <RiVerifiedBadgeLine size={50} />,
    title: "Chuyên môn được chứng minh",
    description:
      "Đội ngũ dày dạn của chúng tôi vượt trội trong bất động sản với nhiều năm điều hướng thị trường thành công, đưa ra các quyết định sáng suốt và kết quả tối ưu.",
  },
  {
    id: 2,
    icon: <LiaBusinessTimeSolid size={50} />,
    title: "Tiết kiệm thời gian của bạn",
    description:
      "Chúng tôi sẽ giúp bạn tìm kiếm được căn phòng ưng ý, ngay cả khi bạn không có thời gian trực tiếp đi xem.",
  },
  {
    id: 3,
    icon: <FaRegHandshake size={50} />,
    title: "Quan hệ đối tác minh bạch",
    description:
      "Tính minh bạch là chìa khoá trong các mối quan hệ khách hàng của chúng tôi. Chúng tôi ưu tiên sự rõ ràng, thúc đẩy niềm tin và độ tin cậy.",
  },
];

export default function SectionBenifit() {
  const benifit = useInViewEffect();

  return (
    <div
      ref={benifit.ref}
      className="mx-2 my-[64px] grid rounded-3xl bg-background sm:grid-cols-1 lg:grid-cols-2"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={benifit.isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: "easeIn", delay: 0.25 }}
      >
        <img
          src="https://homelengohtml.vercel.app/images/banner/img-w-text1.jpg"
          alt="benifit"
          className="h-full w-full object-cover sm:rounded-t-3xl lg:rounded-s-3xl"
        />
      </motion.div>

      <div className="sm:p-4 lg:rounded-e-3xl lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={benifit.isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: "easeIn", delay: 0.25 }}
        >
          <p className="pb-2 text-primary sm:text-sm lg:text-lg">
            Lợi ích của chúng tôi
          </p>
          <p className="sm:text-2xl lg:text-4xl">
            Tại sao lại chọn RoomFinder?
          </p>
          <span className="pt-6 text-gray-500 sm:text-sm lg:text-lg">
            Our seasoned team excels in real estate with years of successful
            market navigation, offering informed decisions and optimal results.
          </span>
        </motion.div>

        <div className="pt-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={benifit.isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="pt-6"
            >
              <div className="flex h-[160px] items-center gap-6 rounded-xl bg-contrastText transition duration-300 hover:scale-110 sm:max-w-[100%] sm:p-2 lg:max-w-[70%] lg:p-6">
                <span className="inline-flex items-center text-primary">
                  {feature.icon}
                </span>
                <div>
                  <p className="pb-2 font-medium sm:text-lg lg:text-2xl">
                    {feature.title}
                  </p>
                  <span className="lg:text text-gray-500 sm:text-xs">
                    {feature.description}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
