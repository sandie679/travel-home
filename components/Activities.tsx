"use client"
import Image from "next/image";
import  {useEffect, useState} from "react";


interface Post {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
  }


 const Activities = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

    return (
        <section className="w-[76%] mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {posts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative w-full h-48">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{post.description}</p>
                    </div>
                </div>
            ))}
        </div>
        </section>
    );
};

export default Activities;

    
