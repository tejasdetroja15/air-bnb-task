"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HostSectionProps {
  host: {
    name: string;
    image: string;
    superhost: boolean;
    responseRate: string;
    responseTime: string;
    yearsHosting: number;
    reviews: number;
    verified: boolean;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HostSection({ host }: HostSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const coHosts = [
    { name: "Sharath", image: "/sharath.jpg" },
    { name: "Aman Dev Pahwa", image: "/aman.jpg" },
    { name: "Maria Karen Priyanka", image: "/maria.jpg" },
    { name: "Simran", image: "/simran.jpeg" },
    { name: "Pallavi", image: "/pallavi.jpeg" },
    { name: "Sanyukta", image: "/sanyukta.jpeg" },
    { name: "Shruti", image: null, initial: "S" },
    { name: "Amisha", image: null, initial: "A" },
  ];

  return (
    <div ref={sectionRef} className="py-8">
      <h2 className="text-[22px] font-bold text-airbnb-dark mb-6">
        Meet your host
      </h2>

      {/* Two column layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left column - Host card + personal info */}
        <div className="lg:w-[320px] flex-shrink-0">
          {/* Host card */}
          <div className="border border-[#E8E8E8] rounded-2xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] mb-6">
            <div className="flex gap-6">
              {/* Left side - avatar + name */}
              <div className="text-center flex-1">
                {/* Host avatar */}
                <div className="relative w-[90px] h-[90px] mx-auto mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.jpeg" alt="Mirashya Homes" className="w-full h-full rounded-full object-cover" />
                  {/* Verified badge */}
                  <div className="absolute -bottom-1 right-1 w-6 h-6 bg-airbnb-red rounded-full flex items-center justify-center border-2 border-white">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5 2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-[20px] font-bold text-airbnb-dark leading-tight">Mirashya</h3>
                <h3 className="text-[20px] font-bold text-airbnb-dark leading-tight">Homes</h3>
                <p className="text-[14px] text-airbnb-gray mt-1">Host</p>
              </div>

              {/* Right side - stats stacked vertically */}
              <div className="border-l border-airbnb-border pl-6 flex flex-col justify-center">
                <div className="pb-3 border-b border-airbnb-border">
                  <p className="text-[22px] font-bold text-airbnb-dark leading-tight">1,463</p>
                  <p className="text-[11px] text-airbnb-dark">Reviews</p>
                </div>
                <div className="py-3 border-b border-airbnb-border">
                  <p className="text-[22px] font-bold text-airbnb-dark leading-tight">4.68<span className="text-[22px]">★</span></p>
                  <p className="text-[10px] text-airbnb-dark">Rating</p>
                </div>
                <div className="pt-3">
                  <p className="text-[22px] font-bold text-airbnb-dark leading-tight">2</p>
                  <p className="text-[11px] text-airbnb-dark">Years hosting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-airbnb-dark flex-shrink-0">
                <path d="M12 21c-4-4-8-7.5-8-11a8 8 0 1116 0c0 3.5-4 7-8 11z" />
                <circle cx="12" cy="10" r="2" />
              </svg>
              <span className="text-[14px] text-airbnb-dark">Born in the 80s</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-airbnb-dark flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
              </svg>
              <span className="text-[14px] text-airbnb-dark">Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* Right column - Co-hosts + Host details */}
        <div className="flex-1">
          {/* Co-Hosts */}
          <h3 className="text-[16px] font-bold text-airbnb-dark mb-4">Co-Hosts</h3>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {coHosts.map((cohost, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {cohost.image ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cohost.image} alt={cohost.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#E0E0E0] flex items-center justify-center flex-shrink-0 text-[12px] font-semibold text-airbnb-dark">
                    {cohost.initial}
                  </div>
                )}
                <span className="text-[13px] text-airbnb-dark">{cohost.name}</span>
              </div>
            ))}
          </div>

          {/* Host details */}
          <h3 className="text-[16px] font-bold text-airbnb-dark mb-3">Host details</h3>
          <p className="text-[14px] text-airbnb-dark">Response rate: 100%</p>
          <p className="text-[14px] text-airbnb-dark mb-5">Responds within an hour</p>

          {/* Message host button */}
          <button className="px-6 py-3 bg-[#F0F0F0] rounded-lg text-[14px] font-bold text-airbnb-dark hover:bg-[#E8E8E8] transition-colors">
            Message host
          </button>

          {/* Payment protection notice */}
          <div className="flex items-start gap-3 mt-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-airbnb-gray flex-shrink-0 mt-0.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p className="text-[12px] text-airbnb-gray leading-relaxed">
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="border-t border-airbnb-border mt-10" />
    </div>
  );
}
