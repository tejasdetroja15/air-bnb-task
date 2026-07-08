"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { IoChevronDown, IoChevronUp, IoFlagOutline } from "react-icons/io5";
import Calendar from "./Calendar";

interface BookingCardProps {
  price: number;
  rating: number;
  reviewCount: number;
  cleaningFee: number;
  serviceFee: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BookingCard(props: BookingCardProps) {
  const [checkIn] = useState("10/18/2026");
  const [checkOut] = useState("10/23/2026");
  const [guests, setGuests] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const handleDateSelect = (inDate: Date | null, outDate: Date | null) => {
    if (inDate && outDate) {
      setShowCalendar(false);
    }
  };

  return (
    <div ref={cardRef} className="space-y-4">
      {/* Promo Banner - Get 10% off */}
      <div className="border border-[#E0E0E0] rounded-2xl px-5 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          {/* Green tag/label icon */}
          <div className="flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 4h10l10 10-10 10L4 14V4z" fill="#2E7D32"/>
              <circle cx="9" cy="9" r="2" fill="white"/>
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-normal text-airbnb-dark">
              Get 10% off your next stay.
            </p>
            <p className="text-[14px] text-airbnb-dark underline font-medium">Terms apply</p>
          </div>
        </div>
        <button className="text-[15px] font-semibold text-airbnb-dark border border-airbnb-dark rounded-lg px-5 py-2 hover:bg-airbnb-hover transition-colors">
          Claim
        </button>
      </div>

      {/* Main Booking Card */}
      <div className="border border-[#E0E0E0] rounded-2xl px-6 pt-6 pb-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] bg-white">
        {/* Price Header */}
        <div className="mb-7">
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-semibold text-airbnb-dark underline decoration-1">₹28,499</span>
            <span className="text-[16px] text-airbnb-dark font-normal ml-1">for 5 nights</span>
          </div>
        </div>

        {/* Date Picker - with rounded-lg top corners */}
        <div className="relative">
          <div
            className="border border-[#B0B0B0] rounded-t-lg grid grid-cols-2 cursor-pointer"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <div className="px-3 py-3 border-r border-[#B0B0B0]">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-airbnb-dark mb-0.5">
                CHECK-IN
              </label>
              <span className="text-[15px] text-airbnb-dark font-normal">
                {checkIn}
              </span>
            </div>
            <div className="px-3 py-3">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-airbnb-dark mb-0.5">
                CHECKOUT
              </label>
              <span className="text-[15px] text-airbnb-dark font-normal">
                {checkOut}
              </span>
            </div>
          </div>

          {/* Guests */}
          <div
            className="border border-t-0 border-[#B0B0B0] rounded-b-lg px-3 py-3 cursor-pointer flex items-center justify-between"
            onClick={() => setShowGuests(!showGuests)}
          >
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-airbnb-dark mb-0.5">
                GUESTS
              </label>
              <span className="text-[15px] text-airbnb-dark font-normal">
                {guests} guests
              </span>
            </div>
            {showGuests ? <IoChevronUp className="text-airbnb-dark text-xl" /> : <IoChevronDown className="text-airbnb-dark text-xl" />}
          </div>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-airbnb-border rounded-xl shadow-xl z-20 p-4">
              <Calendar onDateSelect={handleDateSelect} inline />
            </div>
          )}

          {/* Guests Dropdown */}
          {showGuests && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-airbnb-border rounded-xl shadow-xl z-20 p-4">
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">Adults</p>
                  <p className="text-sm text-airbnb-gray">Age 13+</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-airbnb-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={guests <= 1}
                  >
                    -
                  </button>
                  <span className="w-4 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(3, guests + 1))}
                    className="w-8 h-8 rounded-full border border-airbnb-border flex items-center justify-center hover:border-airbnb-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={guests >= 3}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-xs text-airbnb-gray">
                This place has a maximum of 3 guests.
              </p>
              <button
                className="mt-3 text-sm font-semibold underline"
                onClick={() => setShowGuests(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Free cancellation notice - wide rounded pill with light bg */}
        <div className="mt-5">
          <div className="bg-[#F0F0F0] rounded-full py-2.5 px-4 w-full">
            <p className="text-[14px] text-airbnb-dark text-center">
              Free cancellation before <span className="font-bold">17 October</span>
            </p>
          </div>
        </div>

        {/* Reserve Button - full pill shape (rounded-full) matching the goal */}
        <button className="w-full mt-5 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold py-3.5 rounded-full text-[16px] hover:opacity-90 transition-opacity">
          Reserve
        </button>

        {/* Won't be charged */}
        <p className="text-center text-[14px] text-airbnb-gray mt-4">
          You won&apos;t be charged yet
        </p>
      </div>

      {/* Report this listing */}
      <div className="flex items-center justify-center gap-2 pt-3">
        <IoFlagOutline className="text-[14px] text-airbnb-dark" />
        <button className="text-[14px] text-airbnb-dark underline font-medium">
          Report this listing
        </button>
      </div>
    </div>
  );
}
