"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Target, Eye, Award, Users, MapPin } from "lucide-react";

const milestones = [
  { icon: Award, number: "5.0", label: "Google rating" },
  { icon: Users, number: "500+", label: "Happy customers" },
  { icon: MapPin, number: "50+", label: "Routes covered" },
];

const principles = [
  {
    icon: Shield,
    title: "Safety standards",
    desc: "Verified drivers, clean vehicles, and a passenger-first operating mindset.",
  },
  {
    icon: Target,
    title: "Service focus",
    desc: "Airport, city, and outstation transport handled with precise coordination.",
  },
  {
    icon: Eye,
    title: "Long-term trust",
    desc: "A dependable local brand built for repeat bookings and steady service quality.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.98 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 glass">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=900&fit=crop"
                alt="Premium travel service fleet"
                className="h-[500px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/90 via-[#07111f]/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 glass-gold rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">Visakhapatnam based</p>
                <p className="mt-1 font-playfair text-xl text-white">Reliable travel for business and leisure</p>
                <p className="mt-1 text-sm text-slate-300">Muralinagar, Madhavadhara, Visakhapatnam 530018</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {milestones.map((item) => (
                <div key={item.label} className="glass rounded-2xl p-4 text-center">
                  <item.icon size={18} className="mx-auto text-gold" />
                  <p className="mt-2 font-playfair text-2xl text-white">{item.number}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">About us</span>
              <h2 className="mt-3 text-4xl font-playfair leading-tight md:text-5xl">
                A travel partner built on
                <span className="text-gold"> reliability and care</span>
              </h2>
            </div>

            <div className="w-16 h-[2px] bg-gold" />

            <p className="max-w-2xl text-slate-300 leading-8">
              Best & Secure Tours & Travels is a Visakhapatnam-based transport company serving airport
              transfers, corporate travel, outstation trips, and group bookings with a focus on punctuality,
              safety, and clear communication.
            </p>

            <p className="max-w-2xl text-sm leading-7 text-slate-400">
              Our fleet is maintained for comfort, our drivers are professional and verified, and the booking
              experience is designed to feel straightforward for individuals, families, and business teams.
            </p>

            <div className="space-y-4 pt-2">
              {principles.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                    <item.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
