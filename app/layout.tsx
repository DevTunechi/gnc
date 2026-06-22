import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Global Net Computer Training Institute",
  description: "Practical technology training and digital skills development",
  icons: {
    icon: "/gnc-logo.png"
  },
  openGraph: {
    title: "Global Net Computer Training Institute",
    description: "Practical technology training and digital skills development",
    type: "website",
    url: "https://gnctraininginstitute.com",
    images: [
      {
        url: "/gnc-logo.png",
        width: 512,
        height: 512,
        alt: "GNC Logo"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
