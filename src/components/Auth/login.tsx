import React, { useEffect, useState } from "react";
import bgLogin from "../../assets/images/background-home.jpg";
import Input from "../Input/input";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Button from "../Button/button";
import facebookIcon from "../../assets/images/fb.png";
import googleIcon from "../../assets/images/google.png";
import { Controller, useForm } from "react-hook-form";
import directus from "@/utils/directus";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FiAlertTriangle } from "react-icons/fi";

import { useModal } from "../Modal/animated-modal";
import { authentication, createDirectus } from "@directus/sdk";
// import {
//   setExpires,
//   setExpiresAt,
//   setRefreshToken,
//   setToken,
// } from "@/redux/auth/store";
import { useDispatch } from "react-redux";
import { getUser, login } from "@/redux/auth/action";
import { AppDispatch } from "@/redux";
type FormInputs = {
  email: string;
  password: string;
};
export default function Login({ setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const { setOpen } = useModal();
  useEffect(() => {
    async function refreshEndpoint() {
      const client1 = createDirectus(import.meta.env.VITE_API_ENDPOINT).with(
        authentication("session", { credentials: "include" })
      );
      await client1.refresh();
      console.log("client: ", client1.getToken());
      const client = createDirectus(import.meta.env.VITE_API_ENDPOINT).with(
        authentication("cookie", { credentials: "include" })
      );

      await client.refresh();
      console.log("client: ", client.getToken());
    }
    refreshEndpoint();
  }, []);
  const handleLogin = async (data: FormInputs) => {
    dispatch(login({ email: data.email, password: data.password }));
    // try {
    //   const res = await directus.login(data.email, data.password);

    //   if (res) {
    //     const token = await directus.getToken();
    //     dispatch(setToken(token));
    //     dispatch(setRefreshToken(res.refresh_token));
    //     dispatch(setExpires(res.expires));
    //     dispatch(setExpiresAt(new Date(res.expires_at)));
    //     await dispatch(getUser());
    //     setOpen(false);
    //   }
    //   console.log(data);
    // } catch (error) {
    //   if (error.response.status === 401 || error.response.status === 400) {
    //     setError("password", { message: "Email hoặc mật khẩu không đúng!" });
    //   }
    // }
  };
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
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col justify-between gap-8">
            <Controller
              rules={{ required: "Email không được để trống" }}
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  leftIcon={<CiMail className="h-5 w-5" />}
                  label="Email"
                  className="rounded-full"
                  size="lg"
                />
              )}
            />
            <Controller
              rules={{ required: "Mật khẩu không được để trống" }}
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  leftIcon={<CiLock className="h-5 w-5" />}
                  label="Mật khẩu"
                  className="rounded-full"
                  size="lg"
                  type={showPassword ? "text" : "password"}
                />
              )}
            />
            {/* {errors?.email?.message} */}
          </div>
          <div className="flex items-center justify-between pt-2">
            {errors?.password?.message && (
              <span className="inline-flex items-center gap-2 text-left text-sm text-red-600">
                <FiAlertTriangle className="h-5 w-5" />
                {errors?.password?.message}
              </span>
            )}
            <p className="text-right text-sm text-gray-600 hover:cursor-pointer hover:underline hover:decoration-primary">
              Quên mật khẩu?
            </p>
          </div>
          <Button
            type="submit"
            content="Đăng nhập"
            className="mt-6 w-full rounded-full py-3"
          />
          <div className="flex justify-center pt-3">
            <p className="text-sm text-gray-600">Bạn chưa có tài khoản?</p>
            <p
              className="pl-1 text-sm text-primary hover:cursor-pointer hover:underline hover:decoration-primary"
              onClick={() => setIsLogin(false)}
            >
              Đăng kí
            </p>
          </div>
          <p className="py-5 text-center text-sm font-semibold text-gray-400">
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
