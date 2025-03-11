import React from "react";

import Button from "@/components/Button/button";
import { LuSlidersVertical } from "react-icons/lu";
import AdvanceSearch from "./login";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../Modal/animated-modal";
import { FaRegUser } from "react-icons/fa6";
import Login from "./login";

export default function ModalAuth() {
  return (
    <div className="sm:w-full lg:flex lg:justify-end">
      <Modal>
        <ModalTrigger className="group/modal-btn md:w-full lg:flex lg:items-center lg:justify-center">
          <div className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-3 text-white duration-300 ease-in-out hover:bg-primary hover:text-white">
            <p>Đăng nhập</p>
          </div>
        </ModalTrigger>
        <ModalBody className="min-h-fit p-0 md:p-0">
          <ModalContent className="p-0 md:p-0">
            <Login />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
