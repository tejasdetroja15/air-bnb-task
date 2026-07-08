"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoStar } from "react-icons/io5";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function DescriptionSection({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="relative">
        <div
          className={`text-[16px] leading-[1.667] text-airbnb-dark whitespace-pre-line overflow-hidden transition-all duration-300 ${
            expanded ? "max-h-none" : "max-h-[130px]"
          }`}
          style={!expanded ? {
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          } : undefined}
        >
          {description}
        </div>
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-[16px] font-bold underline text-airbnb-dark flex items-center gap-1"
      >
        {expanded ? "Show less" : "Show more"}
        <span className="text-[14px] font-bold">&gt;</span>
      </button>
    </div>
  );
}

interface ListingInfoProps {
  type: string;
  location: string;
  host: {
    name: string;
    image: string;
    superhost: boolean;
    yearsHosting: number;
    reviews: number;
    verified: boolean;
  };
  stats: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  rating: number;
  reviewCount: number;
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  description: string;
}

export default function ListingInfo({
  type,
  location,
  host,
  stats,
  rating,
  reviewCount,
  highlights,
  description,
}: ListingInfoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightsRef.current) {
      const items = highlightsRef.current.querySelectorAll(".highlight-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const getHighlightIcon = (icon: string) => {
    switch (icon) {
      case "outdoor":
        // Fire/chimney grill icon - matching the original
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#222222]">
            <path d="M16 2c0 4-4 6-4 10a4 4 0 008 0c0-4-4-6-4-10z" />
            <path d="M10 16h12" />
            <path d="M12 16v2a4 4 0 008 0v-2" />
            <path d="M10 22h12" strokeLinecap="round" />
            <path d="M14 22v4M18 22v4" strokeLinecap="round" />
            <path d="M10 26h12" strokeLinecap="round" />
          </svg>
        );
      case "cool":
        // Fan/propeller blades icon - matching the original
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#222222]">
            <circle cx="16" cy="16" r="2" />
            <path d="M16 14c0-4 2-8 0-12-4 2-4 8-4 12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 16c4 0 8 2 12 0-2-4-8-4-12-4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 18c0 4-2 8 0 12 4-2 4-8 4-12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 16c-4 0-8-2-12 0 2 4 8 4 12 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "key":
        // Door with keyhole icon - matching the original
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#222222]">
            <rect x="6" y="4" width="16" height="24" rx="1" />
            <path d="M22 4h2a2 2 0 012 2v20a2 2 0 01-2 2h-2" />
            <rect x="10" y="14" width="4" height="6" rx="0.5" strokeDasharray="2 1" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#222222]">
            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <div ref={sectionRef}>
      {/* Type, Location & Stats */}
      <div className="pb-6 border-b border-airbnb-border">
        <h2 className="text-[22px] font-semibold text-airbnb-dark">
          {type} in {location}
        </h2>
        <p className="text-base text-airbnb-dark mt-1">
          {stats.guests} guests · {stats.bedrooms} bedroom · {stats.beds} bed · {stats.bathrooms} bathroom
        </p>
      </div>

      {/* Guest Favourite Badge */}
      <div className="py-6 border-b border-airbnb-border">
        <div className="flex items-center gap-4 border border-airbnb-border rounded-xl px-6 py-4">
          {/* Left - Guest favourite text */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold leading-tight">Guest</span>
              <span className="text-sm font-semibold leading-tight">favourite</span>
            </div>
            <div className="flex items-center gap-1">
              {/* Trophy/medal icons */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-airbnb-dark">
                <path d="M12 2l2 5h5l-4 3.5 1.5 5L12 13l-4.5 2.5L9 10.5 5 7h5l2-5z" fill="currentColor" />
              </svg>
            </div>
            <p className="text-sm text-airbnb-dark">
              One of the most loved homes on Airbnb, according to guests
            </p>
          </div>

          {/* Right - Rating & Reviews */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-center">
              <p className="text-lg font-bold">{rating}</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IoStar key={star} className="text-[10px] text-airbnb-dark" />
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-airbnb-border" />
            <div className="text-center">
              <p className="text-lg font-bold">{reviewCount}</p>
              <p className="text-xs text-airbnb-dark underline font-medium">Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Host Info with Logo */}
      <div className="py-6 border-b border-airbnb-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={host.image}
              alt={host.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-base">Hosted by {host.name}</p>
            <p className="text-sm text-airbnb-gray">
              {host.yearsHosting} years hosting
            </p>
          </div>
        </div>
      </div>

      {/* Highlights - matching the exact icons from the screenshot */}
      <div ref={highlightsRef} className="py-6 border-b border-airbnb-border space-y-6">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="highlight-item flex gap-4 items-start">
            <div className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center">
              {getHighlightIcon(highlight.icon)}
            </div>
            <div>
              <p className="font-medium text-[15px] text-airbnb-dark">{highlight.title}</p>
              <p className="text-sm text-airbnb-gray mt-0.5">
                {highlight.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Translation notice - no icon, bold "Show original", no border-b below */}
      <div className="pt-6 pb-6">
        <div className="px-4 py-3 bg-airbnb-light rounded-lg">
          <p className="text-sm text-airbnb-dark">
            Some info has been automatically translated.{" "}
            <button className="font-bold underline">Show original</button>
          </p>
        </div>
      </div>

      {/* Description with gradient fade and Show more/less */}
      <div className="pb-8">
        <DescriptionSection description={description} />
      </div>
    </div>
  );
}
