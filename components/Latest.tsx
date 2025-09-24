"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser, FaClock, FaCalendarAlt } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

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
          <button className="text-sm text-blue-600 border px-3 py-1 rounded hover:bg-blue-600 hover:text-white">
            View All →
          </button>
        </div>
        {hasPosts ? (
          <div className="grid grid-cols-3 grid-rows-2 gap-6">
            {posts.slice(0, 2).map((p, idx) => (
              <div
                key={p._id}
                className={
                  idx === 0
                    ? "col-start-1 row-start-1"
                    : "col-start-1 row-start-2"
                }
              >
                <div className="relative">
                  <Image
                    src={p.imageUrl || "/images/placeholder.jpg"}
                    alt={p.description}
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                  <span className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    {p.title || "General"}
                  </span>
                </div>
                <h3 className="font-semibold mt-3 text-sm">{p.description}</h3>
                <p className="text-xs text-gray-500 flex gap-2 mt-1 items-center">
                  <FaUser /> {p.author?.email || "Admin"} <FaCalendarAlt />{" "}
                  {formatDate(p.createdAt)}
                </p>
              </div>
            ))}

            {posts[2] && (
              <div className="col-start-2 col-end-4 row-start-1 row-end-3">
                <div className="relative">
                  <Image
                    src={posts[2].imageUrl || "/images/placeholder.jpg"}
                    alt={posts[2].description}
                    width={500}
                    height={350}
                    className="rounded-lg"
                  />
                  <span className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
                    {posts[2].title || "Featured"}
                  </span>
                </div>
                <h3 className="font-bold text-lg mt-3">
                  {posts[2].description}
                </h3>
                <p className="text-xs text-gray-500 flex gap-3 mt-2 items-center">
                  <FaUser /> {posts[2].author?.email || "Unknown"}{" "}
                  <FaCalendarAlt /> {formatDate(posts[2].createdAt)} <FaClock />{" "}
                  {posts[2].readTime || "5 mins"}
                </p>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {posts[2].content}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
            <p className="text-gray-500">
              No posts yet. Your latest posts will appear here once you add
              them.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center md:items-start">
        <Image
          src="https://res.cloudinary.com/dnnvicccf/image/upload/v1758547870/avatar_img02.png_1_woikyh.png"
          alt="Author"
          width={120}
          height={120}
          className="rounded-full mb-3"
        />
        <h3 className="font-bold text-lg">Kelly Rosse</h3>
        <p className="text-gray-500 text-sm text-center md:text-left">
          Myhen An Unknown Printer Took Ahen Known Printer Toalley Etype
          Specimen Book.
        </p>
        <div className="flex gap-3 mt-3">
          <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          <FaInstagram className="hover:text-pink-600 cursor-pointer" />
          <FaYoutube className="hover:text-red-600 cursor-pointer" />
        </div>
        <h4 className="mt-6 font-semibold">Subscribe & Followers</h4>
        <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
          {[
            "Facebook",
            "Twitter",
            "Instagram",
            "Youtube",
            "LinkedIn",
            "Pinterest",
          ].map((s) => (
            <button
              key={s}
              className="border px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
