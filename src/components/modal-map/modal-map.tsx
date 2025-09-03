import React, { useEffect, useState } from "react";

import Button from "@/components/Button/button";
import { LuSlidersVertical } from "react-icons/lu";
import Checkbox from "@/components/Input/checkbox";
import Select from "@/components/Input/select";
import { DualRangeSlider } from "@/components/Input/slider";
import { URL_IMAGE } from "@/constants";
import { AppDispatch, AppState } from "@/redux";
import { getListAmenities } from "@/redux/amenities/action";
import { getListFurnitures } from "@/redux/furnitures/action";
import { IAmenity, IFurniture, IRoom } from "@/types/room";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  ModalTrigger,
  useModal,
} from "@/components/Modal/animated-modal";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { set } from "date-fns";
import RoomMap from "@/test/RoomMap";
import { FaMapMarkedAlt } from "react-icons/fa";
interface ChildProps {
  roomList: IRoom[];
}
export default function ModalRoomMap({ roomList }: ChildProps) {
  return (
    <div className="sm:w-full lg:flex lg:w-72 lg:justify-end">
      <Modal>
        <ModalTrigger className="group/modal-btn md:w-full lg:flex lg:items-center lg:justify-center">
          <Button
            content="Xem theo bản đồ"
            icon={<FaMapMarkedAlt />}
          />
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <RoomMap rooms={roomList} />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
