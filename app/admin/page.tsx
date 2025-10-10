"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiHome,
  FiSettings,
  FiLogOut,
  FiUsers,
  FiFileText,
  FiCalendar,
  FiBarChart2,
  FiMenu,
  FiX,
  FiActivity,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

interface User {
  _id: string;
  email: string;
  fullName?: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: {
    _id: string;
    name?: string;
    email?: string;
  };
  createdAt: string;
}

interface Activity {
  _id: string;
  type: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  const [postsThisWeek, setPostsThisWeek] = useState(0);
  const [postsThisMonth, setPostsThisMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postsRes = await fetch("/api/admin/posts");
        const postsData = await postsRes.json();
        setPosts(Array.isArray(postsData) ? postsData : []);

        const usersRes = await fetch("/api/admin/users");
        const usersData = await usersRes.json();
        setUsers(Array.isArray(usersData) ? usersData : []);

        try {
          const actRes = await fetch("/api/admin/activities");
          const actData = await actRes.json();
          setActivities(Array.isArray(actData) ? actData : []);
        } catch {
          setActivities([]);
        }

        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        setPostsThisWeek(
          postsData.filter((p: Post) => new Date(p.createdAt) >= startOfWeek)
            .length
        );
        setPostsThisMonth(
          postsData.filter((p: Post) => new Date(p.createdAt) >= startOfMonth)
            .length
        );
      } catch {
        setPosts([]);
        setUsers([]);
        setActivities([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
    if (res.ok) setPosts(posts.filter((p) => p._id !== id));
  };

  const handleUpdate = async (
    postId: string,
    title: string,
    content: string,
    imageUrl?: string
  ) => {
    const res = await fetch(`/api/admin/posts?id=${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPosts(posts.map((p) => (p._id === postId ? updated : p)));
    }
  };

  const adminAvatar = "/logo.png.png";

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-gradient-to-b from-[#04364A] to-[#176B87] text-white flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <Image src="/logo.png.png" alt="Logo" width={36} height={36} />
          <span className="font-bold text-lg tracking-wide">
            TravelHome Admin
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-4 py-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition duration-200"
          >
            <FiHome className="text-teal-300" /> Home
          </Link>
          <a
            href="#posts"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition duration-200"
          >
            <FiFileText className="text-teal-300" /> Posts
          </a>
          <a
            href="#users"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition duration-200"
          >
            <FiUsers className="text-teal-300" /> Users
          </a>
          <a
            href="#settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition duration-200"
          >
            <FiSettings className="text-teal-300" /> Settings
          </a>
        </nav>

        <div className="px-6 py-4 border-t border-white/10 text-xs text-gray-300">
          &copy; {new Date().getFullYear()} Travel Home Admin
        </div>
      </aside>

      <button
        className="lg:hidden fixed top-4 left-4 z-40 bg-[#04364A] text-white p-2 rounded-md shadow"
        onClick={() => setSidebarOpen((v) => !v)}
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      <main className="flex-1 ml-0 lg:ml-6 px-4 sm:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#04364A] mb-1">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={adminAvatar}
              alt="Admin"
              width={42}
              height={42}
              className="rounded-full border-2 border-[#176B87]"
            />
            <span className="font-semibold text-[#04364A]">Admin</span>
            <button
              className="bg-[#176B87] hover:bg-[#1A8CA0] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
              onClick={() => {
                if (confirm("Are you sure you want to logout?")) {
                  fetch("/api/auth/logout", { method: "POST" }).then(() =>
                    window.location.replace("/")
                  );
                }
              }}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Posts",
              value: posts.length,
              icon: <FiFileText className="text-teal-500 text-2xl" />,
              border: "border-teal-500",
              bg: "bg-teal-50",
            },
            {
              label: "Posts This Week",
              value: postsThisWeek,
              icon: <FiCalendar className="text-blue-500 text-2xl" />,
              border: "border-blue-500",
              bg: "bg-blue-50",
            },
            {
              label: "Posts This Month",
              value: postsThisMonth,
              icon: <FiBarChart2 className="text-purple-500 text-2xl" />,
              border: "border-purple-500",
              bg: "bg-purple-50",
            },
            {
              label: "Total Users",
              value: users.length,
              icon: <FiUsers className="text-pink-500 text-2xl" />,
              border: "border-pink-500",
              bg: "bg-pink-50",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 ${stat.border} hover:shadow-lg transition`}
            >
              <span className={`${stat.bg} p-3 rounded-full`}>{stat.icon}</span>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h2 className="text-xl font-bold text-[#04364A]">
                  {stat.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            id="posts"
            className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 overflow-x-auto"
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#04364A]">
              All Posts
            </h2>
            {loading ? (
              <div className="text-center py-10 text-gray-400">Loading...</div>
            ) : posts.length > 0 ? (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#EAF4F4] text-[#04364A]">
                    <th className="py-2 px-3 text-left">Image</th>
                    <th className="py-2 px-3 text-left">Title</th>
                    <th className="py-2 px-3 text-left">Author</th>
                    <th className="py-2 px-3 text-left">Date</th>
                    <th className="py-2 px-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post._id}
                      className="border-b last:border-none hover:bg-[#f7fafc] transition"
                    >
                      <td className="py-2 px-3">
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            width={60}
                            height={40}
                            className="rounded object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="py-2 px-3 font-semibold">{post.title}</td>
                      <td className="py-2 px-3">
                        {post.author?.name || post.author?.email || "Unknown"}
                      </td>
                      <td className="py-2 px-3">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-2">
                          <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
                            onClick={() => {
                              setEditingPost(post);
                              setEditTitle(post.title);
                              setEditContent(post.content);
                              setEditImageUrl(post.imageUrl || "");
                            }}
                          >
                            <FiEdit2 /> Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                            onClick={() => handleDelete(post._id)}
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10 text-gray-400">
                No posts found.
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#04364A]">
              <FiActivity /> Recent Activities
            </h2>
            {activities.length === 0 ? (
              <div className="text-gray-400 text-sm">No recent activities.</div>
            ) : (
              <ul className="space-y-3">
                {activities.slice(0, 6).map((act) => (
                  <li
                    key={act._id}
                    className="flex items-start gap-2 hover:bg-gray-50 p-2 rounded-md transition"
                  >
                    <span className="mt-1 text-teal-500">
                      <FiActivity />
                    </span>
                    <div>
                      <div className="text-gray-700 text-sm">{act.message}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(act.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div
          id="users"
          className="bg-white rounded-xl shadow-md p-6 overflow-x-auto"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#04364A]">
            All Users
          </h2>
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No users found.
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#EAF4F4] text-[#04364A]">
                  <th className="py-2 px-3 text-left">Name</th>
                  <th className="py-2 px-3 text-left">Email</th>
                  <th className="py-2 px-3 text-left">User ID</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b last:border-none hover:bg-[#f7fafc] transition"
                  >
                    <td className="py-2 px-3">{user.fullName || "Unknown"}</td>
                    <td className="py-2 px-3">{user.email}</td>
                    <td className="py-2 px-3">{user._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {editingPost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setEditingPost(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-[#04364A]">
              Edit Post
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleUpdate(
                  editingPost._id,
                  editTitle,
                  editContent,
                  editImageUrl
                );
                setEditingPost(null);
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                required
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                required
              />
              <input
                type="text"
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Image URL"
              />
              <button
                type="submit"
                className="bg-[#176B87] hover:bg-[#1A8CA0] text-white font-semibold py-3 rounded-lg"
              >
                Update Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
