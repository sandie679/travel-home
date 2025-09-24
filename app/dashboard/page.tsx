"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiHome, FiPlus } from "react-icons/fi";

interface Article {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/api/auth/me");
      const user = await res.json();
      if (user?._id) {
        const res2 = await fetch(`/api/auth/articles?userId=${user._id}`, {
          cache: "no-store",
        });
        const data = await res2.json();
        setArticles(data);
      }
    };
    fetchArticles();
  }, []);

  const uploadImageToCloudinary = async (): Promise<string | null> => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env
        .NEXT_PUBLIC_CLOUDINARY_CLOUD!}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl: string | null = null;
    if (imageFile) finalImageUrl = await uploadImageToCloudinary();

    const res = await fetch("/api/auth/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl: finalImageUrl }),
    });

    if (res.ok) {
      const newArticle = await res.json();
      setArticles([newArticle, ...articles]);
      resetForm();
      setShowForm(false);
    }
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    setLoading(true);

    let finalImageUrl: string | undefined = editingArticle.imageUrl;
    if (imageFile) {
      const uploaded = await uploadImageToCloudinary();
      finalImageUrl = uploaded ?? undefined;
    }

    const res = await fetch(`/api/auth/articles/${editingArticle._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl: finalImageUrl }),
    });

    if (res.ok) {
      const updated = await res.json();
      setArticles(
        articles.map((a) => (a._id === editingArticle._id ? updated : a))
      );
      resetForm();
      setEditingArticle(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    const res = await fetch(`/api/auth/articles/${id}`, { method: "DELETE" });
    if (res.ok) setArticles(articles.filter((a) => a._id !== id));
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="bg-purple-100 p-2 rounded-full">
              <FiHome className="text-blue-500" />
            </span>
            Dashboard
          </h2>
          <nav className="flex flex-col gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white">
              <FiHome /> My Posts
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <FiPlus /> Create Post
            </button>
          </nav>
        </div>
      </div>

      <main className="flex-1 p-8">
        <div className="bg-blue-500 text-white rounded-2xl p-8 mb-6">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-white/80">
            Discover, share, and explore with Travel Home.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-500">Total Posts</p>
            <h2 className="text-2xl font-bold">{articles.length}</h2>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-500">This Month</p>
            <h2 className="text-2xl font-bold">
              {
                articles.filter(
                  (a) =>
                    new Date(a.createdAt).getMonth() === new Date().getMonth()
                ).length
              }
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <p className="text-gray-500 mb-2">Quick Action</p>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
            >
              Create New Post
            </button>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4"></div>
            <p>No posts yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-white rounded-xl shadow p-4 flex flex-col"
              >
                <h3 className="font-bold text-gray-800">{article.title}</h3>
                <p className="text-gray-600">{article.content}</p>
                {article.imageUrl && (
                  <Image
                    src={article.imageUrl}
                    alt="Article"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover rounded-lg mt-2"
                  />
                )}
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(article.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setEditingArticle(article);
                      setTitle(article.title);
                      setContent(article.content);
                      setImagePreview(article.imageUrl || null);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {(showForm || editingArticle) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingArticle(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              {editingArticle ? "Update Post" : "Create New Post"}
            </h2>
            <form
              onSubmit={editingArticle ? handleUpdate : handleCreate}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(e.target.files ? e.target.files[0] : null)
                }
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={600}
                  height={400}
                  className="w-full max-h-60 object-contain rounded-lg mt-2 border border-gray-200 shadow-sm"
                />
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white font-semibold py-3 rounded-lg "
              >
                {loading
                  ? "Saving..."
                  : editingArticle
                  ? "Update Post"
                  : "Create Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
