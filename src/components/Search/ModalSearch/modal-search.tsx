import React from "react";

import Button from "@/components/Button/button";
import { LuSlidersVertical } from "react-icons/lu";
import AdvanceSearch from "./advance-search";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/Modal/animated-modal";

export default function ModalSearch() {
  return (
    <div className="sm:w-full lg:flex lg:w-72 lg:justify-end">
      <Modal>
        <ModalTrigger className="group/modal-btn md:w-full lg:flex lg:items-center lg:justify-center">
          <div className="flex items-center justify-center gap-2 rounded-full border border-primary py-3 font-semibold text-primary duration-300 ease-in-out hover:bg-primary hover:text-white lg:px-10 xl:px-20">
            <p>Bộ lọc</p>
            <span>
              <LuSlidersVertical />
            </span>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <AdvanceSearch />
          </ModalContent>
          <ModalFooter className="gap-4">
            <Button
              variant="primary"
              content="Lưu"
            />
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
