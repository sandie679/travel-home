"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      const userCookie = document.cookie
        .split("; ")
        .find((c) => c.startsWith("userId="));
      setIsLoggedIn(!!userCookie);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleCreatePost = () => {
    if (!isLoggedIn) {
      router.push("/signin?redirect=create");
    } else {
      router.push("/create");
    }
  };

  type MenuItem = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
    onClick?: () => void;
  };

  const menuItems: MenuItem[] = [
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
      ],
    },
    {
      label: "Categories",
      href: "/categories",
      children: [
        { label: "Category 1", href: "/categories/1" },
        { label: "Category 2", href: "/categories/2" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  const dashboardMenu: MenuItem[] = [
    { label: "Home", href: "/" },
    { label: "Logout", href: "#", onClick: handleLogout },
  ];

  const isDashboard = pathname === "/dashboard";

  return (
    <nav className="flex h-auto flex-col w-full">
      <div className="flex flex-row items-center justify-between p-4 bg-[#183354]">
        <div className="hidden md:flex font-semibold text-white text-lg mr-auto space-x-7 px-44 cursor-pointer">
          {!isDashboard && (
            <>
              <Link href="/about">About</Link>
              <Link href="/discover">Discover Places</Link>
            </>
          )}
        </div>

        {!isDashboard && (
          <div className="hidden md:flex gap-4 px-4 items-center">
            <button
              onClick={handleCreatePost}
              className="bg-blue-500 text-white px-4 py-1 rounded font-semibold hover:bg-green-700 transition"
            >
              Create Post
            </button>
            <Link href="/signup">
              <button className="bg-white text-[#183354] px-4 py-1 rounded font-semibold hover:bg-gray-200 transition">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        <div className="hidden md:flex space-x-4 justify-end items-center text-white text-lg px-44">
          {!isDashboard && (
            <>
              <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            </>
          )}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {!isDashboard && (
        <div className="md:hidden flex flex-col gap-2 px-4 py-3 bg-[#183354]">
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition"
          >
            Create Post
          </button>
          <Link href="/signup">
            <button className="bg-white text-[#183354] px-4 py-2 rounded font-semibold hover:bg-gray-200 transition">
              Sign Up
            </button>
          </Link>
        </div>
      )}

      {!isDashboard && (
        <div className="hidden md:flex flex-col items-center justify-between p-4 bg-white shadow-md">
          <div className="flex flex-row items-center w-full px-44">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search here..."
                className="px-3 py-1 focus:outline-none"
              />
              <FiSearch className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center ml-64 min-w-[100px]">
              <Link href="/">
                <Image
                  src="/logo.png.png"
                  alt="Logo"
                  width={120}
                  height={120}
                />
              </Link>
            </div>
            <div className="flex space-x-6 text-2xl ml-[280px]">
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
      )}

      <div className="hidden md:block bg-white py-4 shadow-md">
        <ul className="flex justify-center gap-10 relative">
          {(isDashboard ? dashboardMenu : menuItems).map((item) => {
            const isOpen = openDropdown === item.label;
            const isActive = item.label === "Home";
            return (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={
                    item.onClick ? item.onClick : () => router.push(item.href)
                  }
                  className={`flex items-center text-sm font-medium tracking-wide ${
                    isActive
                      ? "text-red-500"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <FiChevronDown
                      className={`ml-1 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </button>

                {item.children && isOpen && (
                  <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-md py-2 z-50">
                    {item.children.map((child) => (
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

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <ul className="flex flex-col gap-4">
            {(isDashboard ? dashboardMenu : menuItems).map((item) => (
              <li key={item.label}>
                <button
                  onClick={
                    item.onClick ? item.onClick : () => router.push(item.href)
                  }
                  className="block text-left text-slate-700 hover:text-red-500 font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
