"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface Comment {
  _id: string;
  user: { fullName?: string; email?: string } | string;
  text: string;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: { fullName?: string; email?: string };
  likes?: number;
  dislikes?: number;
  comments?: Comment[];
  createdAt: string;
}

interface User {
  _id: string;
  fullName?: string;
  email?: string;
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!id) return;

  
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) setUser(data);
      })
      .catch(() => setUser(null));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!blog) return <div className="text-center py-10">Blog not found</div>;

  
  const requireAuth = () => {
    if (!user) {
      router.push(`/signin?redirect=/blogs/${id}`);
      return false;
    }
    return true;
  };

  
  const handleLike = async () => {
    if (!requireAuth()) return;

    try {
      const res = await fetch(`/api/blog/${id}/like`, { method: "POST" });
      const data = await res.json();
      setBlog((prev) =>
        prev
          ? { ...prev, likes: data.likesCount, dislikes: data.dislikesCount }
          : prev
      );
    } catch {
      alert("Failed to like post");
    }
  };

  
  const handleDislike = async () => {
    if (!requireAuth()) return;

    try {
      const res = await fetch(`/api/blog/${id}/dislike`, { method: "POST" });
      const data = await res.json();
      setBlog((prev) =>
        prev
          ? { ...prev, likes: data.likesCount, dislikes: data.dislikesCount }
          : prev
      );
    } catch {
      alert("Failed to dislike post");
    }
  };

  
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth() || !comment.trim()) return;

    try {
      const res = await fetch(`/api/blog/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment }),
      });
      const data = await res.json();
      setBlog((prev) => (prev ? { ...prev, comments: data.comments } : prev));
      setComment("");
    } catch {
      alert("Failed to post comment");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 md:px-6">
      {blog.imageUrl && (
        <div className="relative w-full h-80 md:h-96 mb-6 rounded-xl overflow-hidden shadow-sm">
          <Image
            fill
            src={blog.imageUrl}
            alt={blog.title}
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-3">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        By {blog.author?.fullName || blog.author?.email || "Unknown"} •{" "}
        {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
      </p>

      <p className="text-gray-700 mb-8 whitespace-pre-line">{blog.content}</p>

      
      <div className="flex gap-4 mb-8">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
        >
          <FaThumbsUp /> {blog.likes || 0}
        </button>
        <button
          onClick={handleDislike}
          className="flex items-center gap-1 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700"
        >
          <FaThumbsDown /> {blog.dislikes || 0}
        </button>
      </div>

      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Comments</h2>
        {blog.comments && blog.comments.length > 0 ? (
          <ul className="space-y-2">
            {blog.comments.map((c) => (
              <li key={c._id} className="bg-gray-100 rounded p-2">
                <span className="font-semibold">
                  {typeof c.user === "string"
                    ? c.user
                    : c.user?.fullName || c.user?.email || "Anonymous"}
                </span>
                : {c.text}
                <div className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No comments yet</div>
        )}
      </div>

      
      <form onSubmit={handleComment} className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Comment
        </button>
      </form>
    </div>
  );
}
