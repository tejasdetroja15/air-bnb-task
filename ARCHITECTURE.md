# Airbnb Clone - Project Documentation

## Overview

A pixel-perfect Airbnb listing page clone built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. The project replicates the "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10" listing page from Airbnb, featuring smooth scroll animations, responsive design, and an interactive photo tour.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.35 | React framework (App Router) |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first styling |
| GSAP | 3.15.x | Scroll-triggered animations |
| Swiper | 14.x | Image carousels/sliders |
| date-fns | 4.4.x | Date formatting & manipulation |
| react-icons | 5.7.x | Icon library |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    Next.js App Router                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Layout (layout.tsx)                                        │ │
│  │  ├── Global CSS (globals.css)                               │ │
│  │  └── Font Configuration (Geist)                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────┐    ┌──────────────────────────────┐    │
│  │  / (Home Page)       │    │  /photos (Photo Tour Page)   │    │
│  │  page.tsx            │    │  photos/page.tsx             │    │
│  └──────────┬──────────┘    └──────────────────────────────┘    │
└─────────────┼───────────────────────────────────────────────────┘
              │
┌─────────────▼───────────────────────────────────────────────────┐
│                      COMPONENTS LAYER                             │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │   Header    │  │  StickyNav   │  │   MobileBookingBar    │  │
│  └─────────────┘  └──────────────┘  └───────────────────────┘  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  LEFT COLUMN                                                 ││
│  │  ┌──────────────┐ ┌──────────────┐ ┌─────────────────────┐ ││
│  │  │ ImageGallery │ │ ListingInfo  │ │  WhereYouSleep      │ ││
│  │  └──────────────┘ └──────────────┘ └─────────────────────┘ ││
│  │  ┌──────────────┐ ┌──────────────┐                          ││
│  │  │  Amenities   │ │   Calendar   │                          ││
│  │  └──────────────┘ └──────────────┘                          ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌──────────────────────────┐                                    │
│  │  RIGHT COLUMN (Sticky)   │                                    │
│  │  ┌────────────────────┐  │                                    │
│  │  │   BookingCard      │  │                                    │
│  │  └────────────────────┘  │                                    │
│  └──────────────────────────┘                                    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  FULL-WIDTH SECTIONS                                         ││
│  │  ┌─────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐││
│  │  │ Reviews │ │ LocationMap │ │ HostSection │ │ HouseRules│││
│  │  └─────────┘ └─────────────┘ └─────────────┘ └───────────┘││
│  │  ┌───────────┐ ┌──────────┐                                 ││
│  │  │ MoreStays │ │  Footer  │                                 ││
│  │  └───────────┘ └──────────┘                                 ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
              │
┌─────────────▼───────────────────────────────────────────────────┐
│                        DATA LAYER                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  src/data/listing.ts                                        │ │
│  │  ├── Listing metadata (title, location, type)               │ │
│  │  ├── Host information                                       │ │
│  │  ├── Pricing & fees                                         │ │
│  │  ├── Amenities                                              │ │
│  │  ├── Reviews                                                │ │
│  │  ├── House rules & policies                                 │ │
│  │  └── Image references                                       │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
              │
┌─────────────▼───────────────────────────────────────────────────┐
│                     STATIC ASSETS (public/)                       │
│  ├── Property photos (rooms, exteriors, pool, gym)               │
│  ├── Host/profile images                                         │
│  ├── Logo & branding assets                                      │
│  └── UI decorative elements (laurels)                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
airbnb-clone/
├── public/                    # Static assets (images, icons)
│   ├── *.jpeg/png/jpg         # Property & profile photos
│   └── airbnb-logo.png        # Brand assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── page.tsx           # Home page (main listing)
│   │   ├── globals.css        # Global styles & Tailwind
│   │   ├── photos/
│   │   │   └── page.tsx       # Photo tour page
│   │   └── fonts/             # Custom fonts (Geist)
│   ├── components/            # Reusable UI components
│   │   ├── Header.tsx         # Top navigation bar
│   │   ├── StickyNav.tsx      # Scroll-aware sticky nav
│   │   ├── ImageGallery.tsx   # Hero image grid
│   │   ├── ListingInfo.tsx    # Title, host, highlights
│   │   ├── WhereYouSleep.tsx  # Bedroom preview section
│   │   ├── Amenities.tsx      # Amenities list
│   │   ├── Calendar.tsx       # Date picker / availability
│   │   ├── BookingCard.tsx    # Sticky booking widget
│   │   ├── Reviews.tsx        # Guest reviews section
│   │   ├── LocationMap.tsx    # Map section
│   │   ├── HostSection.tsx    # Host profile & info
│   │   ├── HouseRules.tsx     # Rules & policies
│   │   ├── MoreStays.tsx      # Similar listings
│   │   ├── MobileBookingBar.tsx # Mobile CTA bar
│   │   └── Footer.tsx         # Site footer
│   └── data/
│       └── listing.ts         # Static listing data
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies & scripts
```

---

## Key Features

### Pages
- **Home (`/`)** - Full Airbnb listing page with all sections
- **Photo Tour (`/photos`)** - Dedicated photo gallery with lightbox

### UI/UX Features
- Scroll-triggered animations using GSAP ScrollTrigger
- Sticky booking card on desktop
- Mobile-responsive booking bar
- Sticky navigation with section anchors
- Photo lightbox with fullscreen view
- Image hover zoom effects
- Two-column responsive layout (content + booking card)

### Responsive Design
- Desktop: Two-column layout with sticky booking card
- Mobile: Single column with bottom booking bar

---

## Data Flow

```
listing.ts (static data)
     │
     ▼
page.tsx (Home)
     │
     ├──► Header (no props)
     ├──► StickyNav (no props)
     ├──► ImageGallery ◄── images[], title
     ├──► ListingInfo ◄── type, location, host, stats, rating, highlights, description
     ├──► WhereYouSleep (no props)
     ├──► Amenities ◄── amenities[]
     ├──► Calendar (no props)
     ├──► BookingCard ◄── price, rating, reviewCount, cleaningFee, serviceFee
     ├──► Reviews ◄── reviews[], rating, reviewCount
     ├──► LocationMap (no props)
     ├──► HostSection ◄── host
     ├──► HouseRules ◄── rules[], cancellationPolicy, safetyItems[]
     ├──► MoreStays (no props)
     └──► MobileBookingBar ◄── price, rating, reviewCount
```

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd airbnb-clone

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Animation System

The project uses GSAP (GreenSock Animation Platform) with ScrollTrigger for smooth scroll-based animations:

- Sections fade in and slide up as they enter the viewport
- Trigger point: when section top reaches 88% of viewport
- Animation: opacity 0→1, translateY 30px→0
- Duration: 0.7s with `power2.out` easing

---

## Design Decisions

1. **Static Data**: Listing data is stored in a TypeScript file (`src/data/listing.ts`) rather than fetched from an API, keeping the clone simple and fast.
2. **App Router**: Uses Next.js 14 App Router for modern file-based routing.
3. **Client Components**: Pages use `"use client"` directive for GSAP animations and interactive state.
4. **Tailwind CSS**: Utility-first approach for rapid UI development matching Airbnb's design system.
5. **Unoptimized Images**: `next.config.mjs` sets `images.unoptimized: true` for static export compatibility.

---

## Contributors

- Tejas Detroja (Developer)

---

## License

This project is for educational purposes only. Airbnb is a registered trademark of Airbnb, Inc.
