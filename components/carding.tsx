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
        const res = await fetch("http://localhost:3000/api/explore");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="w-[90%] mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1F2B45]">Trending Places</h2>
        <button className="text-sm text-gray-600 flex items-center gap-1 hover:text-red-500 transition">
          VIEW ALL <span className="text-red-400">↗</span>
        </button>
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

            <div className="absolute bottom-4 uppercase left-4 right-4 text-white z-10">
              <span className="bg-red-500  text-xs font-medium px-2 py-1 rounded">
                {post.title}
              </span>
              <h3 className="mt-3 font-bold text-lg leading-snug">
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
    </section>
  );
};

export default TrendingPlaces;
