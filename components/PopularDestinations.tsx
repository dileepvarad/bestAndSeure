// components/PopularDestinations.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "RK Beach",
    desc: "Vizag's iconic beachfront",
    distance: "8 km",
    time: "20 min",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
  },
  {
    name: "Kailasagiri",
    desc: "Hilltop park with panoramic sea views",
    distance: "12 km",
    time: "30 min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  },
  {
    name: "Araku Valley",
    desc: "Scenic coffee plantation valley",
    distance: "115 km",
    time: "3 hrs",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop",
    popular: true,
  },
  {
    name: "Borra Caves",
    desc: "Ancient limestone cave formations",
    distance: "90 km",
    time: "2.5 hrs",
    image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&h=400&fit=crop",
  },
  {
    name: "Vizag Airport",
    desc: "Visakhapatnam International Airport",
    distance: "10 km",
    time: "25 min",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
  },
  {
    name: "Simhachalam",
    desc: "Famous Narasimha Swamy Temple",
    distance: "18 km",
    time: "40 min",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
  },
  {
    name: "Rushikonda Beach",
    desc: "Golden sands & water sports",
    distance: "15 km",
    time: "35 min",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
  },
  {
    name: "Hyderabad",
    desc: "City of Nizams — outstation trip",
    distance: "620 km",
    time: "10 hrs",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop",
    popular: true,
  },
];

export default function PopularDestinations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="destinations" ref={ref} className="py-24 px-6 scroll-mt-24">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold tracking-[0.3em] text-xs font-semibold">EXPLORE</span>
          <h2 className="text-4xl md:text-5xl font-playfair mt-3">Popular Destinations</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-4 mb-4" />
          <p className="text-gray-400 max-w-lg mx-auto text-sm">
            From the beaches of Vizag to the valleys of Araku — we know every route
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest, index) => (
            <motion.a
              key={dest.name}
              href={`https://wa.me/919346609289?text=Hi! I want to book a ride to ${dest.name} from Visakhapatnam. Please share pricing.`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-2xl overflow-hidden group relative border border-white/5 hover:border-gold/30 transition-all duration-300 cursor-pointer block"
            >
              {dest.popular && (
                <div className="absolute top-3 right-3 z-20 bg-gold text-black text-[9px] font-bold px-2 py-0.5 rounded-full">
                  POPULAR
                </div>
              )}
              <div className="h-44 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="p-4">
                <h3 className="font-playfair text-base text-white mb-1">{dest.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{dest.desc}</p>

                <div className="flex items-center justify-between text-[10px] text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={9} className="text-gold" />
                    {dest.distance}
                  </span>
                  <span>~{dest.time}</span>
                </div>

                <div className="flex items-center gap-1 text-gold text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Book Now <ArrowRight size={11} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
