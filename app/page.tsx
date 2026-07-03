// app/page.tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SmartBooking from "@/components/SmartBooking";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurFleet from "@/components/OurFleet";
import PremiumExperience from "@/components/PremiumExperience";
import PopularDestinations from "@/components/PopularDestinations";
import CustomerReviews from "@/components/CustomerReviews";
import Gallery from "@/components/Gallery";
import LiveMap from "@/components/LiveMap";
import BookingProcess from "@/components/BookingProcess";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Cursor from "@/components/Cursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <LoadingScreen />
      <Cursor />
      <Navbar />
      <FloatingWhatsApp />
      <Hero />
      <SmartBooking />
      <About />
      <WhyChooseUs />
      <OurFleet />
      <PremiumExperience />
      <PopularDestinations />
      <Gallery />
      <CustomerReviews />
      <LiveMap />
      <BookingProcess />
      <Contact />
      <Footer />
    </main>
  );
}