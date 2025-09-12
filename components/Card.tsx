import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";

interface Post {
  _id: string;
  description: string;
  title: string;
  date: string;
  imageUrl: string;
}

const PostsGrid: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/post");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-[76%]  mx-auto  py-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="flex flex-row  items-center  gap-4 ">
            <div className="flex flex-col space-y-2 flex-1">
              <span className="uppercase text-[11px] tracking-wide font-medium text-gray-600 border border-gray-300 px-2 py-[2px] rounded w-fit">
                {post.description}
              </span>

              <h3 className="text-base font-semibold text-gray-900 leading-snug hover:text-blue-600 cursor-pointer">
                {post.title}
              </h3>

              <div className="flex items-center text-[13px] text-gray-500">
                <FaCalendarAlt size={14} className="mr-2" />
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="relative w-[120px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
