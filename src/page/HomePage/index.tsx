import { useEffect, useRef, useState } from "react";
import bgImage from "../../assets/images/background-home.jpg";
import Select from "@/components/Input/select";
import { IoKeyOutline } from "react-icons/io5";
import { FaArrowRight, FaLocationCrosshairs } from "react-icons/fa6";
import Button from "@/components/Button/button";
import { IoIosSearch } from "react-icons/io";
import ModalSearch from "@/components/Search/ModalSearch/modal-search";
import { Tabs } from "@/components/Tab/tab";
import { motion } from "framer-motion";
import LocationCard from "@/components/Card/location-card";
import ServiceCard from "@/components/Card/service-card";
import SectionBenifit from "./section-benifit";
import SectionTestimonials from "./section-testimonials";
import { useInViewEffect } from "@/hooks/useInviewEffect";
import BlogCard from "@/components/Card/blog-card";
import PaginationCustom from "@/components/Pagination/pagination-custom";
import InputSearch from "@/components/Search/input-search";
import { Pagination } from "@/components/Pagination/pagination";
import { RoomCard } from "@/components/Card/room-card";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import {
  getListRoom,
  getRoomCheapPrice,
  getRoomNewPost,
} from "@/redux/room/action";
import RoomMap from "@/test/RoomMap";
import { getListRoomType } from "@/redux/room-type/action";
import { IRoomType } from "@/types/room";
import { BiChevronDown, BiMapPin } from "react-icons/bi";
import Input from "@/components/Input/input";
import { getListDistrict } from "@/redux/districts/action";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getListBlog } from "@/redux/blog/action";
import { IBlog } from "@/types/blog";
import { useForm } from "react-hook-form";
import { setSearchParam } from "@/redux/room/store";
import { getDistrict } from "@/utils/utils";

