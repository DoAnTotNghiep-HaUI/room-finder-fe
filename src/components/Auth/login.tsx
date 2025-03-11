import React, { useState } from "react";
import bgLogin from "../../assets/images/background-home.jpg";
import Input from "../Input/input";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Button from "../Button/button";
import facebookIcon from "../../assets/images/fb.png";
import googleIcon from "../../assets/images/google.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex">
      <div className="hidden w-1/2 lg:block">
        <img
          src={bgLogin}
          alt=""
          className="h-full w-full rounded-l-xl"
        />
      </div>
      <div className="w-full px-4 lg:w-1/2">
        <p className="py-4 text-center text-xl font-semibold">Đăng nhập</p>
        <form>
          <div className="flex flex-col justify-between gap-8">
            <Input
              leftIcon={<FaRegCircleUser className="h-5 w-5" />}
              label="Tài khoản"
              className="rounded-full"
              size="lg"
            />
            <Input
              leftIcon={
                showPassword ? (
                  <IoEyeOutline
                    className="h-5 w-5"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="h-5 w-5"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              }
              label="Mật khẩu"
              className="rounded-full"
              size="lg"
            />
          </div>
          <p className="pt-2 text-right text-sm text-gray-600 hover:cursor-pointer hover:underline hover:decoration-primary">
            Quên mật khẩu?
          </p>
          <Button
            type="submit"
            content="Đăng nhập"
            className="mt-6 w-full rounded-full py-3"
          />
          <div className="flex justify-center pt-3">
            <p className="text-sm text-gray-600">Bạn chưa có tài khoản?</p>
            <p className="pl-1 text-sm text-primary hover:cursor-pointer hover:underline hover:decoration-primary">
              Đăng kí
            </p>
          </div>
          <p className="py-5 text-center text-sm font-semibold text-gray-300">
            Hoặc
          </p>
          <div className="flex justify-center gap-6 pb-4">
            <div className="flex w-1/2 items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3 hover:cursor-pointer hover:border-primary">
              <img
                src={googleIcon}
                alt="#"
                className="h-5 w-5"
              />
              <p>Google</p>
            </div>
            <div className="flex w-1/2 items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3 hover:cursor-pointer hover:border-primary">
              <img
                src={facebookIcon}
                alt="#"
                className="h-5 w-5"
              />
              <p>Facebook</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
