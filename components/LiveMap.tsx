// components/LiveMap.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";

const serviceAreas = [
  { name: "Muralinagar", note: "Our Base" },
  { name: "Madhavadhara", note: "HQ" },
  { name: "Gajuwaka", note: "Coverage" },
  { name: "MVP Colony", note: "Coverage" },
  { name: "Dwaraka Nagar", note: "Coverage" },
  { name: "Steel Plant", note: "Coverage" },
  { name: "Rushikonda", note: "Coverage" },
  { name: "Bheemunipatnam", note: "Coverage" },
];

export default function LiveMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold tracking-[0.3em] text-xs font-semibold">SERVICE AREA</span>
          <h2 className="text-4xl md:text-5xl font-playfair mt-3">We Cover All of Vizag</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-4 mb-4" />
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            From Bheemunipatnam to Gajuwaka — we serve all areas of Visakhapatnam and beyond
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl overflow-hidden h-[420px] border border-white/8 relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243152.40867538724!2d83.21847690949485!3d17.766544352962382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3957756a3e4b5f%3A0x9e5c5e5c5e5c5e5c!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale contrast-110 brightness-70"
            />
            {/* Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass-gold rounded-xl p-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-gold text-xs font-semibold">Active Service Zone</p>
                  <p className="text-gray-400 text-[10px]">Visakhapatnam &amp; surrounding districts</p>
                </div>
                <Navigation size={16} className="text-gold ml-auto flex-shrink-0" />
              </div>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Coverage areas */}
            <div className="glass rounded-2xl p-5 border border-white/8">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-gold" />
                Service Areas in Vizag
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {serviceAreas.map((area) => (
                  <div key={area.name} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-gray-400 text-xs">{area.name}</span>
                    {area.note !== "Coverage" && (
                      <span className="text-[9px] text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">{area.note}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4 border border-white/8 text-center">
                <Clock size={20} className="text-gold mx-auto mb-2" />
                <p className="text-white font-bold text-lg">24 / 7</p>
                <p className="text-gray-500 text-xs">Available Anytime</p>
              </div>
              <div className="glass rounded-xl p-4 border border-white/8 text-center">
                <Navigation size={20} className="text-gold mx-auto mb-2" />
                <p className="text-white font-bold text-lg">50+</p>
                <p className="text-gray-500 text-xs">Routes Covered</p>
              </div>
            </div>

            {/* Outstation coverage */}
            <div className="glass rounded-2xl p-5 border border-white/8">
              <h3 className="text-white font-semibold mb-3 text-sm">Popular Outstation Routes</h3>
              <div className="space-y-2">
                {[
                  { from: "Vizag", to: "Araku Valley", dist: "115 km" },
                  { from: "Vizag", to: "Borra Caves", dist: "90 km" },
                  { from: "Vizag", to: "Rajahmundry", dist: "200 km" },
                  { from: "Vizag", to: "Hyderabad", dist: "620 km" },
                ].map((route) => (
                  <div key={route.to} className="flex items-center justify-between text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-400">{route.from} → {route.to}</span>
                    <span className="text-gold font-semibold">{route.dist}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <a
              href="https://wa.me/919346609289?text=Hello! I need a ride in Visakhapatnam."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-gold/10 border border-gold/20 hover:bg-gold/15 transition group"
            >
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gold" />
                <div>
                  <p className="text-white text-sm font-semibold">Need a ride now?</p>
                  <p className="text-gold text-xs">+91 93466 09289</p>
                </div>
              </div>
              <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}