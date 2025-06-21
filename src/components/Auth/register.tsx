import React, { useState } from "react";
import bgLogin from "../../assets/images/background-home.jpg";
import Input from "../Input/input";
import Button from "../Button/button";
import facebookIcon from "../../assets/images/fb.png";
import googleIcon from "../../assets/images/google.png";
import { CiLock, CiMail } from "react-icons/ci";
import { Controller, set, useForm } from "react-hook-form";
import directus from "@/utils/directus";
import { registerUser } from "@directus/sdk";
import { FiAlertTriangle } from "react-icons/fi";
interface FormInputs {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Register({ setIsLogin }) {
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const handleRegister = async (data: FormInputs) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", { message: "Mật khẩu không khớp!" });
        return;
      }

      const res = await directus.request(
        registerUser(data.email, data.password, {
          first_name: data.firstName,
          last_name: data.lastName,
        })
      );
      console.log("resRegister", res);

      setIsLogin(true);
    } catch (error: any) {
      console.log("errorRegister", error);
      if (error.response?.status === 403) {
        setError("email", { message: "Email đã tồn tại!" });
      }
      if (error.response?.status === 400) {
        setError("email", { message: "Email không hợp lệ!" });
      }
    }
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
        <p className="py-4 text-center text-xl font-semibold">Đăng kí</p>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="flex flex-col justify-between gap-8">
            <div className="flex justify-between">
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="rounded-full"
                    size="lg"
                    placeholder="Họ"
                  />
                )}
              />
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="rounded-full"
                    size="lg"
                    placeholder="Tên"
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  leftIcon={<CiMail className="h-5 w-5" />}
                  className="rounded-full"
                  size="lg"
                  placeholder="Địa chỉ email"
                />
              )}
            />
            {errors?.email?.message && (
              <span className="inline-flex items-center gap-2 text-left text-sm text-red-600">
                <FiAlertTriangle className="h-5 w-5" />
                {errors?.email?.message}
              </span>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  leftIcon={<CiLock className="h-5 w-5" />}
                  className="rounded-full"
                  size="lg"
                  placeholder="Mật khẩu"
                  type="password"
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  {...field}
                  leftIcon={<CiLock className="h-5 w-5" />}
                  className="rounded-full"
                  size="lg"
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                />
              )}
            />
          </div>
          {errors?.confirmPassword?.message && (
            <span className="inline-flex items-center gap-2 pt-2 text-left text-sm text-red-600">
              <FiAlertTriangle className="h-5 w-5" />
              {errors?.confirmPassword.message}
            </span>
          )}
          <Button
            type="submit"
            content="Đăng ký"
            className="mt-6 w-full rounded-full py-3"
          />
          <div className="flex justify-center pt-3">
            <p className="text-sm text-gray-600">Bạn đã có tài khoản?</p>
            <p
              className="pl-1 text-sm text-primary hover:cursor-pointer hover:underline hover:decoration-primary"
              onClick={() => setIsLogin(true)}
            >
              Đăng nhập
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
