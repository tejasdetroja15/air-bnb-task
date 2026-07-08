"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <div className="pt-4 pb-4" id="location">
      <h2 className="text-[22px] font-bold text-airbnb-dark mb-2">
        Where you&apos;ll be
      </h2>
      <p className="text-[14px] text-airbnb-dark mb-4">Candolim, Goa, India</p>

      {/* Map */}
      <div
        ref={mapRef}
        className="relative w-full h-[400px] rounded-xl overflow-hidden"
      >
        {/* Map background - light green/blue gradient like satellite view */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4e8f0] via-[#e8f4e8] to-[#eef5ee]" />

        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 400">
          <defs>
            <pattern id="mapgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#9CA3AF" strokeWidth="0.5" strokeDasharray="2 2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapgrid)" />
        </svg>

        {/* Green circle blobs (land features) */}
        <div className="absolute top-[35%] left-[30%] w-[80px] h-[80px] rounded-full bg-[#c8e6c0] opacity-60" />
        <div className="absolute top-[45%] right-[20%] w-[100px] h-[100px] rounded-full bg-[#c8e6c0] opacity-50" />

        {/* Blue area (water/sea) */}
        <div className="absolute top-0 left-0 w-[45%] h-full bg-[#b8d8e8] opacity-40" style={{ clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)" }} />

        {/* Home icon in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222222" strokeWidth="1.5">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Search icon top-left */}
        <button className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center border border-gray-200">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
        </button>

        {/* Zoom controls top-right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center border border-gray-200 text-[16px] font-light text-airbnb-dark">+</button>
          <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center border border-gray-200 text-[16px] font-light text-airbnb-dark">−</button>
        </div>
      </div>

      {/* Location info */}
      <p className="text-[14px] text-airbnb-gray mt-4">
        Exact location will be provided after booking.
      </p>

      {/* Neighbourhood highlights */}
      <div className="mt-6">
        <h3 className="font-bold text-[16px] text-airbnb-dark mb-2">Neighbourhood highlights</h3>
        <p className="text-[15px] text-airbnb-dark leading-relaxed">
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
        </p>
        <button className="mt-3 text-[15px] font-bold underline text-airbnb-dark flex items-center gap-1">
          Show more
          <span className="text-[13px] font-bold">&gt;</span>
        </button>
      </div>

      {/* Bottom separator */}
      <div className="border-t border-airbnb-border mt-10" />
    </div>
  );
}
