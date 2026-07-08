"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { IoGridOutline, IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FiShare, FiHeart } from "react-icons/fi";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [showModal]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Placeholder gradient backgrounds to simulate images
  const imageStyles = [
    "bg-gradient-to-br from-amber-100 to-orange-200",
    "bg-gradient-to-br from-blue-100 to-indigo-200",
    "bg-gradient-to-br from-teal-100 to-cyan-200",
    "bg-gradient-to-br from-rose-100 to-pink-200",
    "bg-gradient-to-br from-violet-100 to-purple-200",
  ];

  const imagePlaceholders = [
    "Living Room",
    "Bedroom",
    "Private Jacuzzi",
    "Kitchen",
    "Exterior",
  ];

  return (
    <>
      {/* Gallery Grid */}
      <div ref={galleryRef} className="relative">
        {/* Title and Actions - Above Gallery */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-[26px] font-semibold text-airbnb-dark">
            {title}
          </h1>
          <div className="flex items-center gap-2">
            <button className="action-btn">
              <FiShare className="text-lg" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              className="action-btn"
              onClick={() => setSaved(!saved)}
            >
              <FiHeart
                className={`text-lg ${saved ? "fill-airbnb-red text-airbnb-red" : ""}`}
              />
              <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid - actual photos */}
        <div className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[400px] lg:h-[460px]">
          {/* Main Image - Living Room */}
          <div
            className="md:col-span-2 md:row-span-2 cursor-pointer hover:brightness-90 transition-all duration-200 relative"
            onClick={() => router.push("/photos#living-room-1")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lr1.jpeg" alt="Living Room" className="w-full h-full object-cover" />
          </div>

          {/* Bedroom */}
          <div
            className="hidden md:block cursor-pointer hover:brightness-90 transition-all duration-200 relative"
            onClick={() => router.push("/photos#bedroom")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bedroom1.jpeg" alt="Bedroom" className="w-full h-full object-cover" />
          </div>

          {/* Private Jacuzzi / Living room 2 */}
          <div
            className="hidden md:block cursor-pointer hover:brightness-90 transition-all duration-200 relative"
            onClick={() => router.push("/photos#living-room-2")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lr21.jpeg" alt="Private Jacuzzi" className="w-full h-full object-cover" />
          </div>

          {/* Kitchen */}
          <div
            className="hidden md:block cursor-pointer hover:brightness-90 transition-all duration-200 relative"
            onClick={() => router.push("/photos#full-kitchen")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kitchen.jpeg" alt="Kitchen" className="w-full h-full object-cover" />
          </div>

          {/* Bathroom */}
          <div
            className="hidden md:block cursor-pointer hover:brightness-90 transition-all duration-200 relative"
            onClick={() => router.push("/photos#full-bathroom")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bathroom.jpeg" alt="Bathroom" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Show All Photos Button */}
        <button
          onClick={() => router.push("/photos")}
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-white border border-airbnb-dark rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <IoGridOutline />
          Show all photos
        </button>
      </div>

      {/* Photo Modal */}
      {showModal && (
        <div className="photo-modal" ref={modalRef}>
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b">
            <button
              onClick={() => setShowModal(false)}
              className="p-2 rounded-full hover:bg-airbnb-hover transition-colors"
            >
              <IoClose className="text-xl" />
            </button>
            <span className="text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
            <div className="flex gap-2">
              <button className="action-btn">
                <FiShare className="text-lg" />
                Share
              </button>
              <button className="action-btn" onClick={() => setSaved(!saved)}>
                <FiHeart className={`text-lg ${saved ? "fill-airbnb-red text-airbnb-red" : ""}`} />
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* Image Viewer */}
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 relative">
            <button
              onClick={prevImage}
              className="absolute left-4 p-3 rounded-full bg-white border border-airbnb-border shadow-md hover:scale-105 transition-transform"
            >
              <IoChevronBack className="text-xl" />
            </button>

            <div className={`w-full max-w-4xl h-[60vh] rounded-lg ${imageStyles[currentIndex]} flex items-center justify-center`}>
              <span className="text-lg font-medium text-gray-700">
                {imagePlaceholders[currentIndex]}
              </span>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 p-3 rounded-full bg-white border border-airbnb-border shadow-md hover:scale-105 transition-transform"
            >
              <IoChevronForward className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
