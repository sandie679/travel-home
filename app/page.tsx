"use client";
import Image from "next/image";
import { FaUser, FaClock, FaCalendarAlt } from "react-icons/fa";
import { Manrope } from "next/font/google";
import Card from "../components/Card";
import Carding from "../components/carding";



const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="relative h-[420px] mt-4">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnnvicccf/image/upload/v1757407383/tr_banner_post.jpg_xljmms.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#0A1729] opacity-50 w-[76%] mx-auto"></div>
      </div>

      <div className="relative container mx-auto text-center h-full flex flex-col items-center justify-center">
        <button className="bg-[#F4796C] text-white px-4 py-1 rounded mb-4">
          CULTURE
        </button>

        <h2
          className={`${manrope.className} text-[#FFFFFF] text-lg md:text-2xl font-bold max-w-xl mb-2`}
        >
          The Potentially Dangerous Non-Accessibility Of Cookie Notices
        </h2>

        <p className=" text-sm flex gap-4 items-center justify-center text-[#BACCE1]">
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
      <Card />

  <div className="w-[60%] mx-auto flex justify-center h-[200px] -mt-8">
        <Image
         src="https://res.cloudinary.com/dnnvicccf/image/upload/v1757596250/advertisement08.jpg_qgw6e7.png"
          alt="Logo" 
          width={900}
           height={900} 
           className="object-contain"
           />
      
      
      
      </div>
      <Carding/>
      

    </section>
  );
}
