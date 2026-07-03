"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

type Package = {
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

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "", type: "", priceKm: 0, startingPrice: 0, seats: 4,
    fuel: "Diesel", image: "", features: "", bestFor: "", badge: ""
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await fetch("/api/admin/packages");
    const data = await res.json();
    setPackages(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/admin/packages/${editingId}` : "/api/admin/packages";
    
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    setEditingId(null);
    fetchPackages();
  };

  const handleEdit = (pkg: Package) => {
    setFormData({
      name: pkg.name, type: pkg.type, priceKm: pkg.priceKm, startingPrice: pkg.startingPrice,
      seats: pkg.seats, fuel: pkg.fuel, image: pkg.image, features: pkg.features,
      bestFor: pkg.bestFor, badge: pkg.badge || ""
    });
    setEditingId(pkg.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
      fetchPackages();
    }
  };

  const openNew = () => {
    setFormData({
      name: "", type: "", priceKm: 0, startingPrice: 0, seats: 4,
      fuel: "Diesel", image: "", features: "", bestFor: "", badge: ""
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-white mb-2">Manage Packages &amp; Fleet</h1>
          <p className="text-gray-400 text-sm">Add, update, or remove tour packages and vehicles.</p>
        </div>
        <button
          onClick={openNew}
          className="bg-gold text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#e09d35] transition"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="glass rounded-2xl p-5 border border-white/10">
              <img src={pkg.image} alt={pkg.name} className="w-full h-40 object-cover rounded-xl mb-4 bg-white/5" />
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white">{pkg.name}</h3>
                {pkg.badge && <span className="bg-gold/20 text-gold text-[10px] px-2 py-1 rounded-full">{pkg.badge}</span>}
              </div>
              <p className="text-sm text-gray-400 mb-4">{pkg.type} • {pkg.seats} Seats</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <p className="text-gold font-bold">₹{pkg.priceKm}/km</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(pkg)} className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500/20">
                    <Edit size={14} />
                  </button>
                  <button onClick={() => handleDelete(pkg.id)} className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
          <div className="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{editingId ? "Edit Package" : "Add New Package"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Name (e.g. Maruti Swift)</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Type (e.g. Hatchback)</label>
                  <input type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Price per km (₹)</label>
                  <input type="number" value={formData.priceKm} onChange={e => setFormData({...formData, priceKm: Number(e.target.value)})} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Min. Starting Price (₹)</label>
                  <input type="number" value={formData.startingPrice} onChange={e => setFormData({...formData, startingPrice: Number(e.target.value)})} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Seats</label>
                  <input type="number" value={formData.seats} onChange={e => setFormData({...formData, seats: Number(e.target.value)})} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Fuel Type</label>
                  <input type="text" value={formData.fuel} onChange={e => setFormData({...formData, fuel: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
                </div>
              </div>
              
              <div>
                <label className="text-xs text-gray-400 block mb-1">Image URL</label>
                <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
              </div>
              
              <div>
                <label className="text-xs text-gray-400 block mb-1">Features (comma separated)</label>
                <input type="text" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} required placeholder="AC, GPS Tracking, Music System" className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Best For</label>
                  <input type="text" value={formData.bestFor} onChange={e => setFormData({...formData, bestFor: e.target.value})} required placeholder="Couples, Small Families" className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Badge (Optional)</label>
                  <input type="text" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} placeholder="e.g. Popular" className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-400 hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-gold text-black font-bold hover:bg-[#e09d35]">{editingId ? "Save Changes" : "Add Package"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
