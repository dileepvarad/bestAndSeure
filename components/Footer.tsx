"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Camera, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-[#050b13] pt-20 pb-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,154,58,0.08),transparent_36%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-gold/40 bg-gold/10">
                <span className="font-playfair text-lg font-bold text-gold">BS</span>
              </div>
              <div>
                <h3 className="font-playfair text-white font-bold leading-tight">BEST &amp; SECURE</h3>
                <p className="text-gold text-[10px] tracking-[0.2em]">TOURS &amp; TRAVELS</p>
              </div>
            </div>
            <p className="mb-5 text-sm leading-7 text-slate-400">
              A dependable Visakhapatnam transport partner for airport transfers, corporate travel,
              outstation trips, and group bookings.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/best_secure_travels"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 glass transition hover:border-pink-500/40 hover:bg-pink-500/10"
              >
                <Camera size={15} className="text-slate-300" />
              </a>
              <a
                href="https://wa.me/919346609289"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 glass transition hover:border-green-500/40 hover:bg-green-500/10"
              >
                <MessageCircle size={15} className="text-slate-300" />
              </a>
              <a
                href="tel:+918691333397"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 glass transition hover:border-gold/40 hover:bg-gold/10"
              >
                <Phone size={15} className="text-slate-300" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white">Quick links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Fleet", href: "#fleet" },
                { label: "Destinations", href: "#destinations" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="flex items-center gap-2 transition-colors hover:text-gold">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white">Services</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {[
                "Airport transfers",
                "City rides",
                "Outstation trips",
                "Group tours",
                "Corporate travel",
                "Wedding rentals",
                "Pilgrimage tours",
              ].map((service) => (
                <li key={service}>
                  <a href="#services" className="flex items-center gap-2 transition-colors hover:text-gold">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white">Contact</h4>
            <div className="space-y-4">
              <a href="tel:+918691333397" className="flex gap-3 items-start group">
                <Phone size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-400 group-hover:text-white transition">
                  <p>+91 86913 33397</p>
                  <p>+91 99890 14626</p>
                </div>
              </a>
              <a href="https://wa.me/919346609289" target="_blank" rel="noopener noreferrer" className="flex gap-3 items-start group">
                <MessageCircle size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-400 group-hover:text-white transition">+91 93466 09289</p>
              </a>
              <a href="mailto:bestsecure1206@gmail.com" className="flex gap-3 items-start group">
                <Mail size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-sm break-all text-slate-400 group-hover:text-white transition">bestsecure1206@gmail.com</p>
              </a>
              <div className="flex gap-3 items-start">
                <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-sm leading-relaxed text-slate-400">
                  Muralinagar, Madhavadhara
                  <br />
                  Visakhapatnam 530018
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Best &amp; Secure Tours &amp; Travels. All rights reserved.
          </p>
          <motion.button
            suppressHydrationWarning
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:text-gold"
          >
            Back to top
            <ArrowUpRight size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
