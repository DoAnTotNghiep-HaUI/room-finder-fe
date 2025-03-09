import React, { useEffect, useState } from "react";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { UserProfile } from "./user-profile";
import { BiMenu, BiX } from "react-icons/bi";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="h-20"></div>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-md backdrop-blur-sm dark:bg-gray-900/95" : "bg-white dark:bg-gray-900"} ${isDarkMode ? "dark border-gray-700" : "border-gray-200"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="hidden flex-1 items-center justify-center px-8 md:flex">
              <Navigation />
            </div>
            <div className="flex items-center space-x-4">
              <UserProfile />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                onClick={toggleMobileMenu}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <BiX
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <BiMenu
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "visible max-h-screen opacity-100" : "invisible max-h-0 opacity-0"}`}
        >
          <div className="space-y-1 border-t bg-white px-2 pb-3 pt-2 dark:border-gray-700 dark:bg-gray-900 sm:px-3">
            <Navigation mobile />
          </div>
        </div>
      </header>
    </>
  );
};
