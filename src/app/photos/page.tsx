"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

const sections = [
  { id: "living-room-1", title: "Living room 1", description: "Sofa · Air conditioning · Ceiling fan · TV", images: ["/lr1.jpeg", "/lr2.jpeg", "/lr3.jpeg"] },
  { id: "living-room-2", title: "Living room 2", description: "Ceiling fan · Hot tub", images: ["/lr21.jpeg", "/lr22.jpeg", "/lr23.jpeg", "/lr24.jpeg", "/lr25.jpeg", "/lr26.jpeg", "/lr27.jpeg"] },
  { id: "full-kitchen", title: "Full kitchen", description: "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery", images: ["/kitchen.jpeg"] },
  { id: "bedroom", title: "Bedroom", description: "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi", images: ["/bedroom1.jpeg", "/bedroom2.jpeg", "/bedroom3.jpeg", "/bedroom4.jpeg"] },
  { id: "full-bathroom", title: "Full bathroom", description: "Bathtub · Hair dryer · Hot water · Shampoo", images: ["/bathroom.jpeg"] },
  { id: "gym", title: "Gym", description: "Gym equipment", images: ["/gym1.jpeg", "/gym2.jpeg", "/gym3.jpeg"] },
  { id: "exterior", title: "Exterior", description: "Outdoor area", images: ["/Exterior1.jpeg", "/Exterior3.jpeg"] },
  { id: "pool", title: "Pool", description: "Shared pool", images: ["/pool1.jpeg", "/pool2.jpeg", "/pool3.jpeg"] },
  { id: "additional-photos", title: "Additional photos", description: "", images: ["/add1.jpeg", "/add2.jpeg", "/add3.jpeg"] },
];

const thumbnails = [
  { label: "Living room 1", image: "/lr1.jpeg" },
  { label: "Living room 2", image: "/lr21.jpeg" },
  { label: "Full kitchen", image: "/kitchen.jpeg" },
  { label: "Bedroom", image: "/bedroom1.jpeg" },
  { label: "Full bathroom", image: "/bathroom.jpeg" },
  { label: "Gym", image: "/gym1.jpeg" },
  { label: "Exterior", image: "/Exterior1.jpeg" },
  { label: "Pool", image: "/pool1.jpeg" },
  { label: "Additional photos", image: "/add1.jpeg" },
];

export default function PhotoTour() {
  const router = useRouter();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Fullscreen Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[200] bg-white flex items-center justify-center cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-[#222] p-2 rounded-full hover:bg-[#F0F0F0] z-10"
            onClick={() => setLightboxImage(null)}
          >
            <IoClose className="text-2xl" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxImage}
            alt="Full view"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 bg-white z-50 border-b border-[#E8E8E8] px-6 py-4">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-[#F0F0F0] transition-colors"
          >
            <IoClose className="text-xl text-[#222]" />
          </button>
          <h1 className="text-[14px] font-medium text-[#222]">Photo tour</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-8">
        {/* Thumbnail grid */}
        <div className="flex flex-wrap gap-3 mb-12">
          {thumbnails.map((thumb, idx) => (
            <div key={idx} className="w-[100px]">
              <div className="w-[100px] h-[70px] rounded-lg overflow-hidden mb-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb.image} alt={thumb.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <p className="text-[11px] text-[#222]">{thumb.label}</p>
            </div>
          ))}
        </div>

        {/* Photo sections */}
        {sections.map((section, sIdx) => (
          <div key={sIdx} id={section.id} className="mb-16">
            <div className="flex gap-8">
              {/* Left - sticky title and description */}
              <div className="w-[280px] flex-shrink-0">
                <div className="sticky top-[80px]">
                  <h2 className="text-[22px] font-bold text-[#222] mb-2">{section.title}</h2>
                  <p className="text-[14px] text-[#717171] leading-relaxed">{section.description}</p>
                </div>
              </div>

              {/* Right - images with hover zoom + click to fullscreen */}
              <div className="flex-1 space-y-3">
                {section.images.map((img, iIdx) => {
                  if (iIdx === 0) {
                    return (
                      <div
                        key={iIdx}
                        className="rounded-xl overflow-hidden h-[320px] cursor-pointer"
                        onClick={() => setLightboxImage(img)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={`${section.title} ${iIdx + 1}`}
                          className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                    );
                  }
                  if (iIdx % 2 === 1) {
                    const nextImg = section.images[iIdx + 1];
                    return (
                      <div key={iIdx} className="flex gap-3">
                        <div
                          className="flex-1 rounded-xl overflow-hidden h-[200px] cursor-pointer"
                          onClick={() => setLightboxImage(img)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={`${section.title} ${iIdx + 1}`}
                            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                        {nextImg && (
                          <div
                            className="flex-1 rounded-xl overflow-hidden h-[200px] cursor-pointer"
                            onClick={() => setLightboxImage(nextImg)}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={nextImg}
                              alt={`${section.title} ${iIdx + 2}`}
                              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                            />
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