const cities = [
  { name: "Hà Nội", value: "hanoi" },
  // { name: "Đà Nẵng", value: "danang" },
  // { name: "Hồ Chí Minh", value: "hochiminh" },
];
function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchParam, roomNewPost, roomCheapPrice } = useSelector(
    (state: AppState) => state.room
  );
  const { search } = useLocation();
  const roomTypeId = new URLSearchParams(search).get("roomType") || "";
  const { roomTypeList } = useSelector((state: AppState) => state.roomType);
  const { blogList } = useSelector((state: AppState) => state.blog);

  const { districtList } = useSelector((state: AppState) => state.districts);
  const [currentPosition, setCurrentPosition] = useState(null);
  // const [selectedCity, setSelectedCity] = useState("Đà Nẵng");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [districts, setDistricts] = useState([]);

  const listRoomCard = useInViewEffect();
  const location = useInViewEffect();
  const topRoomCard = useInViewEffect();
  const blogCard = useInViewEffect();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm();
  const selectedCity = watch("city") || "Hà Nội";
  const selectedRoomType = watch("roomType") || "";
  const selectedDistrict = watch("district") || "";

  // const distric
  const handleFormSubmit = (data) => {
    dispatch(setSearchParam(data));
    const queryParams = new URLSearchParams();
    queryParams.append("city", selectedCity);
    if (data.roomType) queryParams.append("roomType", data.roomType);
    if (data.district) queryParams.append("district", data.district);
    if (data.price)
      queryParams.append("priceRange", `[${data.price[0]}, ${data.price[1]}]`);
    if (data.area)
      queryParams.append("areaRange", `[${data.area[0]}, ${data.area[1]}]`);
    if (data.amenities) queryParams.append("amenities", data.amenities);
    if (data.furnitures) queryParams.append("furnitures", data.furnitures);

    navigate(`/find-rental?${queryParams.toString()}`);
    console.log("data form", data);

    // if (data.district) queryParams.append("district", data.district);
  };
  // navigator.geolocation.getCurrentPosition(async (position) => {
  //   console.log("Latitude:", position.coords.latitude);
  //   console.log("Longitude:", position.coords.longitude);
  //   const url = `https://nominatim.openstreetmap.org/reverse?lat=${21.064689100271035}&lon=${105.70300471685805}&format=json`;

  //   const res = await fetch(url);
  //   const data = await res.json();
  //   // console.log(data.address);

  //   setCurrentPosition(data.display_name);
  // });
  // const roomPropose = () => {
  //   const response = roomList?.filter((room) => room?.building.district === currentPosition?.)
  // }

  const TAB_MENU = roomTypeList?.map((type: IRoomType) => ({
    title: type?.name,
    value: type?.id,
  }));
  useEffect(() => {
    dispatch(getListRoom(searchParam));
    dispatch(getListRoomType());
    dispatch(getListDistrict());
    dispatch(getRoomCheapPrice());
    dispatch(getListBlog());
  }, []);
  useEffect(() => {
    if (roomTypeId) {
      dispatch(getRoomNewPost(roomTypeId));
    } else {
      if (roomTypeList?.length > 0)
        dispatch(getRoomNewPost(roomTypeList[0]?.id));
    }
  }, [roomTypeList, roomTypeId]);

  const roomType = roomTypeList?.map((rt: IRoomType) => ({
    value: rt.id,
    label: rt.name,
  }));
  const top3NewBlog = blogList?.slice(0, 3);
  useEffect(() => {
    getDistrict().then((data) => {
      const result = data?.districts?.map((district) => ({
        value: district?.codename,
        label: district?.name,
      }));
      setDistricts(result);
    });
  }, []);
  console.log("districts", districts);

  const districtOptions = districtList?.map((district) => ({
    value: district?.id,
    label: district?.name,
  }));
  const districtData = districtList?.filter((district) => district?.photo);
  console.log("disstricOption", districtOptions);

  return (
    <>
      <div className="relative">
        <img
          src={bgImage}
          className="h-screen w-full object-cover"
          alt="#"
        />

        <div className="absolute inset-0 bg-[#161e2d] bg-opacity-30"></div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-3 p-5 sm:mb-20 lg:mb-48">
            <p className="text-center font-title font-bold text-contrastText shadow-xl sm:text-4xl lg:text-7xl">
              Tìm Kiếm Căn Phòng Mơ Ước Của Bạn
            </p>

            <p className="line-clamp-3 text-center text-contrastText sm:max-w-3xl sm:text-sm lg:max-w-5xl lg:text-lg">
              Hãy để chúng tôi đồng hành cùng bạn trong hành trình tìm kiếm
              không gian sống lý tưởng, đáp ứng đầy đủ nhu cầu của bạn. Chúng
              tôi sẽ giúp bạn tìm kiếm phòng trọ lý tưởng, hãy cùng trao đổi để
              tìm không gian sống phù hợp với bạn!
            </p>
          </div>
          <div className="mx-auto bg-contrastText sm:rounded-md md:w-[600px] lg:w-[1400px] lg:rounded-full lg:p-4">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="space-y-4 lg:flex lg:items-center lg:justify-between lg:gap-1 lg:space-y-0">
                <div className="flex-cols w-full gap-3 px-3 lg:flex lg:divide-x">
                  <div className="w-full py-3 pl-3 lg:w-1/3">
                    <Select
                      label="Loại phòng"
                      placeholder="Tất cả"
                      options={roomType}
                      value={selectedRoomType}
                      onChange={(value) => setValue("roomType", value)}
                      multiple={true}
                    />
                  </div>
                  <div className="w-full py-3 pl-5 pr-3 lg:w-2/3">
                    <div className="lg:w-4xl mx-auto flex items-center gap-2 rounded-full border border-[#1E88E5] border-primary bg-gray-50 p-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen(!isDropdownOpen);
                          }}
                          className="flex items-center gap-2 rounded-full border border-[#1E88E5]/20 bg-[#1E88E5]/10 px-4 py-2 text-[#1E88E5] transition-colors duration-200 hover:bg-[#1E88E5]/20 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30"
                        >
                          <BiMapPin className="h-4 w-4 text-[#1E88E5]" />
                          <span className="font-medium">{selectedCity}</span>
                          <BiChevronDown
                            className={`h-4 w-4 text-[#1E88E5] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                            {cities.map((city) => (
                              <button
                                key={city.value}
                                onClick={() => {
                                  // setSelectedCity(city.name);
                                  setIsDropdownOpen(false);
                                }}
                                type="button"
                                className="w-full px-4 py-2 text-left transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg hover:bg-[#1E88E5]/10 focus:bg-[#1E88E5]/10 focus:outline-none"
                              >
                                {city.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Search Input - already using pure Tailwind */}
                      <div className="relative flex-1">
                        <Select
                          label="Quận/Huyện"
                          placeholder="Tất cả"
                          options={districts}
                          value={selectedDistrict}
                          onChange={(value) => setValue("district", value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 sm:px-4 lg:flex-row lg:px-2">
                  <div className="sm:w-full lg:w-1/2">
                    <ModalSearch
                      setValue={setValue}
                      watch={watch}
                    />
                  </div>
                  <div className="m-4 flex justify-center sm:w-full lg:w-1/2">
                    <Button
                      size="l"
                      content="Tìm kiếm"
                      variant="primary"
                      icon={<IoIosSearch />}
                      className="w-full rounded-full lg:w-auto"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto py-[64px]">
        <div className="pb-6">
          <p className="pb-2 text-center text-lg text-primary">
            PHÒNG MỚI ĐĂNG
          </p>
          <p className="text-center text-4xl">Đề Xuất Cho Bạn</p>
        </div>
        <div className="flex justify-center sm:px-4 lg:px-8">
          {TAB_MENU && TAB_MENU.length > 0 && (
            <Tabs
              tabs={TAB_MENU}
              url="/home"
              activeTabClassName="bg-[#1E88E5]"
              tabClassName="px-6 bg-gray-300 mx-2"
            />
          )}
        </div>

        <div
          ref={listRoomCard.ref}
          className="mx-auto grid gap-4 sm:max-w-[100%] sm:grid-cols-1 sm:px-4 md:grid-cols-2 sm:lg:grid-cols-3 lg:max-w-[70%] lg:grid-cols-3 lg:px-8"
        >
          {/* {[...Array(6).keys()].map((i) => ( */}
          {roomNewPost?.map((room, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                listRoomCard.isInView ? { opacity: 1, scale: 1, y: 0 } : {}
              }
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <RoomCard
                key={room.id}
                layout="vertical"
                room={room}
                onCardClick={() => console.log("Clicked room:", room.id)}
              />
            </motion.div>
          ))}
          {/* ))} */}
        </div>
        <div className="flex justify-center p-8">
          <Button
            variant="primary"
            content="Xem tất cả các phòng"
            icon={<FaArrowRight />}
            className="rounded-full p-4"
          />
        </div>
        <div
          ref={location.ref}
          className="mt-4 w-full sm:px-4 lg:px-8"
        >
          <p className="pb-4 text-center text-2xl font-semibold text-primary">
            KHÁM PHÁ
          </p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={location.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: "easeIn", delay: 0.25 }}
            // className="w-full"
          >
            <LocationCard districtData={districtData} />
          </motion.div>
        </div>
        <div className="flex flex-col items-center justify-center py-[64px]">
          <div className="pb-6">
            <p className="pb-2 text-center text-lg text-primary">
              Dịch vụ của chúng tôi
            </p>

            <p className="text-center text-4xl">Chúng tôi làm gì?</p>
          </div>
          <div className="flex justify-center sm:px-4 lg:px-8">
            <ServiceCard />
          </div>
        </div>

        <SectionBenifit />

        <div className="pb-6">
          <p className="pb-2 text-center text-lg text-primary">PHÒNG GIÁ RẺ</p>
          <p className="text-center text-4xl">Phù hợp với tất cả mọi người</p>
        </div>

        <div
          ref={topRoomCard.ref}
          className="mx-auto grid h-full gap-4 sm:max-w-[100%] sm:grid-cols-1 sm:px-4 md:grid-cols-2 sm:lg:grid-cols-3 lg:max-w-[70%] lg:grid-cols-3 lg:px-8"
        >
          {roomCheapPrice?.map((room, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                topRoomCard.isInView ? { opacity: 1, scale: 1, y: 0 } : {}
              }
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <RoomCard
                key={room.id}
                layout="vertical"
                room={room}
                onCardClick={() => console.log("Clicked room:", room.id)}
              />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center p-8">
          <Button
            variant="primary"
            content="Xem tất cả các phòng"
            icon={<FaArrowRight />}
            className="rounded-full p-4"
          />
        </div>

        <SectionTestimonials />
        <div
          ref={blogCard.ref}
          className="=flex flex-col items-center justify-center py-[64px]"
        >
          <div className="pb-6">
            <p className="pb-2 text-center text-lg text-primary">
              BÀI VIẾT MỚI NHẤT
            </p>
            <p className="text-center text-4xl">Từ bài viết của chúng tôi</p>
          </div>
          <motion.div
            className="mx-auto grid h-full grid-cols-1 gap-4 gap-6 sm:max-w-[100%] sm:grid-cols-1 sm:px-4 md:grid-cols-2 sm:lg:grid-cols-3 lg:max-w-[70%] lg:grid-cols-3 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={blogCard.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: "linear" }}
          >
            {top3NewBlog?.map((post: IBlog) => (
              <BlogCard
                key={post.id}
                post={post}
                layout={"grid"}
              />
            ))}

            {/* Pagination */}
            {/* <Pagination
              className="mt-8"
              currentPage={currentPageBlog}
              totalPages={10}
              onPageChange={setCurrentPageBlog}
            /> */}
          </motion.div>
          {/* <PaginationCustom
            totalPages={totalPagesBlog}
            currentPage={currentPageBlog}
            onPageChange={(page) => setCurrentPageBlog(page)}
            className="mt-4"
          /> */}
        </div>
      </div>
    </>
  );
}

export default HomePage;
