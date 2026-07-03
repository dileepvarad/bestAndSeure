"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Fuel, ArrowRight, CheckCircle } from "lucide-react";

type Vehicle = {
  id: string;
  name: string;
  type: string;
  priceKm: number;
  startingPrice: number;
  seats: number;
  fuel: string;
  image: string;
  features: string;
  bestFor: string;
  badge: string | null;
};

export default function OurFleet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selected, setSelected] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/admin/packages");
        const data = await res.json();
        setVehicles(data);
      } catch (error) {
        console.error("Failed to load packages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <section id="fleet" ref={ref} className="py-24 px-6 overflow-hidden scroll-mt-24">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold tracking-[0.3em] text-xs font-semibold">OUR FLEET</span>
          <h2 className="text-4xl md:text-5xl font-playfair mt-3">Premium Vehicle Collection</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-4 mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            From cozy sedans to luxurious coaches — we have the perfect vehicle for every journey
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading our fleet...</div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20 text-gray-400 glass rounded-3xl border border-white/10">No vehicles available right now.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setSelected(vehicle.name)}
                onHoverEnd={() => setSelected(null)}
                className={`relative glass rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-gold/30 transition-all duration-300`}
                style={{
                  boxShadow:
                    selected === vehicle.name
                      ? "0 20px 60px rgba(245,176,66,0.15)"
                      : "none",
                }}
              >
                {/* Badge */}
                {vehicle.badge && (
                  <div className="absolute top-4 left-4 z-20 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                    {vehicle.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-white/5">
                  <motion.img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60`} />

                  {/* Price tag */}
                  <div className="absolute top-4 right-4 bg-gold/90 backdrop-blur px-3 py-1.5 rounded-full">
                    <span className="text-black font-bold text-xs">₹{vehicle.priceKm}/km</span>
                  </div>

                  {/* Type pill */}
                  <div className="absolute bottom-4 left-4 glass px-2.5 py-1 rounded-full text-[10px] text-gray-300 border border-white/10">
                    {vehicle.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-playfair text-white">{vehicle.name}</h3>
                      <p className="text-gold text-xs mt-0.5">Best for: {vehicle.bestFor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Starting</p>
                      <p className="text-white font-bold">₹{vehicle.startingPrice}</p>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-4 py-3 border-y border-white/8 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-gold" />
                      <span className="text-xs text-gray-400">{vehicle.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel size={14} className="text-gold" />
                      <span className="text-xs text-gray-400">{vehicle.fuel}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {vehicle.features.split(',').map(f => f.trim()).filter(Boolean).map((f) => (
                      <span key={f} className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-gray-400">
                        <CheckCircle size={9} className="text-gold" />
                        {f}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={`https://wa.me/919346609289?text=Hi! I want to book a ${vehicle.name} (${vehicle.type}). Please share availability and pricing.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 border border-gold/50 text-gold rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 group"
                  >
                    Book {vehicle.name}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
