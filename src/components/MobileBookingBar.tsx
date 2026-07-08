"use client";

import { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";

interface MobileBookingBarProps {
  price: number;
  rating: number;
  reviewCount: number;
}

export default function MobileBookingBar({ price, rating, reviewCount }: MobileBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-airbnb-border px-6 py-4 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-semibold">₹{price.toLocaleString()}</span>
            <span className="text-sm text-airbnb-gray">night</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <IoStar className="text-xs" />
            <span className="text-xs font-medium">{rating}</span>
            <span className="text-xs text-airbnb-gray">· {reviewCount} reviews</span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold px-6 py-3 rounded-lg text-sm">
          Check availability
        </button>
      </div>
    </div>
  );
}
