import React from "react";
import { FaFacebook } from "react-icons/fa";
import {
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaMagnifyingGlassLocation,
  FaPhoneVolume,
  FaPinterest,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between sm:mb-6 md:mb-0 md:flex-row md:items-start">
          <div className="mb-6 sm:mb-0">
            <div className="flex items-center md:mb-4">
              <img
                alt="Home Lengo logo"
                className="mr-2"
                height={40}
                src="https://storage.googleapis.com/a1aa/image/Irmw7y3lLtph0c-YrKx3DGon91t2fLAb3ANk_Rusf8g.jpg"
                width={40}
              />
              <div>
                <h1 className="text-xl font-bold text-white">Home Lengo</h1>
                <p className="text-sm">Searching homes</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <a
              className="hover:text-white"
              href="#"
            >
              <FaFacebook />
            </a>
            <a
              className="hover:text-white"
              href="#"
            >
              <FaLinkedin />
            </a>
            <a
              className="hover:text-white"
              href="#"
            >
              <FaTiktok />
            </a>
            <a
              className="hover:text-white"
              href="#"
            >
              <FaPinterest />
            </a>
            <a
              className="hover:text-white"
              href="#"
            >
              <FaInstagram />
            </a>
            <a
              className="hover:text-white"
              href="#"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
          <div>
            <p className="text-sm">
              Specializes in providing high-class tours for those in need.
              Contact Us
            </p>
            <div className="mt-4">
              <p className="mb-2 flex items-center">
                <FaLocationDot />
                101 E 129th St, East Chicago, IN 46312, US
              </p>
              <p className="mb-2 flex items-center">
                <FaPhoneVolume />
                1-333-345-6868
              </p>
              <p className="flex items-center">
                <MdEmail />
                themesflat@gmail.com
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-16">
            <div className="mb-6 md:mb-0">
              <h2 className="mb-4 font-bold text-white">Categories</h2>
              <ul>
                <li className="mb-2">
                  <a
                    className="hover:underline"
                    href="#"
                  >
                    Pricing Plans
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="hover:underline"
                    href="#"
                  >
                    Our Services
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="hover:underline"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h2 className="mb-4 font-bold text-white">Our Company</h2>
              <ul>
                <li className="mb-2">
                  <a
                    className="hover:underline"
                    href="#"
                  >
                    Property For Sale
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="hover:underline"
                    href="#"
                  >
                    Property For Rent
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="hover:underline"
                    href="#"
                  >
                    Property For Buy
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    href="#"
                  >
                    Our Agents
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="mb-4 font-bold text-white">Newsletter</h2>
            <p className="mb-4">
              Your Weekly/Monthly Dose of Knowledge and Inspiration
            </p>
            <div className="flex items-center rounded-full bg-gray-800 p-2">
              <input
                className="bg-transparent px-4 py-2 text-sm focus:outline-none"
                placeholder="Your email address"
                type="email"
              />
              <button className="rounded-full bg-blue-600 p-2 text-white">
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between md:flex-row">
          <div className="text-sm">©2024 Homelengo. All Rights Reserved.</div>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <a
              className="hover:underline"
              href="#"
            >
              Terms Of Services
            </a>
            <a
              className="hover:underline"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:underline"
              href="#"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
