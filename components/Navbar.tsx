// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Fleet", href: "#fleet" },
    { label: "Destinations", href: "#destinations" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "glass py-3 shadow-2xl shadow-black/40" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a href="#home" whileHover={{ scale: 1.02 }} className="relative z-10 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gold/50 flex-shrink-0"
              style={{
                background: "radial-gradient(circle, rgba(200,154,58,0.25) 0%, rgba(5,11,19,0.7) 70%)",
              }}
            >
              <span className="font-playfair text-sm font-bold text-gold">BS</span>
            </div>
            <div>
              <h2 className="text-base md:text-lg font-playfair tracking-wide leading-tight">
                <span className="text-white">BEST &amp; SECURE</span>
              </h2>
              <p className="text-gold text-[10px] tracking-[0.2em] font-semibold leading-none">
                TOURS &amp; TRAVELS
              </p>
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + i * 0.08 }}
                className="text-xs tracking-widest text-slate-300 hover:text-gold transition-colors duration-300 uppercase font-medium"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="tel:+918691333397"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="flex items-center gap-2 text-slate-200 text-sm font-semibold hover:text-gold transition-colors"
            >
              <Phone size={14} />
              8691333397
            </motion.a>
            <motion.a
              href="#booking"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245,176,66,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-gold text-black font-bold text-xs tracking-widest rounded-full uppercase transition-all duration-300"
            >
              Book Ride
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white z-50 relative p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-72 z-40 p-8 pt-24 flex flex-col gap-5 lg:hidden glass"
              style={{
                borderLeft: "1px solid rgba(200,154,58,0.2)",
              }}
            >
              <div className="text-center mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 border border-gold/40"
                  style={{
                    background: "radial-gradient(circle, rgba(200,154,58,0.16) 0%, transparent 70%)",
                  }}
                >
                  <span className="font-playfair text-2xl font-bold text-gold">BS</span>
                </div>
                <p className="text-gold text-[10px] tracking-[0.2em]">BEST &amp; SECURE</p>
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-gold transition-colors text-base tracking-wide border-b border-white/5 pb-3"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="tel:+918691333397"
                className="flex items-center gap-2 text-gold text-sm mt-2"
              >
                <Phone size={14} />
                8691333397
              </a>
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-6 py-3 bg-gold text-black font-bold rounded-full text-center text-sm tracking-widest uppercase"
              >
                Book Ride
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
