"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function WhereYouSleep() {
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

  return (
    <div ref={sectionRef} className="py-8 border-b border-airbnb-border">
      <h2 className="text-[22px] font-bold text-airbnb-dark mb-6">
        Where you&apos;ll sleep
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Bedroom */}
        <div>
          <div className="rounded-xl overflow-hidden h-[200px] relative">
            <Image
              src="/bedroom.jpeg"
              alt="Bedroom"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-semibold text-[15px] mt-3">Bedroom</h3>
          <p className="text-[14px] text-airbnb-gray">1 double bed</p>
        </div>

        {/* Living room */}
        <div>
          <div className="rounded-xl overflow-hidden h-[200px] relative">
            <Image
              src="/livingroom.jpeg"
              alt="Living room"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-semibold text-[15px] mt-3">Living room</h3>
          <p className="text-[14px] text-airbnb-gray">1 sofa</p>
        </div>
      </div>
    </div>
  );
}
