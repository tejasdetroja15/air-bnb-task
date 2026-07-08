"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface CalendarProps {
  onDateSelect?: (checkIn: Date | null, checkOut: Date | null) => void;
  inline?: boolean;
}

// Blocked/unavailable dates (these show as faded with strikethrough)
const blockedDates = [
  new Date(2026, 10, 18), // Nov 18
  new Date(2026, 10, 19), // Nov 19
  new Date(2026, 10, 20), // Nov 20
  new Date(2026, 10, 21), // Nov 21
  new Date(2026, 10, 22), // Nov 22
  new Date(2026, 10, 23), // Nov 23
  new Date(2026, 10, 24), // Nov 24
  new Date(2026, 10, 29), // Nov 29
  new Date(2026, 10, 30), // Nov 30
];

function isBlocked(date: Date) {
  return blockedDates.some((d) => isSameDay(d, date));
}

export default function Calendar({ onDateSelect, inline = false }: CalendarProps) {
  // Default to October 2026 to show the pre-selected range
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1));
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(2026, 9, 18));
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(2026, 9, 23));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (calendarRef.current) {
      gsap.fromTo(
        calendarRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    const prev = subMonths(currentMonth, 1);
    if (!isBefore(startOfMonth(prev), startOfMonth(today))) {
      setCurrentMonth(prev);
    }
  };

  const handleDateClick = (date: Date) => {
    if (isBefore(date, today)) return;
    if (isBlocked(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      onDateSelect?.(date, null);
    } else {
      if (isBefore(date, checkIn)) {
        setCheckIn(date);
        setCheckOut(null);
        onDateSelect?.(date, null);
      } else {
        setCheckOut(date);
        onDateSelect?.(checkIn, date);
      }
    }
  };

  const clearDates = () => {
    setCheckIn(null);
    setCheckOut(null);
    onDateSelect?.(null, null);
  };

  const isInRange = (date: Date) => {
    if (checkIn && checkOut) {
      return isAfter(date, checkIn) && isBefore(date, checkOut);
    }
    if (checkIn && hoverDate && !checkOut) {
      const start = isBefore(hoverDate, checkIn) ? hoverDate : checkIn;
      const end = isAfter(hoverDate, checkIn) ? hoverDate : checkIn;
      return isAfter(date, start) && isBefore(date, end);
    }
    return false;
  };

  const renderMonth = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const calStart = startOfWeek(monthStart);
    const calEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calStart, end: calEnd });
    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="flex-1 min-w-[280px]">
        <div className="text-center mb-4">
          <h3 className="text-[14px] font-bold text-airbnb-dark">
            {format(monthDate, "MMMM yyyy")}
          </h3>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div
              key={`${day}-${i}`}
              className="text-center text-[12px] font-semibold text-airbnb-gray py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {weeks.map((week, weekIdx) =>
            week.map((date, dayIdx) => {
              const isCurrentMonth = isSameMonth(date, monthDate);
              const isPast = isBefore(date, today);
              const blocked = isBlocked(date);
              const isDisabled = isPast || blocked;
              const isCheckIn = checkIn && isSameDay(date, checkIn);
              const isCheckOut = checkOut && isSameDay(date, checkOut);
              const isSelected = isCheckIn || isCheckOut;
              const inRange = isInRange(date);

              return (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`relative flex items-center justify-center h-[42px] ${
                    inRange && isCurrentMonth ? "bg-[#F7F7F7]" : ""
                  } ${
                    isCheckIn && isCurrentMonth ? "rounded-l-full bg-[#F7F7F7]" : ""
                  } ${
                    isCheckOut && isCurrentMonth ? "rounded-r-full bg-[#F7F7F7]" : ""
                  }`}
                >
                  {isCurrentMonth ? (
                    <button
                      onClick={() => !isDisabled && handleDateClick(date)}
                      onMouseEnter={() => setHoverDate(date)}
                      onMouseLeave={() => setHoverDate(null)}
                      disabled={isDisabled}
                      className={`w-[40px] h-[40px] flex items-center justify-center rounded-full text-[14px] transition-all duration-150
                        ${isSelected ? "bg-[#222222] text-white font-semibold" : ""}
                        ${!isSelected && !isDisabled ? "hover:border hover:border-[#222222] cursor-pointer" : ""}
                        ${isPast && !blocked ? "text-[#DDDDDD] cursor-not-allowed line-through" : ""}
                        ${blocked ? "text-[#BBBBBB] cursor-not-allowed line-through" : ""}
                        ${!isSelected && !isDisabled && !isPast && !blocked ? "text-[#222222]" : ""}
                        ${inRange && !isSelected ? "text-[#222222]" : ""}
                      `}
                    >
                      {format(date, "d")}
                    </button>
                  ) : (
                    <span className="w-[40px] h-[40px]" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const nights =
    checkIn && checkOut
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  return (
    <div ref={calendarRef} className={`${inline ? "" : ""}`}>
      {/* Header */}
      {!inline && (
        <div className="mb-6">
          <h2 className="text-[22px] font-bold text-airbnb-dark">
            {checkIn && checkOut
              ? `${nights} nights in Candolim`
              : "Select check-in date"}
          </h2>
          <p className="text-[14px] text-airbnb-gray mt-1">
            {checkIn && checkOut
              ? `${format(checkIn, "d MMM yyyy")} - ${format(checkOut, "d MMM yyyy")}`
              : "Add your travel dates for exact pricing"}
          </p>
        </div>
      )}

      {/* Navigation + Months - arrows inline with month titles */}
      <div className="relative">
        {/* Left arrow - aligned with first month title */}
        <button
          onClick={prevMonth}
          className="absolute left-0 top-0 p-2 rounded-full hover:bg-airbnb-hover transition-colors z-10"
        >
          <IoChevronBack className="text-[12px] text-airbnb-dark" />
        </button>
        {/* Right arrow - aligned with second month title */}
        <button
          onClick={nextMonth}
          className="absolute right-0 top-0 p-2 rounded-full hover:bg-airbnb-hover transition-colors z-10"
        >
          <IoChevronForward className="text-[12px] text-airbnb-dark" />
        </button>

        {/* Months - side by side */}
        <div className="flex gap-8 overflow-hidden">
          {renderMonth(currentMonth)}
          <div className="hidden md:block">
            {renderMonth(addMonths(currentMonth, 1))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-airbnb-border">
        {/* Keyboard icon */}
        <div className="w-8 h-8 border border-airbnb-border rounded flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-airbnb-dark">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M6 10h1M10 10h1M14 10h1M18 10h1M6 14h12" strokeLinecap="round" />
          </svg>
        </div>
        <button className="text-[14px] font-bold underline text-airbnb-dark" onClick={clearDates}>
          Clear dates
        </button>
      </div>
    </div>
  );
}
