// components/Contact.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Camera, MessageCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const contacts = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 86913 33397", "+91 99890 14626"],
      link: "tel:+918691333397",
      color: "from-blue-500/20 to-transparent",
      action: "Tap to Call",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["+91 93466 09289"],
      link: "https://wa.me/919346609289?text=Hello Best & Secure Tours! I'd like to book a ride.",
      color: "from-green-500/20 to-transparent",
      action: "Chat with Us",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["bestsecure1206@gmail.com"],
      link: "mailto:bestsecure1206@gmail.com",
      color: "from-red-500/20 to-transparent",
      action: "Send Email",
    },
    {
      icon: Camera,
      title: "Instagram",
      details: ["@best_secure_travels"],
      link: "https://instagram.com/best_secure_travels",
      color: "from-pink-500/20 to-transparent",
      action: "Follow Us",
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-gradient-to-t from-black to-gray-950 scroll-mt-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold tracking-[0.3em] text-xs font-semibold">GET IN TOUCH</span>
          <h2 className="text-4xl md:text-5xl font-playfair mt-3">Contact Us</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-4 mb-4" />
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            We&apos;re available 24×7. Call, WhatsApp, or email us — we&apos;re always ready to help!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Cards */}
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {contacts.map((contact, index) => (
                <motion.a
                  key={contact.title}
                  href={contact.link}
                  target={contact.title === "Call Us" || contact.title === "Email Us" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass rounded-2xl p-5 group border border-white/5 hover:border-gold/30 transition-all duration-300 block"
                  style={{ boxShadow: "0 0 20px transparent" }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center mb-3 border border-white/10`}>
                    <contact.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{contact.title}</h3>
                  {contact.details.map((d) => (
                    <p key={d} className="text-sm text-gray-400">{d}</p>
                  ))}
                  <p className="text-gold text-xs mt-2 font-semibold group-hover:underline">{contact.action} →</p>
                </motion.a>
              ))}
            </div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Visit Our Office</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Muralinagar, Madhavadhara<br />
                    Visakhapatnam, Andhra Pradesh<br />
                    PIN: 530018
                  </p>
                  <a
                    href="https://maps.google.com/?q=Muralinagar+Madhawadhara+Visakhapatnam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-xs mt-2 inline-block hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Book Banner */}
            <motion.a
              href="https://wa.me/919346609289?text=Hello Best & Secure Tours! I'd like to book a ride."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-all block"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Book Instantly on WhatsApp</p>
                <p className="text-gray-400 text-sm">+91 93466 09289 • Available 24×7</p>
              </div>
              <span className="ml-auto text-green-400 text-sm font-semibold">→</span>
            </motion.a>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden h-[520px] border border-white/8"
          >
            <div className="relative h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.3282889714043!2d83.31746!3d17.7472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39434e06d77e75%3A0x3b0e0e7e7e7e7e7e!2sMuralinagar%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale contrast-110 brightness-75"
              />
              <div className="absolute bottom-4 left-4 right-4 glass-gold rounded-xl p-3">
                <p className="text-gold text-xs font-semibold mb-0.5">Best &amp; Secure Tours &amp; Travels</p>
                <p className="text-gray-400 text-xs">Muralinagar, Madhavadhara, Vizag 530018</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
