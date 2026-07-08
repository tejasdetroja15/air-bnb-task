"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import ListingInfo from "@/components/ListingInfo";
import WhereYouSleep from "@/components/WhereYouSleep";
import Amenities from "@/components/Amenities";
import Calendar from "@/components/Calendar";
import Reviews from "@/components/Reviews";
import LocationMap from "@/components/LocationMap";
import HostSection from "@/components/HostSection";
import HouseRules from "@/components/HouseRules";
import MoreStays from "@/components/MoreStays";
import BookingCard from "@/components/BookingCard";
import StickyNav from "@/components/StickyNav";
import MobileBookingBar from "@/components/MobileBookingBar";
import { listingData } from "@/data/listing";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger animations for the main content
    const ctx = gsap.context(() => {
      // Animate sections as they scroll into view
      gsap.utils.toArray<HTMLElement>(".animate-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      <Header />
      <StickyNav />

      {/* Main Content */}
      <main className="max-w-[1264px] mx-auto px-[80px]">
        {/* Image Gallery */}
        <section className="pt-6" id="photos">
          <ImageGallery images={listingData.images} title={listingData.title} />
        </section>

        {/* Two Column Layout: Info + Booking */}
        <div className="relative flex flex-col lg:flex-row gap-12 mt-8">
          {/* Left Column - Listing Details */}
          <div className="flex-1 lg:max-w-[calc(100%-380px)]">
            <ListingInfo
              type={listingData.type}
              location={listingData.location}
              host={listingData.host}
              stats={listingData.stats}
              rating={listingData.rating}
              reviewCount={listingData.reviewCount}
              highlights={listingData.highlights}
              description={listingData.description}
            />

            {/* Where you'll sleep */}
            <div className="animate-section">
              <WhereYouSleep />
            </div>

            {/* Amenities */}
            <div id="amenities" className="animate-section">
              <Amenities amenities={listingData.amenities} />
            </div>

            {/* Calendar Section */}
            <div className="animate-section py-8">
              <Calendar />
            </div>
          </div>

          {/* Right Column - Promo + Booking Card (Desktop) */}
          <div className="hidden lg:block w-[372px] flex-shrink-0">
            <div className="sticky top-[88px] pt-4">
              <BookingCard
                price={listingData.price}
                rating={listingData.rating}
                reviewCount={listingData.reviewCount}
                cleaningFee={listingData.cleaningFee}
                serviceFee={listingData.serviceFee}
              />
            </div>
          </div>
        </div>

        {/* Full-width separator */}
        <div className="border-t border-airbnb-border mt-4"></div>

        {/* Full Width Sections */}
        <div className="animate-section">
          <Reviews
            reviews={listingData.reviews}
            rating={listingData.rating}
            reviewCount={listingData.reviewCount}
          />
        </div>

        <div className="animate-section">
          <LocationMap />
        </div>

        <div className="animate-section">
          <HostSection host={listingData.host} />
        </div>

        <div className="animate-section">
          <HouseRules
            rules={listingData.houseRules}
            cancellationPolicy={listingData.cancellationPolicy}
            safetyItems={listingData.safetyItems}
          />
        </div>

        <div className="animate-section">
          <MoreStays />
        </div>
      </main>

      {/* Mobile Booking Bar */}
      <MobileBookingBar
        price={listingData.price}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
      />
    </div>
  );
}
