"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IoWifi,
  IoCarSport,
} from "react-icons/io5";
import {
  MdOutlineKitchen,
  MdOutlinePool,
  MdHotTub,
  MdPets,
  MdOutlineCameraOutdoor,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

interface AmenityItem {
  name: string;
  icon: string;
  unavailable?: boolean;
}

interface AmenitiesProps {
  amenities: AmenityItem[];
}

export default function Amenities({ amenities }: AmenitiesProps) {
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll(".amenity-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const getIcon = (icon: string, unavailable?: boolean) => {
    const iconClass = `text-2xl ${unavailable ? "text-gray-400" : "text-airbnb-dark"}`;
    switch (icon) {
      case "kitchen":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={unavailable ? "text-gray-400" : "text-airbnb-dark"}>
            <path d="M10 8v4M10 8c0-2 1-4 3-4M10 12v12M16 8v16M22 8v4c0 2-1 4-3 4h-3M22 8c0-2-1-3-3-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "wifi":
        return <IoWifi className={iconClass} />;
      case "workspace":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={unavailable ? "text-gray-400" : "text-airbnb-dark"}>
            <rect x="4" y="8" width="24" height="14" rx="2" />
            <path d="M8 26h16M12 22v4M20 22v4" strokeLinecap="round" />
          </svg>
        );
      case "parking":
        return <IoCarSport className={iconClass} />;
      case "pool":
        return <MdOutlinePool className={iconClass} />;
      case "hot-tub":
        return <MdHotTub className={iconClass} />;
      case "pets":
        return <MdPets className={iconClass} />;
      case "camera":
        return <MdOutlineCameraOutdoor className={iconClass} />;
      case "co-alarm":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <rect x="6" y="6" width="20" height="20" rx="3" />
            <path d="M16 12v4l2 2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="4" y1="4" x2="28" y2="28" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case "smoke-alarm":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <circle cx="16" cy="16" r="10" />
            <path d="M16 12v5" strokeLinecap="round" />
            <circle cx="16" cy="20" r="1" fill="currentColor" />
            <line x1="4" y1="4" x2="28" y2="28" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      default:
        return <MdOutlineKitchen className={iconClass} />;
    }
  };

  const displayedAmenities = showAll ? amenities : amenities.slice(0, 10);

  return (
    <div className="py-8 border-b border-airbnb-border">
      <h2 className="text-[22px] font-bold text-airbnb-dark mb-6">
        What this place offers
      </h2>

      <div ref={gridRef} className="grid grid-cols-2 gap-x-8">
        {displayedAmenities.map((amenity, idx) => (
          <div
            key={idx}
            className="amenity-item flex items-center gap-4 py-4"
          >
            {getIcon(amenity.icon, amenity.unavailable)}
            <span
              className={`text-[16px] ${
                amenity.unavailable
                  ? "text-gray-400 line-through"
                  : "text-airbnb-dark"
              }`}
            >
              {amenity.name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-6 px-6 py-3 border border-airbnb-dark rounded-lg text-[14px] font-bold hover:bg-airbnb-hover transition-colors"
      >
        {showAll ? "Show less" : "Show all 50 amenities"}
      </button>
    </div>
  );
}
