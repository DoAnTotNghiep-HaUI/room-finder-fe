import { cn } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { useLocation, useNavigate } from "react-router-dom";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const isFindRental = () => {
    if (pathname === "/find-rental") {
      return true;
    }
    return false;
  };
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
    <div
      className={cn(
        "fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl rounded-full",
        className
      )}
    >
      <Menu
        setActive={setActive}
        className={cn(
          scrolled ? "rounded-none" : "",
          isFindRental() ? "rounded-none" : ""
        )}
      >
        {/* <MenuItem
          setActive={setActive}
          active={active}
          item="Find Rental"
          onClick={() => navigate("/find-rental")}
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem> */}
        <div
          onClick={() => navigate("/")}
          className="text-black hover:cursor-pointer"
        >
          Home
        </div>
        <div
          onClick={() => navigate("/find-rental")}
          className="text-black hover:cursor-pointer"
        >
          Find Rental
        </div>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Services"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Products"
        >
          <div className="grid grid-cols-2 gap-10 p-4 text-sm">
            <ProductItem
              title="Algochurn"
              to="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              to="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              to="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              to="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Pricing"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
