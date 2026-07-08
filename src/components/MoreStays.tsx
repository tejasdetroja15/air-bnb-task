"use client";

import { useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const stays = [
  { image: "/stay-1.jpeg", title: "Beautiful Studio with a view to die for", price: "₹23,600", rating: "4.91" },
  { image: "/stay-2.jpeg", title: "NAQAB - 1bhk with private pool", price: "₹42,218", rating: "4.95" },
  { image: "/stay-3.jpeg", title: "Greentique Luxury Flat with plunge pool, Calangute", price: "₹44,506", rating: "4.94" },
  { image: "/stay-4.jpeg", title: "The Tropical Studio | 5 mins to Beach", price: "₹22,824", rating: "4.96" },
  { image: "/stay-5.jpeg", title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: "₹39,942", rating: "4.95" },
  { image: "/stay-6.jpeg", title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool", price: "₹45,648", rating: "5.0" },
  { image: "/stay-8.jpeg", title: "Luxury Apt | Private Pool | 6 Mins from Beach", price: "₹48,786", rating: "4.93" },
  { image: "/stay-8.jpeg", title: "Serendipity Cottage - Calm Stay in Calangute-Baga.", price: "₹22,824", rating: "4.92" },
];

export default function MoreStays() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const totalPages = 2;

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 800, behavior: "smooth" });
      setPage(Math.min(page + 1, totalPages));
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -800, behavior: "smooth" });
      setPage(Math.max(page - 1, 1));
    }
  };

  // Update page on manual scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollPercent = scrollLeft / (scrollWidth - clientWidth);
      setPage(scrollPercent > 0.4 ? 2 : 1);
    }
  };

  return (
    <div className="py-8">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[22px] font-bold text-airbnb-dark">More stays nearby</h2>
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-airbnb-dark">{page} / {totalPages}</span>
          <button
            onClick={scrollLeft}
            className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-airbnb-dark transition-colors disabled:opacity-30"
            disabled={page <= 1}
          >
            <IoChevronBack className="text-[12px]" />
          </button>
          <button
            onClick={scrollRight}
            className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-airbnb-dark transition-colors disabled:opacity-30"
            disabled={page >= totalPages}
          >
            <IoChevronForward className="text-[12px]" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stays.map((stay, idx) => (
          <div key={idx} className="flex-shrink-0 w-[200px] cursor-pointer">
            {/* Image */}
            <div className="w-full h-[200px] rounded-xl overflow-hidden mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stay.image}
                alt={stay.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Title */}
            <p className="text-[14px] font-medium text-airbnb-dark leading-tight line-clamp-2 mb-1">
              {stay.title}
            </p>
            {/* Price & Rating */}
            <div className="flex items-center gap-1">
              <span className="text-[14px] text-airbnb-dark">{stay.price}</span>
              <span className="text-[14px] text-airbnb-dark ml-1">★</span>
              <span className="text-[14px] text-airbnb-dark">{stay.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
