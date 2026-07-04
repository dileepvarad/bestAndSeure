"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Car, MapPin, Phone, Star, Wallet, Clock, UserCheck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified drivers",
    desc: "Licensed professionals with background checks and strong local route knowledge.",
    stat: "100%",
    statLabel: "Checked",
  },
  {
    icon: Car,
    title: "Maintained fleet",
    desc: "Clean, comfortable vehicles prepared for city rides, airport runs, and longer trips.",
    stat: "6+",
    statLabel: "Vehicle types",
  },
  {
    icon: MapPin,
    title: "Live coverage",
    desc: "GPS-based routing and active coverage across Visakhapatnam and nearby routes.",
    stat: "Live",
    statLabel: "Tracking",
  },
  {
    icon: Phone,
    title: "Always reachable",
    desc: "Call and WhatsApp support available throughout the day for quick confirmations.",
    stat: "24/7",
    statLabel: "Support",
  },
  {
    icon: Wallet,
    title: "Clear pricing",
    desc: "Straightforward fares with no hidden extras or vague cost surprises.",
    stat: "0",
    statLabel: "Hidden charges",
  },
  {
    icon: Clock,
    title: "On-time arrivals",
    desc: "Planning, scheduling, and punctual arrivals are part of the service promise.",
    stat: "99%",
    statLabel: "On-time rate",
  },
  {
    icon: UserCheck,
    title: "Professional support",
    desc: "Courteous coordination from booking through drop-off, without unnecessary friction.",
    stat: "500+",
    statLabel: "Trips completed",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Why choose us</span>
          <h2 className="mt-3 text-4xl font-playfair md:text-5xl">A steadier way to travel</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            The service is designed for people who want reliability, clear communication, and a more polished
            booking experience.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass rounded-2xl border border-white/8 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <feature.icon size={22} className="text-gold" />
                </div>
                <div className="text-right">
                  <p className="font-playfair text-2xl text-white">{feature.stat}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{feature.statLabel}</p>
                </div>
              </div>

              <h3 className="mt-4 text-sm font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
