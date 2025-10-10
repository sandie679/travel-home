"use client";
import Stats from "@/components/Stats";
import Activities from "@/components/Activities";
import Zaira from "@/components/zaira";

export default function Category() {
  return (
    <section className="mt-[2px] overflow-x-hidden">
      <div className="relative min-h-[300px] md:min-h-[420px] flex justify-center">
        <div className="relative w-full md:w-[76%]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dnnvicccf/image/upload/v1759482488/pexels-asadphoto-3601453_rzxnck.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-[#0A1729] opacity-60"></div>

           
          </div>

          <div className="relative container mx-auto text-center h-full flex flex-col items-center justify-center pt-20 sm:pt-28 md:pt-36 lg:pt-44 py-10">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              DISCOVER YOUR NEXT ADVENTURE
            </h2>

            <p className="text-white sm:text-lg md:text-xl lg:text-2xl mt-4 mb-10 sm:mb-16 md:mb-20">
              Explore breathtaking destinations and create unforgettable
              memories <br /> around the world with personalized travel experiences
            </p>
          </div>
        </div>
      </div>
      <Stats />

      <div className="flex justify-center items-center flex-col" >
        <h1 className="font-bold text-[#0C192A] text-2xl sm:text-3xl md:text-4xl mt-16 sm:mt-20">
          Explore By Categories
        </h1>
        <p className="text-gray-600 text-center mt-5 text-sm sm:text-base md:text-lg max-w-3xl">
          Find the perfect travel experience that matches your interests and dreams
        </p>


      </div>
        <Activities />

        <Zaira />
        
    </section>
  );
}
