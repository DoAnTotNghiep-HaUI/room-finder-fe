import Footer from "@/components/Footer/footer";
import { Header } from "@/components/Header/header";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/utils/utils";
import React, { ReactNode, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [scrolled, setScrolled] = useState(false);
  // const { pathname } = useLocation();
  // const { propertyId } = useParams();
  // console.log("pathname", pathname);

  // const isFindRental = () => {
  //   if (
  //     pathname === "/find-rental" ||
  //     pathname === `/propertyId/${propertyId}`
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 1) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <div>
      {/* <Navbar
          className={cn(
            "sm:collapse lg:visible",
            scrolled
              ? "rounded-0 top-0 max-w-full shadow-xl duration-300 ease-out"
              : "duration-300 ease-out",
            isFindRental() ? "static top-0 max-w-full shadow-xl" : ""
          )}
        /> */}
      <Header />

      <main>{children}</main>
      <footer className="bg-gray-900 text-gray-300">
        <Footer />
      </footer>
    </div>
  );
};
export default Layout;
