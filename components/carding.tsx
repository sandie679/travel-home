"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

interface Post {
  _id: string;
  description: string;
  title: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

const TrendingPlaces: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/explore");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="w-full bg-[#E8F1F1] py-8">
      <div className="w-[76%] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#1F2B45]">Trending Places</h2>
          <button className="text-sm text-gray-600 flex items-center gap-1 hover:text-red-500 transition">
            VIEW ALL <span className="text-red-400">↗</span>
          </button>
        </div>
        <div className="flex items-start w-full mb-6">
          <div
            className="relative mr-2"
            style={{ width: "32px", height: "10px" }}
          >
            <span className="absolute left-0 top-0 h-full w-8 bg-red-500 mb-1"></span>
          </div>
          <div className="flex flex-col flex-1 gap-1 justify-center">
            <span className="h-[1px] w-full bg-gray-300 rounded-full"></span>
            <span className="h-[1px] w-full bg-gray-300 rounded-full"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute left-0 right-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent z-0 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex flex-col justify-end h-[70%]">
                <span className="bg-[#F4796C] text-xs font-medium px-2 py-1 rounded min-h-[32px] flex items-center uppercase w-fit">
                  {post.title}
                </span>
                <h3 className="mt-2 font-medium text-[13px] leading-snug text-white opacity-90 line-clamp-2 min-h-[38px]">
                  {post.description}
                </h3>
                <div className="flex items-center text-xs mt-2 gap-4 text-gray-200">
                  <span className="flex items-center gap-1">
                    <FaRegCalendarAlt />
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegClock /> {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPlaces;
