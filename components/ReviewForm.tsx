"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";

export default function ReviewForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    trip: "",
    text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
    } catch (err) {
      console.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
        <div className="glass max-w-md w-full rounded-3xl p-8 border border-white/10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4">
            <Star className="fill-green-400" size={32} />
          </div>
          <h2 className="text-2xl font-playfair font-bold text-white mb-2">Thank You!</h2>
          <p className="text-gray-400 text-sm mb-6">Your feedback has been submitted successfully and is pending approval.</p>
          <button onClick={onClose} className="w-full bg-gold text-black font-bold py-3 rounded-xl hover:bg-[#e09d35]">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
      <div className="glass max-w-lg w-full rounded-3xl p-6 md:p-8 border border-white/10 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-playfair font-bold text-white mb-2">Write a Review</h2>
        <p className="text-gray-400 text-sm mb-6">Share your experience with Best &amp; Secure Tours.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Your Name *</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-gold outline-none" placeholder="John Doe" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Location</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-gold outline-none" placeholder="e.g. Visakhapatnam" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Trip Type</label>
              <input type="text" value={formData.trip} onChange={e => setFormData({...formData, trip: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-gold outline-none" placeholder="e.g. Airport Transfer" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className="focus:outline-none"
                >
                  <Star size={28} className={star <= formData.rating ? "text-gold fill-gold" : "text-gray-600"} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Your Feedback *</label>
            <textarea required rows={4} value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-gold outline-none resize-none" placeholder="Tell us about your experience..." />
          </div>

          <button type="submit" disabled={submitting} className="w-full bg-gold text-black font-bold py-3.5 rounded-xl hover:bg-[#e09d35] transition-colors disabled:opacity-50 mt-2">
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
