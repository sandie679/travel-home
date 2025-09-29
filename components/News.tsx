"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  date: string;
  readTime: string;
}

export default function News() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 w-[75%] mx-auto items-stretch h-full">
      <div className="lg:col-span-2 h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Weekly Best News</h2>
          <button className="text-sm border text-gray-400 hover:underline">
            View All <span>↗↗</span>
          </button>
        </div>
        <div className="flex items-start w-full mb-6">
          <div
            className="relative mr-2"
            style={{ width: "32px", height: "10px" }}
          >
            <span className="absolute left-0 top-0 h-full w-8 bg-[#F4796C] mb-1"></span>
          </div>
          <div className="flex flex-col flex-1 gap-1 justify-center">
            <span className="h-[1px] w-full bg-gray-300 rounded-full"></span>
            <span className="h-[1px] w-full bg-gray-300 rounded-full"></span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="rounded-lg  overflow-hidden bg-white"
            >
              <div className="relative w-full h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.content}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#F4796C] text-white text-xs px-2 py-1 rounded">
                  {post.title}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold mb-2">
                  {post.description}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex text-xs text-gray-400 gap-4">
                  <span>{new Date(post.date).toDateString()}</span>
                  <span>{post.readTime} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="bg-[#183354] text-white rounded-lg p-6 text-center self-start ">
            <h3 className="text-lg font-semibold mb-2">Daily Newsletter</h3>
            <p className="text-sm mb-4">
              Get All The Top Stories From Blogs To Tech News.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-2 rounded text-white mb-2"
            />
            <button className="bg-[#F4796C] hover:bg-red-600 text-white px-4 py-2 rounded w-full">
              Subscribe Now
            </button>
            <div className="flex items-center mt-3 text-left justify-center">
              <input type="checkbox" id="newsletter-terms" className="mr-2" />
              <label htmlFor="newsletter-terms" className="text-xs text-white">
                I agree to the{" "}
                <span className="underline">terms and conditions</span>.
              </label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Popular News</h3>
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-2 p-3 bg-white rounded ">
              <div className="w-full h-32 relative mb-2">
                <Image
                  src="https://res.cloudinary.com/dnnvicccf/image/upload/v1758886301/tr_hot_post.jpg_1_phjzmp.png"
                  alt="Popular News 1"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <button className="text-base mb-1 line-clamp-2 text-left w-fit border border-gray-400 rounded px-2 py-1 hover:text-blue-600 transition-colors">
                ADVENTURE
              </button>
              <p className="text-xs font-bold text-gray-600 mb-1 line-clamp-2">
                Inspiring Web Design And UX <br /> Showcases
              </p>
              <div className="flex text-xs text-gray-400 gap-3 mt-1">
                <span>September 26, 2025</span>
                <span>5 mins</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 p-3 bg-white rounded ">
              <button className="text-base mb-1 line-clamp-2 text-left w-fit border border-gray-400 rounded px-2 py-1 hover:text-blue-600 transition-colors">
                CULTURE
              </button>
              <p className="text-xs font-bold text-gray-600 mb-1 line-clamp-2">
                Getting Internationalization <br /> (i18n) Right With Remix And
              </p>
              <div className="flex text-xs text-gray-400 gap-3 mt-1">
                <span>September 25, 2025</span>
                <span>4 mins</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 p-3 bg-white rounded ">
              <button className="text-base mb-1 line-clamp-2 text-left w-fit border border-gray-400 rounded px-2 py-1 hover:text-blue-600 transition-colors">
                TRAVEL
              </button>
              <p className="text-xs font-bold text-gray-600 mb-1 line-clamp-2">
                A Step-By-Step Guide To Building <br /> Accessible Carousels
              </p>
              <div className="flex text-xs text-gray-400 gap-3 mt-1">
                <span>September 24, 2025</span>
                <span>3 mins</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden  mb-18">
          <Image
            src="https://res.cloudinary.com/dnnvicccf/image/upload/v1758886283/sidebar_img03.jpg_1_j6tkf4.png"
            alt="Ad"
            width={400}
            height={100}
            className="object-cover w-[70%]"
          />
        </div>
      </div>
    </div>
  );
}
