"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser, FaClock, FaCalendarAlt } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterest,
} from "react-icons/fa";

interface Post {
  _id: string;
  title: string;
  content: string;
  description: string;
  createdAt: string;
  author: { email: string };
  imageUrl: string;
  readTime?: string;
}

export default function Latest() {
  const socialButtons = [
    { name: "Facebook", icon: <FaFacebookF className="mr-2" /> },
    { name: "Twitter", icon: <FaTwitter className="mr-2" /> },
    { name: "Instagram", icon: <FaInstagram className="mr-2" /> },
    { name: "Youtube", icon: <FaYoutube className="mr-2" /> },
    { name: "LinkedIn", icon: <FaLinkedinIn className="mr-2" /> },
    { name: "Pinterest", icon: <FaPinterest className="mr-2" /> },
  ];

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/latest");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching latest posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const hasPosts = posts.length > 0;

  const formatDate = (date: string) => {
    const d = date ? new Date(date) : new Date();
    return isNaN(d.getTime()) ? new Date().toDateString() : d.toDateString();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 w-[75%] justify-center mx-auto">
      
      <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Explore Latest Places</h2>
          <button className="text-sm border border-gray-200 px-3 py-1 rounded hover:text-red-500">
            VIEW ALL <span className="text-red-500">↗↗</span>
          </button>
        </div>

        <div className="flex items-start w-full my-3">
          <div className="relative mr-2" style={{ width: "32px", height: "10px" }}>
            <span className="absolute left-0 top-0 h-full w-8 bg-[#F4796C] mb-1"></span>
          </div>
          <div className="flex flex-col flex-1 gap-1 justify-center">
            <span className="h-[1px] w-full bg-gray-300 rounded-full"></span>
            <span className="h-[1px] w-full bg-gray-300 rounded-full"></span>
          </div>
        </div>

        {hasPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
            
            {posts.slice(0, 2).map((p, idx) => (
              <div
                key={p._id}
                className={idx === 0 ? "col-start-1 row-start-1" : "col-start-1 row-start-2"}
              >
                <div className="relative">
                  <Image
                    src={p.imageUrl || "/images/placeholder.jpg"}
                    alt={p.description}
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-auto"
                  />
                  <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#F4796C] text-white px-2 py-1 text-xs rounded text-center">
                    {p.title || "General"}
                  </span>
                </div>
                <h3 className="font-semibold mt-3 text-sm">{p.description}</h3>
                <p className="text-xs text-gray-500 flex gap-2 mt-1 items-center">
                  <FaUser /> {p.author?.email || "Admin"} <FaCalendarAlt /> {formatDate(p.createdAt)}
                </p>
              </div>
            ))}

            
            {posts[2] && (
              <div className="col-span-1 md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-3">
                <div className="relative">
                  <Image
                    src={posts[2].imageUrl || "/images/placeholder.jpg"}
                    alt={posts[2].description}
                    width={500}
                    height={350}
                    className="rounded-lg w-full h-auto"
                  />
                  <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#F4796C] text-white px-3 py-1 text-sm rounded text-center">
                    {posts[2].title || "Featured"}
                  </span>
                </div>
                <h3 className="font-bold text-lg mt-3">{posts[2].description}</h3>
                <p className="text-xs text-gray-500 flex gap-3 mt-2 items-center">
                  <FaUser /> {posts[2].author?.email || "Admin"} <FaCalendarAlt />{" "}
                  {formatDate(posts[2].createdAt)} <FaClock /> {posts[2].readTime || "5 mins"}
                </p>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">{posts[2].content}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
            <p className="text-gray-500">Loading .....</p>
          </div>
        )}
      </div>

      
      <div className="flex flex-col items-center md:items-start">
        <div className="w-full bg-gray-100 rounded-t-xl flex flex-col items-center justify-center pb-4">
          <div className="rounded-full bg-white p-1 mt-5 shadow flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dnnvicccf/image/upload/v1758547870/avatar_img02.png_1_woikyh.png"
              alt="Author"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg text-center">Kelly Rosse</h3>
          <p className="text-gray-500 text-sm text-center">
            Myhen An Unknown Printer Took Ahen
            <br />
            Known Printer Toalley Etype
            <br />
            Specimen Book.
          </p>
          <div className="flex gap-3 mt-3 justify-center w-full">
            <span className="rounded-full bg-white p-2 shadow hover:text-blue-600 cursor-pointer transition">
              <FaFacebookF />
            </span>
            <span className="rounded-full bg-white p-2 shadow hover:text-blue-400 cursor-pointer transition">
              <FaTwitter />
            </span>
            <span className="rounded-full bg-white p-2 shadow hover:text-pink-600 cursor-pointer transition">
              <FaInstagram />
            </span>
            <span className="rounded-full bg-white p-2 shadow hover:text-red-600 cursor-pointer transition">
              <FaYoutube />
            </span>
          </div>
        </div>

        <h4 className="mt-6 font-semibold">Subscribe & Followers</h4>
        <div className="flex items-start w-full my-3">
          <span className="h-[8px] w-8 bg-[#F4796C] mr-2"></span>
          <div className="flex flex-col flex-1 gap-1">
            <span className="h-[1px] w-full bg-gray-300 rounded-full"></span>
            <span className="h-[1px] w-full bg-gray-300 rounded-full"></span>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 gap-3 mt-3 text-sm w-full max-w-[340px]">
            {socialButtons.map(({ name, icon }) => (
              <button
                key={name}
                className="px-3 py-2 rounded bg-gray-100 hover:bg-blue-600 hover:text-white transition w-full flex items-center justify-center"
              >
                {icon}
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
