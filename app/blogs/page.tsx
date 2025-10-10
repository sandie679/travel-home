"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: { fullName?: string; email?: string };
  createdAt: string;
  likes?: string[];
  dislikes?: string[];
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">
        All Blog Posts
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blogs/${blog._id}`}
            className="group block bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300"
          >

            <div className="relative w-full h-56 sm:h-60 md:h-64 bg-gray-100 overflow-hidden">
              {blog.imageUrl ? (
                <Image
                  fill
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>

          
            <div className="p-5 flex flex-col h-[230px]">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {blog.title}
              </h2>
              <div className="text-gray-500 text-xs mb-3">
                By {blog.author?.fullName || blog.author?.email || "Unknown"} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 flex-1">
                {blog.content}
              </p>

            
              <div className="flex items-center gap-4 mt-3">
                <span className="text-blue-500">👍 {blog.likes?.length || 0}</span>
                <span className="text-red-500">👎 {blog.dislikes?.length || 0}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
