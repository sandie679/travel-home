"use client";

import { FaGlobeAmericas, FaMapMarkedAlt, FaRegHeart, FaUsers } from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaGlobeAmericas size={28} />,
    title: "Global Destinations",
    text: "Discover unique places around the world that inspire and amaze.",
  },
  {
    id: 2,
    icon: <FaMapMarkedAlt size={28} />,
    title: "Tailored Tours",
    text: "Personalized itineraries designed to fit every travel style.",
  },
  {
    id: 3,
    icon: <FaRegHeart size={28} />,
    title: "Comfort & Care",
    text: "Enjoy thoughtful stays and seamless support wherever you go.",
  },
  {
    id: 4,
    icon: <FaUsers size={28} />,
    title: "Community",
    text: "Connect with travelers and share stories, tips, and experiences.",
  },
];

export default function FeatureCards() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-[#F4796C] mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-[#0C192A] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
