import React from "react";
import bgLogin from "../../assets/images/background-home.jpg";
import Input from "../Input/input";
import Button from "../Button/button";
import facebookIcon from "../../assets/images/fb.png";
import googleIcon from "../../assets/images/google.png";
import { CiLock, CiMail } from "react-icons/ci";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import directus from "@/utils/directus";
import { checkExitsUser } from "@/redux/auth/action";
import { createUser, registerUser } from "@directus/sdk";

interface FormInputs {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsLogin?: (val: boolean) => void;
}

export default function Register({
  isOpen,
  onClose,
  setIsLogin,
}: RegisterModalProps) {
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
      // if (await checkExitsUser(data.email)) {
      //   setError("email", { message: "Email đã tồn tại!" });
      //   return;
      // }
      await directus.request(
        createUser({
          email: data.email,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
          status: "active",
          role: "afee51b0-4e1c-4efa-a73b-bd9b7c6e2d26",
        })
      );
      setIsLogin && setIsLogin(true);
    } catch (error: any) {
      if (error.response?.status === 403) {
        setError("email", { message: "Email đã tồn tại!" });
      }
      if (error.response?.status === 400) {
        setError("email", { message: "Email không hợp lệ!" });
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="animate-fadeIn fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-lg transition-all duration-300 md:max-w-[60%] ${isOpen ? "animate-modalIn scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} `}
        style={{ minHeight: "400px" }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-gray-700"
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block md:w-1/2">
            <img
              src={bgLogin}
              alt=""
              className="h-full w-full rounded-l-xl object-cover"
            />
          </div>
          <div className="w-full px-4 py-6 md:w-1/2">
            <p className="py-2 text-center text-xl font-semibold">Đăng kí</p>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between gap-2">
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
                  onClick={() => setIsLogin && setIsLogin(true)}
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
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s;
          }
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translate(-50%, -50);}
            to { opacity: 1; transform: scale(1) translate(-50%, -50);}
          }
          .animate-modalIn {
            animation: modalIn 0.3s;
          }
        `}
      </style>
    </>
  );
}
