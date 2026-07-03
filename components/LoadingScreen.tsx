// components/LoadingScreen.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      const eased = Math.round(Math.min(100, (current / steps) * 100 * (1 - Math.pow(1 - current / steps, 2))));
      setProgress(eased);

      if (current >= steps) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          style={{
            background: "radial-gradient(ellipse at center, #0d0a02 0%, #000000 70%)",
          }}
        >
          {/* Gold glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(245,176,66,0.12) 0%, transparent 60%)",
            }}
          />

          {/* Headlights */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex gap-16">
            {[0, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.2, 0.8, 0.4, 0.9, 0.2],
                  boxShadow: [
                    "0 0 20px rgba(245,176,66,0.3)",
                    "0 0 80px rgba(245,176,66,0.8)",
                    "0 0 40px rgba(245,176,66,0.5)",
                    "0 0 100px rgba(245,176,66,0.9)",
                    "0 0 20px rgba(245,176,66,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay }}
                className="w-10 h-10 rounded-full bg-gold/20 blur-lg"
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              {/* BS Circle Logo */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto border-2 border-gold/30"
                style={{
                  background: "radial-gradient(circle, rgba(245,176,66,0.2) 0%, rgba(0,0,0,0.8) 70%)",
                  boxShadow: "0 0 60px rgba(245,176,66,0.3)",
                }}
              >
                <span className="font-playfair text-4xl font-bold text-gold">BS</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-3xl md:text-5xl font-playfair tracking-wider"
            >
              <span className="text-white">BEST &amp; SECURE</span>
              <br />
              <span className="text-gold text-2xl md:text-3xl">TOURS &amp; TRAVELS</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-gray-500 text-xs tracking-[0.4em] uppercase"
            >
              Visakhapatnam &middot; Premium Travels
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8"
            >
              <div className="w-52 h-[3px] bg-white/5 rounded-full overflow-hidden mx-auto">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #c8902a, #F5B042, #ffd780)",
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-gray-600 font-mono">{Math.min(progress, 100)}%</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}