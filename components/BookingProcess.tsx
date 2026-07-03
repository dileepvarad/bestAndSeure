// components/BookingProcess.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Calendar, Car, UserCheck, Flag } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Contact Us",
    desc: "Call or WhatsApp us with your travel details — pickup, destination, date & time",
    color: "bg-green-500/10 border-green-500/30",
    iconColor: "text-green-400",
  },
  {
    icon: Car,
    title: "Choose Vehicle",
    desc: "Pick the perfect vehicle from our fleet — Swift, Innova, Tempo Traveller, or Bus",
    color: "bg-blue-500/10 border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: Calendar,
    title: "Confirm Booking",
    desc: "Get an instant price quote and confirmation. No advance payment required!",
    color: "bg-gold/10 border-gold/30",
    iconColor: "text-gold",
  },
  {
    icon: UserCheck,
    title: "Driver Arrives",
    desc: "Your verified, professional driver arrives on time at your pickup location",
    color: "bg-purple-500/10 border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Flag,
    title: "Enjoy Your Ride",
    desc: "Sit back, relax, and enjoy a safe, comfortable journey to your destination!",
    color: "bg-red-500/10 border-red-500/30",
    iconColor: "text-red-400",
  },
];

export default function BookingProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 px-6 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold tracking-[0.3em] text-xs font-semibold">HOW IT WORKS</span>
          <h2 className="text-4xl md:text-5xl font-playfair mt-3">Simple, Fast Booking</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-4 mb-4" />
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Booking with Best &amp; Secure is quick and easy. No apps, no wait — just call or WhatsApp!
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-10 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step number connector */}
                <div className="relative flex justify-center mb-4">
                  <div
                    className={`w-20 h-20 rounded-2xl ${step.color} border flex items-center justify-center relative`}
                  >
                    <step.icon size={30} className={step.iconColor} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-black text-[10px] font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-gray-400 text-sm mb-4">Ready to book your ride?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-gold text-black font-bold rounded-full text-sm tracking-wide"
            >
              Book Online Now
            </motion.a>
            <motion.a
              href="https://wa.me/919346609289"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-full text-sm tracking-wide flex items-center gap-2 justify-center"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}