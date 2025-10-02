"use client";
import Feature from "@/components/Feature";
import Stats from "@/components/Stats";

export default function About() {
  return (
    <section className="mt-[2px] overflow-x-hidden">
      
      <div className="relative min-h-[300px] md:min-h-[420px] flex justify-center">
        <div className="relative w-full md:w-[76%]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dnnvicccf/image/upload/v1759303620/pexels-camerashy-2114206_rlihj0.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-[#0A1729] opacity-40"></div>
          </div>

          <div className="relative container mx-auto text-center h-full flex flex-col items-center justify-center pt-20 sm:pt-28 md:pt-36 lg:pt-44 py-10">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              YOUR JOURNEY STARTS HERE
            </h2>

            <p className="text-white  sm:text-lg md:text-xl lg:text-2xl mt-4 mb-10 sm:mb-16 md:mb-20 ">
              Connecting wanderers with extraordinary places and unforgettable
              <br  />
              experiences since 2019
            </p>
          </div>
        </div>
      </div>

      
      <div className="w-[90%] sm:w-[80%] md:w-[76%] mx-auto flex flex-col justify-center items-center mt-16 sm:mt-20">
        <h1 className="text-[#0C192A] text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Our Story
        </h1>
        <p className="text-gray-600 text-center mt-5 text-sm sm:text-base md:text-lg max-w-3xl">
          At Travel-Home, we believe every journey is more than a destination —
          it is an experience that stays with you forever. Our mission is to
          connect travelers with authentic adventures, inspiring cultures, and
          the comfort of feeling at home wherever you go. Whether you are
          exploring hidden gems, discovering vibrant cities, or seeking peaceful
          escapes, we provide guidance and stories that turn travel into lasting
          memories. With us, your journey does not just start here — it becomes
          part of who you are.
        </p>
      </div>

      
      <div className="w-full bg-[#E8F1F1] py-10 sm:py-12 md:py-14 mt-16 sm:mt-20">
        <div className="w-[90%] sm:w-[80%] md:w-[76%] mx-auto">
          <div className="flex justify-center items-center flex-col text-center">
            <h1 className="font-bold text-[#0C192A] text-2xl sm:text-3xl md:text-4xl">
              What Drives Us
            </h1>
            <Feature />
          </div>
        </div>
      </div>

    
      <Stats />
    </section>
  );
}
