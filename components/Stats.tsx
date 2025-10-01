"use client";

export default function Stats() {
  const stats = [
    { value: "2M+", label: "Happy Travelers" },
    { value: "150+", label: "Countries" },
    { value: "50K+", label: "Destinations" },
    { value: "4.9", label: "Average Rating" },
  ];

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-[#0C192A] bg-clip-text text-transparent">
              {stat.value}
            </h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
