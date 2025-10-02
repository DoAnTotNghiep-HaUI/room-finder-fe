import React, { useEffect, useState } from "react";
import bgLogin from "../../assets/images/background-home.jpg";
import Input from "../Input/input";
import { CiLock, CiMail } from "react-icons/ci";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import Button from "../Button/button";
import facebookIcon from "../../assets/images/fb.png";
import googleIcon from "../../assets/images/google.png";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "@/redux/auth/action";
import { AppDispatch } from "@/redux";
import { AnimatePresence, motion } from "framer-motion";
import { authentication, createDirectus } from "@directus/sdk";

type FormInputs = {
  email: string;
  password: string;
};

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsLogin?: (val: boolean) => void;
}

export default function Login({
  isOpen,
  onClose,
  setIsLogin,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    setError,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormInputs>();
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
    onClose();
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40 [perspective:800px] [transform-style:preserve-3d]"
            onClick={onClose}
          />

          <motion.div
            key="modal"
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="c fixed left-1/2 top-1/2 z-50 mx-auto flex min-h-[50%] flex-1 -translate-x-1/2 -translate-y-1/2 flex-col border border-transparent bg-white dark:border-neutral-800 dark:bg-neutral-950 sm:overflow-auto md:rounded-2xl lg:overflow-hidden"
            style={{
              minHeight: "400px",
            }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-gray-700"
              aria-label="Close modal"
              type="button"
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
                <p className="py-2 text-center text-xl font-semibold">
                  Đăng nhập
                </p>
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="flex flex-col gap-6">
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
                    <p className="text-sm text-gray-600">
                      Bạn chưa có tài khoản?
                    </p>
                    <p
                      className="pl-1 text-sm text-primary hover:cursor-pointer hover:underline hover:decoration-primary"
                      onClick={() => setIsLogin && setIsLogin(false)}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
