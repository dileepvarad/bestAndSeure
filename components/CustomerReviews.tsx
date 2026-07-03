"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, PenLine } from "lucide-react";
import ReviewForm from "./ReviewForm";

type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  trip: string;
  date: string;
};

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, isFormOpen]); // Refetch when form closes in case of immediate approval, though usually it's pending.

  const next = () => setCurrentIndex((current) => (current === reviews.length - 1 ? 0 : current + 1));
  const prev = () => setCurrentIndex((current) => (current === 0 ? reviews.length - 1 : current - 1));

  return (
    <section id="reviews" ref={ref} className="py-24 px-6 bg-gradient-to-t from-gray-950 to-black overflow-hidden scroll-mt-24">
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-left">
            <span className="text-gold tracking-[0.3em] text-xs font-semibold">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-5xl font-playfair mt-3">What Our Clients Say</h2>
            <div className="w-20 h-[2px] bg-gold mt-4" />
          </div>
          
          <button
            suppressHydrationWarning
            onClick={() => setIsFormOpen(true)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition"
          >
            <PenLine size={16} className="text-gold" /> Write a Review
          </button>
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 text-gray-400 glass rounded-3xl border border-white/10">No reviews yet. Be the first to review!</div>
        ) : (
          <div className="relative">
            <div className="flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="glass rounded-3xl p-8 md:p-12 w-full max-w-4xl border border-white/5 relative"
                >
                  <Quote size={60} className="absolute top-8 right-8 text-white/5" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < reviews[currentIndex].rating ? "text-gold fill-gold" : "text-gray-600"}
                      />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-playfair italic mb-10">
                    &ldquo;{reviews[currentIndex].text}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-[#c8902a] flex items-center justify-center text-black font-bold text-xl">
                      {reviews[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{reviews[currentIndex].name}</h4>
                      <p className="text-gray-400 text-sm">
                        {reviews[currentIndex].location} • <span className="text-gold">{reviews[currentIndex].trip}</span>
                      </p>
                    </div>
                    <span className="ml-auto text-xs text-gray-500 hidden sm:block">
                      {reviews[currentIndex].date}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition group border border-white/10"
              >
                <ChevronLeft className="text-gray-400 group-hover:text-white transition" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition group border border-white/10"
              >
                <ChevronRight className="text-gray-400 group-hover:text-white transition" />
              </button>
            </div>
          </div>
        )}
      </div>

      {isFormOpen && <ReviewForm onClose={() => setIsFormOpen(false)} />}
    </section>
  );
}
