"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Post {
  _id: string;
  imageUrl: string;
}

export default function Zaira() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/zaira");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full px-4 py-8">
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white   overflow-hidden flex flex-col items-center"
          >
            <Image
              src={post.imageUrl}
              alt="Zaira"
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
