"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle, XCircle, Trash2, Star } from "lucide-react";

type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  trip: string;
  date: string;
  isApproved: boolean;
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    const res = await fetch("/api/admin/reviews");
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    await fetch(`/api/admin/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved: !currentStatus }),
    });
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      fetchReviews();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-white mb-2">Manage Reviews</h1>
        <p className="text-gray-400 text-sm">Approve or delete customer feedback before it appears on the website.</p>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading reviews...</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="glass rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{review.name}</h3>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{review.trip}</span>
                  <div className={`text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 ${review.isApproved ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                    {review.isApproved ? <><CheckCircle size={12} /> Approved</> : "Pending"}
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? "text-gold fill-gold" : "text-gray-600"} />
                  ))}
                  <span className="text-gray-500 text-xs ml-2">• {review.date} • {review.location}</span>
                </div>
                
                <p className="text-gray-300 text-sm italic">&ldquo;{review.text}&rdquo;</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleToggleApproval(review.id, review.isApproved)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                    review.isApproved 
                      ? "bg-white/10 text-gray-300 hover:bg-white/20" 
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {review.isApproved ? <><XCircle size={16} /> Hide</> : <><CheckCircle size={16} /> Approve</>}
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="bg-red-500/10 text-red-400 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-500/20 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-gray-400 p-6 glass rounded-2xl border border-white/10">No reviews found.</p>
          )}
        </div>
      )}
    </div>
  );
}
