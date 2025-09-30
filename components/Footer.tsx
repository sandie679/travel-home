"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full mt-16">
      
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://res.cloudinary.com/dnnvicccf/image/upload/v1759221594/Image_1_dnk8wr.png"
          alt="Footer Background"
          fill
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 bg-[#0C192A] opacity-90"></div>
      </div>

    
      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4">
        <Image
          src="https://res.cloudinary.com/dnnvicccf/image/upload/v1759223067/w_logo.png_zyfvtq.png"
          alt="Logo"
          width={80}
          height={80}
          className="mb-4"
        />

        <p className="text-white text-center mb-6 max-w-md text-sm md:text-base">
          Discover new places, share your experiences, and connect with fellow
          travelers. Your journey starts here!
        </p>

        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
          <a
            href="#"
            className="flex items-center gap-2 text-white hover:text-[#E8F1F1] transition"
          >
            <FaFacebookF /> Facebook
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-white hover:text-[#E8F1F1] transition"
          >
            <FaYoutube /> YouTube
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-white hover:text-[#E8F1F1] transition"
          >
            <FaTwitter /> Twitter
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-white hover:text-[#E8F1F1] transition"
          >
            <FaInstagram /> Instagram
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-white hover:text-[#E8F1F1] transition"
          >
            <FaPinterest /> Pinterest
          </a>
        </div>
      </div>

      
      <div className="w-full bg-[#07122B] py-3 text-center text-xs md:text-sm text-white relative z-20">
        © {new Date().getFullYear()} All rights reserved.
      </div>

      
      <div className="absolute left-0 bottom-0 w-full h-10 bg-[#0A1729] opacity-95 z-30 pointer-events-none"></div>
    </footer>
  );
}
