"use client";
import Destination from "@/components/Destination";
import Carding from "@/components/carding";
import Image from "next/image";

export default function Features() {
  return (
    <section className="mt-[2px] overflow-x-hidden relative">
      <div className="relative min-h-[300px] md:min-h-[420px] flex justify-center">
        <div className="relative w-full md:w-[76%]">
          
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dnnvicccf/image/upload/v1759393757/pexels-thanhhoa-tran-640546-1506836_smh5ar.jpg')",
            }}
          >
            
            <div className="absolute inset-0 bg-[#0A1729] opacity-60"></div>

            
            <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>

          
          <div className="relative container mx-auto text-center h-full flex flex-col items-center justify-center pt-20 sm:pt-28 md:pt-36 lg:pt-44 py-10">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              YOUR JOURNEY, PERFECTED
            </h2>

            <p className="text-white sm:text-lg md:text-xl lg:text-2xl mt-4 mb-10 sm:mb-16 md:mb-20">
              Experience travel like never before features designed to
              <br />
              make every moment unforgettable
            </p>
          </div>
        </div>
      </div>

      
      <div className="bg-white mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900">Everything You Need</h2>
          <p className="mt-4 text-lg text-gray-600">
            We have thought of every detail to ensure your travel experience is seamless <br /> and extraordinary.
          </p>
        </div>

        <Destination />
      </div>

      <div className="w-[100%] md:w-[100%] mx-auto flex justify-center h-[200px] ">
          <Image
            src="https://res.cloudinary.com/dnnvicccf/image/upload/v1757596250/advertisement08.jpg_qgw6e7.png"
            alt="Logo"
            width={900}
            height={900}
            className="object-contain"
          />
        </div>

      <Carding />
    </section>
  );
}
