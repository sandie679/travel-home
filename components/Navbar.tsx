"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      label: "Home",
      href: "/",
      children: [
        { label: "Sub Home 1", href: "/sub-home-1" },
        { label: "Sub Home 2", href: "/sub-home-2" },
      ],
    },
    { label: "About Us", href: "/about" },
    {
      label: "Features",
      href: "/features",
      children: [
        { label: "Feature A", href: "/features/a" },
        { label: "Feature B", href: "/features/b" },
        { label: "Feature C", href: "/features/c" },
      ],
    },
    {
      label: "Categories",
      href: "/categories",
      children: [
        { label: "Category 1", href: "/categories/1" },
        { label: "Category 2", href: "/categories/2" },
        { label: "Category 3", href: "/categories/3" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex h-40 flex-col w-full">
      <div className="flex flex-row items-center justify-between p-4 bg-[#183354]">
        <div className="font-semibold text-white text-lg mr-auto space-x-7 px-44 cursor-pointer">
          <Link href="./">Forum</Link>
          <Link href="./">About</Link>
          <Link href="./">Faq's</Link>
          <Link href="./">Discover Places</Link>
        </div>
        <div className="space-x-4 flex justify-end items-center text-white text-lg px-44">
          <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between p-4 bg-white shadow-md">
        <div className="flex flex-row items-center w-full px-44">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search here..."
              className="px-3 py-1 focus:outline-none"
            />
            <FiSearch className="text-gray-600" />
          </div>
          <div className="flex items-center justify-center ml-64">
            <Link href="/">
              <Image src="/logo.png.png" alt="Logo" width={120} height={120} />
            </Link>
          </div>
          <div className="flex space-x-6 text-2xl ml-[410px]">
            <div className="relative">
              <FiHeart className="text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
            <div className="relative">
              <FiShoppingCart className="text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 shadow-md">
        <ul className="flex justify-center gap-10 relative">
          {menuItems.map(({ label, href, children }) => {
            const isOpen = openDropdown === label;
            const isActive = label === "Home";

            return (
              <li
                key={href}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`flex items-center text-sm font-medium tracking-wide ${
                    isActive
                      ? "text-red-500"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <Link href={href}>{label}</Link>
                  {children && (
                    <FiChevronDown
                      className={`ml-1 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </button>

                {children && isOpen && (
                  <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-md py-2 z-50">
                    {children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
