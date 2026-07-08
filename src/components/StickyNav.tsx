"use client";

import { useState, useEffect } from "react";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("photos");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);

      // Detect which section is in view
      const sectionIds = ["photos", "amenities", "reviews", "location"];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "photos", label: "Photos" },
    { id: "amenities", label: "Amenities" },
    { id: "reviews", label: "Reviews" },
    { id: "location", label: "Location" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] bg-white border-b border-airbnb-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1264px] mx-auto px-[80px]">
        <div className="flex items-center justify-between h-[64px]">
          {/* Left - Section links with active underline */}
          <div className="flex items-center gap-6 h-full">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-[14px] h-full flex items-center border-b-2 transition-colors ${
                  activeSection === section.id
                    ? "font-semibold text-airbnb-dark border-airbnb-dark"
                    : "font-medium text-airbnb-gray border-transparent hover:text-airbnb-dark hover:border-airbnb-border"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Right - Price + Reserve */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-[15px] text-airbnb-dark">
                <span className="font-semibold">₹28,499</span>{" "}
                <span className="font-normal text-[14px]">for 5 nights</span>
              </p>
              <p className="text-[12px] text-airbnb-dark">
                ★ 4.95 · 19 reviews
              </p>
            </div>
            <button className="bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold px-5 py-2.5 rounded-full text-[14px] hover:opacity-90 transition-opacity">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
