"use client";

import { FaGlobeAmericas } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-airbnb-light border-t border-airbnb-border">
      {/* Main Footer */}
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Support</h3>
            <ul className="space-y-3">
              {[
                "Help Centre",
                "AirCover",
                "Anti-discrimination",
                "Disability support",
                "Cancellation options",
                "Report neighbourhood concern",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-airbnb-dark hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Hosting</h3>
            <ul className="space-y-3">
              {[
                "Become a host",
                "AirCover for Hosts",
                "Hosting resources",
                "Community forum",
                "Hosting responsibly",
                "Join a free Hosting class",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-airbnb-dark hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Airbnb */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Airbnb</h3>
            <ul className="space-y-3">
              {[
                "Newsroom",
                "New features",
                "Careers",
                "Investors",
                "Airbnb.org emergency stays",
                "Gift cards",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-airbnb-dark hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-airbnb-border">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left - Copyright & Links */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-airbnb-dark">
              <span>© 2024 Airbnb, Inc.</span>
              <span>·</span>
              <a href="#" className="hover:underline">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:underline">Terms</a>
              <span>·</span>
              <a href="#" className="hover:underline">Sitemap</a>
              <span>·</span>
              <a href="#" className="hover:underline">Company details</a>
            </div>

            {/* Right - Language, Currency, Social */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm font-semibold">
                <FaGlobeAmericas className="text-base" />
                English (IN)
              </button>
              <span className="text-sm font-semibold">₹ INR</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <FaFacebook className="text-lg" />
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <FaTwitter className="text-lg" />
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <FaInstagram className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
