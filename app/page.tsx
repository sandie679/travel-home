"use client";
import Image from "next/image";
import { FaUser, FaClock, FaCalendarAlt } from "react-icons/fa";
import { Manrope } from "next/font/google";
import Card from "../components/Card";
import Carding from "../components/carding";
import Latest from "@/components/Latest";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="mt-[2px] overflow-x-hidden">
      <div className="relative min-h-[300px] md:min-h-[420px]">
        <div
          className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnnvicccf/image/upload/v1757407383/tr_banner_post.jpg_xljmms.png')",
          }}
        >
          <div className="absolute inset-0 bg-[#0A1729] opacity-50 w-full md:w-[76%] max-w-full mx-auto"></div>
        </div>

        <div className="relative container mx-auto text-center h-full flex flex-col items-center justify-center pt-44 py-10">
          <button className="bg-[#F4796C] text-white px-4 py-1 m rounded mb-4">
            CULTURE
          </button>

          <h2
            className={`${manrope.className} text-[#FFFFFF] text-lg md:text-2xl font-bold max-w-xl mb-2`}
          >
            The Potentially Dangerous Non-Accessibility Of Cookie Notices
          </h2>

          <p className="text-sm flex gap-4 items-center justify-center text-[#BACCE1]">
            <span className="flex items-center gap-1 ">
              <FaUser /> Admin
            </span>
            |
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> 27 August, 2024
            </span>
            |
            <span className="flex items-center gap-1">
              <FaClock /> 20 mins
            </span>
          </p>
        </div>
      </div>

      <Card />

      <div className="w-[90%] md:w-[60%] mx-auto flex justify-center h-[200px] -mt-8">
        <Image
          src="https://res.cloudinary.com/dnnvicccf/image/upload/v1757596250/advertisement08.jpg_qgw6e7.png"
          alt="Logo"
          width={900}
          height={900}
          className="object-contain"
        />
      </div>
      <Latest />

      <Carding />
    </section>
  );
}
