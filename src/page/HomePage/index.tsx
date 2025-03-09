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
const sampleRooms = [
  {
    id: "1",
    title: "Modern Studio Apartment Near Downtown",
    price: 1200,
    size: 35,
    capacity: 2,
    location: "123 Main Street, New York, NY 10001",
    building: "The Metropolitan Tower",
    type: "Studio Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    postedDate: "2 days ago",
    isVerified: true,
  },
  {
    id: "2",
    title: "Modern Studio Apartment Near Downtown",
    price: 1200,
    size: 35,
    capacity: 2,
    location: "123 Main Street, New York, NY 10001",
    building: "The Metropolitan Tower",
    type: "Studio Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    postedDate: "2 days ago",
    isVerified: true,
  },
  {
    id: "3",
    title: "Modern Studio Apartment Near Downtown",
    price: 1200,
    size: 35,
    capacity: 2,
    location: "123 Main Street, New York, NY 10001",
    building: "The Metropolitan Tower",
    type: "Studio Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    postedDate: "2 days ago",
    isVerified: true,
  },
  {
    id: "4",
    title: "Modern Studio Apartment Near Downtown",
    price: 1200,
    size: 35,
    capacity: 2,
    location: "123 Main Street, New York, NY 10001",
    building: "The Metropolitan Tower",
    type: "Studio Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    postedDate: "2 days ago",
    isVerified: true,
  },
  {
    id: "5",
    title: "Modern Studio Apartment Near Downtown",
    price: 1200,
    size: 35,
    capacity: 2,
    location: "123 Main Street, New York, NY 10001",
    building: "The Metropolitan Tower",
    type: "Studio Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    postedDate: "2 days ago",
    isVerified: true,
  },
  {
    id: "6",
    title: "Modern Studio Apartment Near Downtown",
    price: 1200,
    size: 35,
    capacity: 2,
    location: "123 Main Street, New York, NY 10001",
    building: "The Metropolitan Tower",
    type: "Studio Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    postedDate: "2 days ago",
    isVerified: true,
  },
];
const TAB_MENU = [
  {
    title: "Tab 1",
    value: "tab1",
  },
  {
    title: "Tab 2",
    value: "tab2",
  },
  {
    title: "Tab 3",
    value: "tab3",
  },
  {
    title: "Tab 4",
    value: "tab4",
  },
  {
    title: "Tab 5",
    value: "tab5",
  },
  {
    title: "Tab 6",
    value: "tab6",
  },
];
const blogPosts = [
  {
    id: "1",
    title: "10 Essential Tips for First-Time Renters",
    excerpt:
      "Navigate the rental market confidently with these proven tips for first-time renters...",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    author: {
      name: "Sarah Johnson",
      avatar: "https://placehold.co/100x100?text=SJ",
      role: "Housing Specialist",
    },
    category: "Rental Tips",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["First-time renters", "Tips", "Housing"],
  },
];
function HomePage() {
  const [assignedTo, setAssignedTo] = useState<string | number>("");

  const listRoomCard = useInViewEffect();
  const location = useInViewEffect();
  const topRoomCard = useInViewEffect();
  const blogCard = useInViewEffect();
  const totalPagesBlog = 10;
  const [currentPageBlog, setCurrentPageBlog] = useState(1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Assigned to: ${assignedTo}`);
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsScrolled(scrollRef.current.scrollLeft > 0);
      }
    };

    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
          <div className="bg-contrastText sm:rounded-md md:w-[600px] lg:mx-auto lg:w-auto lg:rounded-full lg:p-4">
            <form>
              <div className="space-y-4 lg:flex lg:items-center lg:justify-between lg:gap-1 lg:space-y-0">
                <div className="sm:auto grid grid-cols-1 gap-3 px-3 lg:w-2/3 lg:grid-cols-3 lg:divide-x">
                  <div className="w-full py-3 pl-3">
                    <Select
                      label="Loại phòng"
                      placeholder="Tất cả"
                      options={[
                        { value: "wade", label: "Wade Cooper" },
                        { value: "arlene", label: "Arlene Mccoy" },
                        { value: "devon", label: "Devon Webb" },
                        { value: "tom", label: "Tom Cook" },
                        { value: "tanya", label: "Tanya Fox" },
                      ]}
                      value={assignedTo}
                      onChange={(value) => setAssignedTo(value)}
                    />
                  </div>
                  <div className="w-full py-3 pl-5 pr-3">
                    <InputSearch
                      label="Địa chỉ"
                      placeholder="Tìm kiếm theo địa chỉ"
                      value={assignedTo}
                      onChange={(value) => setAssignedTo(value)}
                      icon={<FaLocationCrosshairs />}
                    />
                  </div>
                  <div className="w-full py-3 pl-5 pr-3">
                    <InputSearch
                      label="Từ khoá"
                      placeholder="Tìm kiếm theo từ khoá"
                      value={assignedTo}
                      onChange={(value) => setAssignedTo(value)}
                      icon={<IoKeyOutline />}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 sm:px-4 lg:w-1/3 lg:flex-row lg:px-2">
                  <div className="sm:w-full lg:w-1/2">
                    <ModalSearch />
                  </div>
                  <div className="m-4 flex justify-center sm:w-full lg:w-1/2">
                    <Button
                      size="l"
                      content="Tìm kiếm"
                      variant="primary"
                      icon={<IoIosSearch />}
                      className="w-full rounded-full lg:w-auto"
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
          <p className="pb-2 text-center text-lg text-primary">PHÒNG NỔI BẬT</p>
          <p className="text-center text-4xl">Đề Xuất Cho Bạn</p>
        </div>
        <div className="flex justify-center sm:px-4 lg:px-8">
          <Tabs
            tabs={TAB_MENU}
            url="/home"
            activeTabClassName="bg-[#1E88E5]"
            tabClassName="px-6 bg-gray-300 mx-2"
          />
        </div>

        <div
          ref={listRoomCard.ref}
          className="mx-auto grid gap-4 sm:max-w-[100%] sm:grid-cols-1 sm:px-4 md:grid-cols-2 sm:lg:grid-cols-3 lg:max-w-[70%] lg:grid-cols-3 lg:px-8"
        >
          {/* {[...Array(6).keys()].map((i) => ( */}
          {sampleRooms.map((room, i) => (
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
          className="w-full sm:px-4 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={location.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: "easeIn", delay: 0.25 }}
            // className="w-full"
          >
            <LocationCard />
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
          <p className="pb-2 text-center text-lg text-primary">
            PHÒNG HÀNG ĐẦU
          </p>
          <p className="text-center text-4xl">Căn Phòng Tốt Nhất</p>
        </div>

        <div
          ref={topRoomCard.ref}
          className="mx-auto grid gap-4 sm:max-w-[100%] sm:grid-cols-1 sm:px-4 md:grid-cols-2 sm:lg:grid-cols-3 lg:max-w-[70%] lg:grid-cols-3 lg:px-8"
        >
          {sampleRooms.map((room, i) => (
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
          className="flex flex-col items-center justify-center py-[64px]"
        >
          <div className="pb-6">
            <p className="pb-2 text-center text-lg text-primary">
              BÀI VIẾT MỚI NHẤT
            </p>
            <p className="text-center text-4xl">Từ bài viết của chúng tôi</p>
          </div>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 50 }}
            animate={blogCard.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: "linear" }}
          >
            {/* {[...Array(3).keys()].map((i) => (
              <BlogCard
                img="https://images.unsplash.com/photo-1565759732117-a48f0bedbbfd?q=80&w=1000&auto=format&fit=crop"
                blogCategory="Furniture"
                author="ViDucThien"
                createdDate="November 11, 2003"
                description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
            aliquid rerum tempora est nulla, facere error asperiores, voluptate
            saepe soluta dolores culpa fuga itaque. Provident quam quidem
            officia labore ullam?"
                title="Learn why UI/UX Important and How Implement well in your site."
                key={i}
              />
           

            ))} */}

            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                layout={"grid"}
              />
            ))}

            {/* Pagination */}
            <Pagination
              className="mt-8"
              currentPage={currentPageBlog}
              totalPages={10}
              onPageChange={setCurrentPageBlog}
            />
          </motion.div>
          <PaginationCustom
            totalPages={totalPagesBlog}
            currentPage={currentPageBlog}
            onPageChange={(page) => setCurrentPageBlog(page)}
            className="mt-4"
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
