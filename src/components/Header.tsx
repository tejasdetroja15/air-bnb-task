"use client";

import { useState, useEffect } from "react";
import { IoSearch, IoGlobeOutline, IoMenu } from "react-icons/io5";

export default function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-airbnb-border transition-all duration-300 ${
        hidden ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-[1264px] mx-auto px-[80px]">
        <div className="flex items-center justify-between h-[88px]">
          {/* Logo - actual airbnb logo image */}
          <a href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/airbnb-logo.png" alt="airbnb" className="h-[32px] w-auto" />
          </a>

          {/* Search Bar - 402px × 48px */}
          <div className="flex items-center border border-airbnb-border rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer h-[48px] px-2">
            <button className="px-4 py-2 text-[14px] font-medium text-airbnb-dark border-r border-airbnb-border flex items-center gap-2">
              <span className="text-[16px]">🏠</span>
              Anywhere
            </button>
            <button className="px-4 py-2 text-[14px] font-medium text-airbnb-dark border-r border-airbnb-border">
              Anytime
            </button>
            <button className="px-4 py-2 text-[14px] text-airbnb-gray flex items-center gap-2">
              Add guests
              <span className="bg-airbnb-red text-white p-1.5 rounded-full">
                <IoSearch className="text-[12px]" />
              </span>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button className="text-[14px] font-medium text-airbnb-dark hover:bg-[#F0F0F0] px-4 py-2.5 rounded-full transition-colors">
              Become a host
            </button>
            <button className="w-[40px] h-[40px] rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#E8E8E8] transition-colors">
              <IoGlobeOutline className="text-[18px] text-airbnb-dark" />
            </button>
            <button className="w-[40px] h-[40px] rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#E8E8E8] transition-colors">
              <IoMenu className="text-[18px] text-airbnb-dark" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
