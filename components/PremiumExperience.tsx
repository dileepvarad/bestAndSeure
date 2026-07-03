// components/PremiumExperience.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plane, Briefcase, Heart, MapPin, Users, Clock, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "Punctual pickups and drops at Visakhapatnam Airport. Flight tracking, name board service, and luggage assistance included.",
    highlights: ["Flight Tracking", "Name Board", "24/7 Available"],
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
    whatsapp: "Airport Transfer booking",
  },
  {
    icon: MapPin,
    title: "Outstation Trips",
    desc: "Comfortable outstation rides to Araku Valley, Borra Caves, Vizianagaram, Rajahmundry, Hyderabad and more.",
    highlights: ["One Way & Round Trip", "Overnight Trips", "Experienced Drivers"],
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    whatsapp: "Outstation trip booking",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    desc: "Dedicated fleet for business executives. GST invoices, monthly contracts, and priority support for corporate accounts.",
    highlights: ["GST Bills", "Monthly Packages", "Executive Fleet"],
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop",
    whatsapp: "Corporate travel inquiry",
  },
  {
    icon: Heart,
    title: "Wedding Rentals",
    desc: "Make your special day unforgettable with decorated luxury vehicles. Innova, Ertiga, and coach buses for wedding parties.",
    highlights: ["Flower Decoration", "Multiple Vehicles", "Special Packages"],
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    whatsapp: "Wedding rental inquiry",
  },
  {
    icon: Users,
    title: "Group Tours",
    desc: "Organize unforgettable group trips with tempo travellers and buses. Ideal for schools, offices, and family outings.",
    highlights: ["Tempo Traveller", "Mini & Full Bus", "Custom Itinerary"],
    img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&h=400&fit=crop",
    whatsapp: "Group tour booking",
  },
  {
    icon: Clock,
    title: "Local City Rides",
    desc: "Quick, affordable city rides within Visakhapatnam. RK Beach, Kailasagiri, hospitals, markets — anywhere you need to go.",
    highlights: ["Per KM Billing", "Quick Booking", "All City Areas"],
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=400&fit=crop",
    whatsapp: "Local city ride booking",
  },
];

export default function PremiumExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" ref={ref} className="py-24 px-6 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold tracking-[0.3em] text-xs font-semibold">WHAT WE OFFER</span>
          <h2 className="text-4xl md:text-5xl font-playfair mt-3">Our Services</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-4 mb-4" />
          <p className="text-gray-400 max-w-lg mx-auto text-sm">
            Every journey deserves exceptional service. We offer a complete range of travel solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-gold/25 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-gold/90 flex items-center justify-center">
                  <service.icon size={18} className="text-black" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-playfair text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.highlights.map((h) => (
                    <span key={h} className="text-[10px] px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold">
                      {h}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://wa.me/919346609289?text=Hello Best & Secure Tours! I am interested in: ${service.whatsapp}. Please share details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gold text-sm font-semibold hover:gap-3 transition-all"
                >
                  Enquire Now <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}