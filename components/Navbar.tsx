"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
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
    router.push(isLoggedIn ? "/create" : "/signin?redirect=create");
  };

  const isDashboard = pathname === "/dashboard";

  const menuItems = isDashboard
    ? [
        { label: "Home", href: "/" },
        { label: "Logout", href: "#", onClick: handleLogout },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Features", href: "/Features" },
        { label: "Categories", href: "/categories" },
        { label: "Contact", href: "/contact" },
      ];

  return (
    <nav className="flex h-auto flex-col w-full">
      <div className="flex items-center justify-between p-4 bg-[#183354]">
        <div className="hidden md:flex font-semibold text-white text-lg mr-auto space-x-7 px-44">
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
          <div className="flex items-center w-full px-44 justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search here..."
                className="px-3 py-1 focus:outline-none"
              />
              <FiSearch className="text-gray-600" />
            </div>
            <Link href="/">
              <Image src="/logo.png.png" alt="Logo" width={120} height={120} />
            </Link>
          </div>
        </div>
      )}

      <div className="hidden md:block bg-white py-4 shadow-md">
        <ul className="flex justify-center gap-10">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={
                  item.onClick ? item.onClick : () => router.push(item.href)
                }
                className={`text-sm font-medium tracking-wide ${
                  item.label === "Home"
                    ? "text-red-500"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
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
