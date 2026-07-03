"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Car, Clock, MapPin, Users, Navigation2, RotateCcw, Phone } from "lucide-react";

type VehicleRate = {
  rate: number;
  label: string;
  minFare: number;
};

type PackageRow = {
  name: string;
  type: string;
  priceKm: number;
  startingPrice: number;
};

const defaultVehicleRates: Record<string, VehicleRate> = {
  "Swift (Hatchback)": { rate: 11, label: "₹11/km", minFare: 350 },
  "Ertiga (MPV)": { rate: 14, label: "₹14/km", minFare: 450 },
  "Innova (Premium SUV)": { rate: 18, label: "₹18/km", minFare: 600 },
  "Tempo Traveller (12 Seater)": { rate: 24, label: "₹24/km", minFare: 1200 },
  "Mini Bus (20 Seater)": { rate: 30, label: "₹30/km", minFare: 2000 },
  "Coach Bus (40 Seater)": { rate: 40, label: "₹40/km", minFare: 4000 },
};

const destinationDistances: Record<string, number> = {
  "RK Beach": 8,
  "Kailasagiri": 12,
  "Rushikonda Beach": 15,
  "Vizag Airport": 10,
  "Simhachalam Temple": 18,
  "VUDA Park": 9,
  "Araku Valley": 115,
  "Borra Caves": 90,
  "Vizianagaram": 65,
  "Rajahmundry": 200,
  "Hyderabad": 620,
  "Custom Location": 0,
};

function resolveVehicleKey(name: string, type: string) {
  const combined = `${name} ${type}`.toLowerCase();
  if (combined.includes("swift")) return "Swift (Hatchback)";
  if (combined.includes("ertiga")) return "Ertiga (MPV)";
  if (combined.includes("innova")) return "Innova (Premium SUV)";
  if (combined.includes("tempo")) return "Tempo Traveller (12 Seater)";
  if (combined.includes("mini bus")) return "Mini Bus (20 Seater)";
  if (combined.includes("coach bus") || combined.includes("bus")) return "Coach Bus (40 Seater)";
  return null;
}

