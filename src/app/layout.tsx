import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Airbnb",
  description: "Serviced apartments for Rent in Candolim, Goa, India - Airbnb Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-airbnb antialiased">
        {children}
      </body>
    </html>
  );
}
