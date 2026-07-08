"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HouseRulesProps {
  rules: string[];
  cancellationPolicy: string;
  safetyItems: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HouseRules({ rules, cancellationPolicy, safetyItems }: HouseRulesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={sectionRef} className="py-8">
      <h2 className="text-[22px] font-bold text-airbnb-dark mb-6">
        Things to know
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cancellation Policy */}
        <div>
          {/* Icon */}
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-airbnb-dark">
              <rect x="4" y="4" width="24" height="24" rx="2" />
              <path d="M10 10l12 12M22 10L10 22" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="font-semibold text-[14px] text-airbnb-dark mb-2">Cancellation policy</h3>
          <p className="text-[14px] text-airbnb-dark leading-relaxed mb-2">
            Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
          </p>
          <p className="text-[14px] text-airbnb-dark leading-relaxed mb-2">
            Review this host&apos;s full policy for details.
          </p>
          <button className="text-[14px] font-bold underline text-airbnb-dark">
            Learn more
          </button>
        </div>

        {/* House Rules */}
        <div>
          {/* Icon */}
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-airbnb-dark">
              <circle cx="20" cy="12" r="8" />
              <path d="M4 28l8-8" strokeLinecap="round" />
              <path d="M8 24l-4 4" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="font-semibold text-[14px] text-airbnb-dark mb-2">House rules</h3>
          <p className="text-[14px] text-airbnb-dark mb-1">Check-in after 2:00 pm</p>
          <p className="text-[14px] text-airbnb-dark mb-1">Checkout before 11:00 am</p>
          <p className="text-[14px] text-airbnb-dark mb-2">3 guests maximum</p>
          <button className="text-[14px] font-bold underline text-airbnb-dark">
            Learn more
          </button>
        </div>

        {/* Safety & Property */}
        <div>
          {/* Icon */}
          <div className="mb-3">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-airbnb-dark">
              <path d="M16 4l10 4v8c0 7-10 12-10 12S6 23 6 16V8l10-4z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[14px] text-airbnb-dark mb-2">Safety &amp; property</h3>
          <p className="text-[14px] text-airbnb-dark mb-1">Carbon monoxide alarm not reported</p>
          <p className="text-[14px] text-airbnb-dark mb-1">Smoke alarm not reported</p>
          <p className="text-[14px] text-airbnb-dark mb-2">Exterior security cameras on property</p>
          <button className="text-[14px] font-bold underline text-airbnb-dark">
            Learn more
          </button>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="border-t border-airbnb-border mt-8" />
    </div>
  );
}
