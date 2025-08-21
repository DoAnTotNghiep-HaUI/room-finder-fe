import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaHeart } from "react-icons/fa6";
import Button from "../Button/button";
import { useNavigate } from "react-router-dom";
export default function ServiceCard() {
  const navigate = useNavigate();
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
              <p className="text-2xl font-medium">Tìm phòng trọ dễ dàng</p>
              <span className="text-center">
                Khám phá hàng trăm phòng trọ phù hợp cho sinh viên và người lao
                động. Giá cả minh bạch, đầy đủ thông tin để bạn nhanh chóng chọn
                được chỗ ở ưng ý.
              </span>
              <Button
                onClick={() => navigate("/find-rental")}
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
              <p className="text-2xl font-medium">Đăng tin cho thuê phòng</p>
              <span className="text-center">
                Chủ trọ dễ dàng đăng tin cho thuê, quản lý phòng trọ của mình
                nhanh chóng và tiếp cận được nhiều người thuê hơn.
              </span>
              <Button
                onClick={() => navigate("/find-rental")}
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
              <p className="text-2xl font-medium">
                Thuê phòng an toàn – nhanh chóng
              </p>
              <span className="text-center">
                Kết nối trực tiếp với chủ nhà, không qua trung gian. Đặt lịch
                xem phòng, thương lượng giá và hoàn tất thuê phòng một cách tiện
                lợi, rõ ràng.
              </span>
              <Button
                onClick={() => navigate("/find-rental")}
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