export default function SmartBooking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [vehicleRates, setVehicleRates] = useState(defaultVehicleRates);
  const [form, setForm] = useState({
    pickup: "Muralinagar, Visakhapatnam",
    destination: "RK Beach",
    customDestination: "",
    date: "",
    time: "",
    passengers: "1",
    vehicle: "Swift (Hatchback)",
    tripType: "One Way",
    name: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let active = true;

    const loadFleetPricing = async () => {
      try {
        const response = await fetch("/api/admin/packages");
        const rows = (await response.json()) as PackageRow[];
        if (!active || !Array.isArray(rows) || rows.length === 0) return;

        setVehicleRates((current) => {
          const next = { ...current };

          rows.forEach((row) => {
            const key = resolveVehicleKey(row.name, row.type);
            if (!key) return;

            const fallback = current[key];
            const rate = Number(row.priceKm) || fallback.rate;
            const minFare = Number(row.startingPrice) || fallback.minFare;

            next[key] = {
              rate,
              minFare,
              label: `₹${rate}/km`,
            };
          });

          return next;
        });
      } catch (error) {
        console.error("Failed to load fleet pricing", error);
      }
    };

    loadFleetPricing();

    return () => {
      active = false;
    };
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const vehicleTypes = Object.keys(vehicleRates);
  const destinations = Object.keys(destinationDistances);
  const isCustom = form.destination === "Custom Location";
  const distance = isCustom ? 20 : destinationDistances[form.destination] ?? 20;

  const priceEstimate = useMemo(() => {
    const selectedRate = vehicleRates[form.vehicle] ?? defaultVehicleRates["Swift (Hatchback)"];
    const tripMultiplier = form.tripType === "Round Trip" ? 2 : 1;
    const tripDistance = distance * tripMultiplier;
    const minimumFareForTrip = selectedRate.minFare * tripMultiplier;
    return Math.round(Math.max(tripDistance * selectedRate.rate, minimumFareForTrip));
  }, [distance, form.tripType, form.vehicle, vehicleRates]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  };

  const destinationLabel =
    isCustom && form.customDestination ? form.customDestination : form.destination;

  const bookingMessage = `Hello Best & Secure Tours!

New Booking Request
Name: ${form.name || "Not provided"}
Phone: ${form.phone || "Not provided"}
Pickup: ${form.pickup}
Destination: ${destinationLabel}
Date: ${form.date || "TBD"}
Time: ${form.time || "TBD"}
Passengers: ${form.passengers}
Vehicle: ${form.vehicle}
Trip Type: ${form.tripType}
Estimated Fare: ₹${priceEstimate}

Please confirm availability.`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!form.pickup.trim() || !form.date || !form.time) {
      return;
    }

    window.open(
      `https://wa.me/919346609289?text=${encodeURIComponent(bookingMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="booking" ref={ref} className="relative overflow-hidden scroll-mt-24 px-6 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(200,154,58,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Instant booking</span>
          <h2 className="mt-3 font-playfair text-4xl md:text-5xl">Book Your Ride</h2>
          <div className="mx-auto mt-4 mb-4 h-[2px] w-20 bg-gold" />
          <p className="mx-auto max-w-md text-sm text-slate-400">
            Fill in the details below to get an estimated fare and send the booking directly on WhatsApp.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl border border-white/8 p-6 md:p-8 lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pickup" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={16} />
                  <input
                    id="pickup"
                    type="text"
                    placeholder="Enter pickup address"
                    value={form.pickup}
                    onChange={(e) => updateField("pickup", e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-white/8 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="destination" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Destination
                </label>
                <div className="relative">
                  <Navigation2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={16} />
                  <select
                    id="destination"
                    value={form.destination}
                    onChange={(e) => updateField("destination", e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-white/8 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-colors [color-scheme:dark] focus:border-gold"
                  >
                    {destinations.map((dest) => (
                      <option key={dest} value={dest} className="bg-slate-900 text-white">
                        {dest}
                        {destinationDistances[dest] ? ` (${destinationDistances[dest]} km)` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                {isCustom && (
                  <input
                    type="text"
                    placeholder="Enter your destination"
                    value={form.customDestination}
                    onChange={(e) => updateField("customDestination", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold"
                  />
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="date" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <input
                      id="date"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/8 py-3.5 pl-11 pr-4 text-sm text-white outline-none [color-scheme:dark] focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="time" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={(e) => updateField("time", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/8 py-3.5 pl-11 pr-4 text-sm text-white outline-none [color-scheme:dark] focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="passengers" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <select
                      id="passengers"
                      value={form.passengers}
                      onChange={(e) => updateField("passengers", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/8 py-3.5 pl-11 pr-4 text-sm text-white outline-none [color-scheme:dark] focus:border-gold"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 30, 40].map((n) => (
                        <option key={n} value={n} className="bg-slate-900 text-white">
                          {n} {n === 1 ? "Passenger" : "Passengers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="vehicle" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Vehicle
                  </label>
                  <div className="relative">
                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <select
                      id="vehicle"
                      value={form.vehicle}
                      onChange={(e) => updateField("vehicle", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/8 py-3.5 pl-11 pr-4 text-sm text-white outline-none [color-scheme:dark] focus:border-gold"
                    >
                      {vehicleTypes.map((vehicle) => (
                        <option key={vehicle} value={vehicle} className="bg-slate-900 text-white">
                          {vehicle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/8 bg-white/5 p-1">
                {["One Way", "Round Trip"].map((tripType) => (
                  <button
                    key={tripType}
                    type="button"
                    onClick={() => updateField("tripType", tripType)}
                    className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all ${
                      form.tripType === tripType ? "bg-gold text-black shadow-lg" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tripType === "Round Trip" && <RotateCcw size={13} />}
                    {tripType}
                  </button>
                ))}
              </div>

              {submitted && (!form.pickup.trim() || !form.date || !form.time) && (
                <p className="rounded-xl border border-red-400/20 bg-red-500/8 px-4 py-3 text-sm text-red-300">
                  Please fill in pickup location, date, and time before booking.
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(200,154,58,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-4 text-base font-bold text-black shadow-lg shadow-gold/20"
              >
                Book Now on WhatsApp
              </motion.button>

              <p className="text-center text-xs text-slate-500">
                Clicking "Book Now" opens WhatsApp with your booking details pre-filled.
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 lg:col-span-2"
          >
            <div
              className="glass rounded-2xl border border-gold/20 p-6 text-center"
              style={{ boxShadow: "0 0 40px rgba(200,154,58,0.08)" }}
            >
              <p className="mb-1 text-sm text-slate-400">Estimated Fare</p>
              <p className="font-playfair text-5xl font-bold text-gold">₹{priceEstimate}</p>
              <p className="mt-2 text-xs text-slate-500">
                {isCustom ? "Approx. 20 km estimate" : `${distance} km · ${form.tripType}`}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-[10px] text-slate-500">Vehicle rate:</span>
                <span className="text-[10px] font-semibold text-gold">{vehicleRates[form.vehicle]?.label}</span>
              </div>
              <p className="mt-3 text-[10px] text-slate-500">
                Estimate excludes tolls, parking, and waiting charges.
              </p>
            </div>

            <div className="glass rounded-2xl border border-white/8 p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Ride Summary</h3>
              <div className="space-y-3">
                {[
                  { label: "From", value: form.pickup || "Not set", icon: MapPin },
                  { label: "To", value: destinationLabel || "Not set", icon: Navigation2 },
                  {
                    label: "When",
                    value: form.date && form.time ? `${form.date} at ${form.time}` : "Choose date and time",
                    icon: Calendar,
                  },
                  { label: "Passengers", value: `${form.passengers} person${Number(form.passengers) > 1 ? "s" : ""}`, icon: Users },
                  { label: "Vehicle", value: form.vehicle, icon: Car },
                  { label: "Trip Type", value: form.tripType, icon: RotateCcw },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start justify-between gap-3 border-b border-white/5 py-2 last:border-0">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Icon size={12} className="text-gold" />
                      {label}
                    </span>
                    <span className="max-w-[55%] truncate text-right text-xs font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-48 overflow-hidden rounded-2xl border border-white/8 glass">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243152.40867538724!2d83.21847690949485!3d17.766544352962382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3957756a3e4b5f%3A0x9e5c5e5c5e5c5e5c!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="brightness-60 contrast-110 grayscale"
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 rounded-lg px-3 py-1.5 glass">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                <span className="font-semibold text-gold">Live</span>
                <span className="text-slate-400">Visakhapatnam Coverage</span>
              </div>
            </div>

            <a
              href="tel:+918691333397"
              className="flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 p-4 transition hover:bg-gold/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold">
                <Phone size={16} className="text-black" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Prefer to call?</p>
                <p className="text-xs text-gold">+91 86913 33397</p>
              </div>
              <span className="ml-auto text-sm text-gold">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
