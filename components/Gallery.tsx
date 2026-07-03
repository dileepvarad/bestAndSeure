"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ImageIcon } from "lucide-react";

type GalleryImage = {
  id: string;
  url: string;
  caption: string | null;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/admin/gallery");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to load gallery", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (!loading && images.length === 0) return null; // Don't render if empty

  return (
    <section id="gallery" ref={ref} className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.3em] text-xs font-semibold flex justify-center items-center gap-2">
            <ImageIcon size={14} /> GALLERY
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair mt-3">Moments with Best &amp; Secure</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-4 mb-4" />
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            A glimpse into our premium fleet and the happy journeys of our travelers.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading gallery...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group rounded-2xl overflow-hidden glass aspect-square border border-white/10"
              >
                <img
                  src={img.url}
                  alt={img.caption || "Travel moment"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-semibold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
