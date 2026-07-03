// components/FloatingWhatsApp.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";
import { useState } from "react";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="glass rounded-2xl p-4 w-64 border border-white/10 shadow-2xl"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Best &amp; Secure</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-green-400 text-[10px]">Online · Available 24×7</p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-white/5 rounded-xl p-3 mb-4">
              <p className="text-gray-300 text-xs leading-relaxed">
                👋 Hi! Ready to book your ride?<br />
                Get an instant quote — call or WhatsApp us now!
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <a
                href="https://wa.me/919346609289?text=Hello Best & Secure Tours! I'd like to book a ride."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold py-2.5 px-4 rounded-xl w-full justify-center hover:bg-[#20b85a] transition"
              >
                <MessageCircle size={13} />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+918691333397"
                className="flex items-center gap-2 bg-white/10 text-white text-xs font-semibold py-2.5 px-4 rounded-xl w-full justify-center hover:bg-white/15 transition"
              >
                <Phone size={13} />
                Call +91 86913 33397
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center relative"
        style={{ boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)" }}
        aria-label="Contact via WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageCircle size={26} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ping effect */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
      </motion.button>
    </div>
  );
}