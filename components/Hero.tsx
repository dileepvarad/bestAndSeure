"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Phone, ShieldCheck, Star, MapPin, BadgeCheck } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1600;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
        return;
      }
      setCount(Math.floor(current));
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const highlights = [
  { icon: ShieldCheck, label: "Verified drivers" },
  { icon: Clock, label: "24/7 support" },
  { icon: MapPin, label: "Vizag coverage" },
];

const stats = [
  { icon: Star, value: 500, suffix: "+", label: "Trips served" },
  { icon: BadgeCheck, value: 5, suffix: ".0", label: "Google rating" },
  { icon: Clock, value: 24, suffix: "/7", label: "Service hours" },
];

export default function Hero() {
  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,154,58,0.12),transparent_32%),linear-gradient(180deg,rgba(7,17,31,0.55),rgba(7,17,31,0.92))]" />
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&h=1200&fit=crop"
          alt="Premium travel vehicle"
          className="h-full w-full object-cover object-center opacity-18"
        />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] min-h-[calc(100vh-7rem)] py-8 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available across Visakhapatnam
            </div>

            <h1 className="mt-6 font-playfair text-5xl leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Professional travel
              <span className="block text-gold">for every route.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              Best & Secure Tours & Travels provides airport transfers, outstation rides,
              corporate travel, and group transport with a clean booking flow and dependable service.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  <item.icon size={14} className="text-gold" />
                  {item.label}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
              >
                Plan a booking
                <ArrowRight size={16} />
              </a>
              <a
                href="tel:+918691333397"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-gold/40 hover:text-gold"
              >
                <Phone size={16} />
                Call +91 86913 33397
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <stat.icon size={16} />
                    <span className="text-lg font-semibold text-white">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 shadow-[0_24px_90px_rgba(2,6,23,0.4)]">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=1400&fit=crop"
                alt="Premium travel service"
                className="h-[520px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/25 to-transparent" />

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Operating standard</p>
                  <p className="text-sm font-semibold text-white">Clean vehicles, vetted drivers, on-time pickups</p>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Live now
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-2">
                <div className="glass rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Best for</p>
                  <p className="mt-1 text-lg font-semibold text-white">Airport, business, family, and group travel</p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Coverage</p>
                  <p className="mt-1 text-lg font-semibold text-white">Visakhapatnam and major outstation routes</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
