"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ReviewCard({
  name,
  avatar,
  tenure,
  date,
  text,
  hasShowMore,
}: {
  name: string;
  avatar: string | null;
  tenure: string;
  date: string;
  text: string;
  hasShowMore?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const shortText = text.length > 200 ? text.slice(0, 200) + "..." : text;

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        {avatar ? (
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center text-[16px] font-semibold text-white flex-shrink-0">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-[15px] text-airbnb-dark">{name}</p>
          <p className="text-[13px] text-airbnb-gray">{tenure}</p>
        </div>
      </div>
      <div className="flex items-center gap-0.5 mb-2 mt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="#222222">
            <path d="M6 0l1.8 3.6L12 4.2 9 7.1l.7 4.1L6 9.3 2.3 11.2l.7-4.1L0 4.2l4.2-.6L6 0z" />
          </svg>
        ))}
        <span className="text-[13px] text-airbnb-gray ml-1.5">· {date}</span>
      </div>
      <p className="text-[15px] text-airbnb-dark leading-relaxed">
        {hasShowMore && !expanded ? shortText : text}
      </p>
      {hasShowMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[15px] font-bold underline text-airbnb-dark mt-2"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
}

interface ReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Reviews({ reviews, rating, reviewCount }: ReviewsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  // Rating categories with icons
  const categories = [
    { name: "Cleanliness", score: 5.0, icon: "sparkle" },
    { name: "Accuracy", score: 5.0, icon: "check" },
    { name: "Check-in", score: 5.0, icon: "key" },
    { name: "Communication", score: 5.0, icon: "chat" },
    { name: "Location", score: 4.8, icon: "map" },
    { name: "Value", score: 4.8, icon: "tag" },
  ];

  // Overall rating distribution (5 stars to 1 star)
  const ratingBars = [
    { stars: 5, count: 17 },
    { stars: 4, count: 2 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];
  const maxCount = Math.max(...ratingBars.map((r) => r.count));

  // Carousel tags
  const tags = [
    { emoji: "🛋️", label: "Comfort", count: 6 },
    { emoji: "✅", label: "Accuracy", count: 5 },
    { emoji: "🛁", label: "Hot tub", count: 5 },
    { emoji: "🏠", label: "Condition", count: 4 },
    { emoji: "🏨", label: "Hospitality", count: 8 },
    { emoji: "🧹", label: "Cleanliness", count: 4 },
    { emoji: "🎁", label: "Amenities", count: 2 },
    { emoji: "🎨", label: "Decor", count: 2 },
    { emoji: "🏡", label: "Indoor spaces", count: 2 },
    { emoji: "📍", label: "Location", count: 2 },
  ];

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case "sparkle":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="text-airbnb-dark">
            <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" strokeLinecap="round" />
          </svg>
        );
      case "check":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="text-airbnb-dark">
            <circle cx="16" cy="16" r="12" />
            <path d="M10 16l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "key":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="text-airbnb-dark">
            <circle cx="20" cy="12" r="6" />
            <path d="M15 17l-9 9M10 22l3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "chat":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="text-airbnb-dark">
            <path d="M6 8h20v14H18l-4 4v-4H6V8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "map":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="text-airbnb-dark">
            <path d="M6 6l8 4 8-4 4 2v20l-4-2-8 4-8-4-4 2V8l4-2z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 10v20M22 6v20" strokeLinecap="round" />
          </svg>
        );
      case "tag":
        return (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="text-airbnb-dark">
            <path d="M4 4h12l12 12-12 12L4 16V4z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={sectionRef} className="py-12" id="reviews">
      {/* Big Rating Display - Centered */}
      <div className="text-center mb-8">
        {/* Laurel images + rating number */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {/* Left laurel */}
          <img src="/laurel-left.png" alt="" className="w-[72px] h-[110px] object-contain" />
          <span className="text-[72px] font-bold text-airbnb-dark leading-none">{rating}</span>
          {/* Right laurel */}
          <img src="/laurel-right.png" alt="" className="w-[72px] h-[110px] object-contain" />
        </div>

        {/* Guest favourite title */}
        <h2 className="text-[18px] font-bold text-airbnb-dark mb-2">Guest favourite</h2>
        <p className="text-[14px] text-airbnb-gray max-w-[300px] mx-auto mb-2">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="text-[14px] font-bold underline text-airbnb-dark">
          How reviews work
        </button>
      </div>

      {/* Rating Categories - Horizontal with Overall rating bar + vertical dividers */}
      <div className="flex border-t border-airbnb-border pt-8 mb-8">
        {/* Overall rating - bar chart */}
        <div className="pr-6 border-r border-airbnb-border">
          <p className="text-[12px] font-bold text-airbnb-dark mb-3">Overall rating</p>
          <div className="space-y-1 w-[120px]">
            {ratingBars.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-1">
                <span className="text-[10px] text-airbnb-dark w-3">{bar.stars}</span>
                <div className="flex-1 h-[4px] bg-[#E0E0E0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-airbnb-dark rounded-full"
                    style={{ width: maxCount > 0 ? `${(bar.count / maxCount) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category scores - left aligned with vertical dividers */}
        {categories.map((cat, idx) => (
          <div key={cat.name} className={`flex-1 pl-6 ${idx < categories.length - 1 ? "pr-6 border-r border-airbnb-border" : ""}`}>
            <p className="text-[12px] font-bold text-airbnb-dark mb-2">{cat.name}</p>
            <p className="text-[16px] font-bold text-airbnb-dark mb-2">{cat.score.toFixed(1)}</p>
            <div>
              {getCategoryIcon(cat.icon)}
            </div>
          </div>
        ))}
      </div>

      {/* Tags Carousel - horizontal scrollable */}
      <div className="relative mb-8">
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tags.map((tag, idx) => (
            <button
              key={idx}
              className="flex items-center gap-2 px-4 py-2 border border-airbnb-border rounded-full whitespace-nowrap hover:bg-airbnb-hover transition-colors flex-shrink-0"
            >
              <span className="text-[14px]">{tag.emoji}</span>
              <span className="text-[13px] font-medium text-airbnb-dark">{tag.label}</span>
              <span className="text-[13px] text-airbnb-gray">{tag.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Review Cards - 2 column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-10">
        <ReviewCard
          name="Amit"
          avatar={null}
          tenure="2 months on Airbnb"
          date="1 week ago"
          text="Very helpful and responsive team. Safe and peaceful stay. loved everything about the property."
        />

        <ReviewCard
          name="Aheesh"
          avatar="/aheesh.jpeg"
          tenure="3 years on Airbnb"
          date="2 weeks ago"
          text="We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again."
          hasShowMore
        />

        <ReviewCard
          name="Samiksha"
          avatar="/samiksha.jpeg"
          tenure="8 months on Airbnb"
          date="May 2026"
          text="the host nitish was really great help"
        />

        <ReviewCard
          name="Vedant"
          avatar={null}
          tenure="4 years on Airbnb"
          date="May 2026"
          text="We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine. The highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable. The property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!"
          hasShowMore
        />

        <ReviewCard
          name="Vaibhav S"
          avatar="/vaibhav-s.jpeg"
          tenure="3 years on Airbnb"
          date="May 2026"
          text="Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too."
        />

        <ReviewCard
          name="Mohd"
          avatar="/mohd.jpeg"
          tenure="5 years on Airbnb"
          date="May 2026"
          text="Great place. Exactly as described in the listing."
        />
      </div>

      {/* Show all reviews button */}
      <button className="px-6 py-3 border border-airbnb-dark rounded-lg text-[14px] font-bold hover:bg-airbnb-hover transition-colors">
        Show all 19 reviews
      </button>

      {/* Bottom separator */}
      <div className="border-t border-airbnb-border mt-8" />
    </div>
  );
}
