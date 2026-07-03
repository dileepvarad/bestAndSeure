"use client";

import { useCallback, useEffect, useState } from "react";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";

type GalleryImage = {
  id: string;
  url: string;
  caption: string | null;
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const fetchImages = useCallback(async () => {
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setImages(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    // 1. Upload file
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (uploadData.url) {
        // 2. Save to database
        await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: uploadData.url, caption }),
        });

        setFile(null);
        setCaption("");
        fetchImages();
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      fetchImages();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-white mb-2">Manage Gallery</h1>
        <p className="text-gray-400 text-sm">Upload images to display on the public gallery.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl p-6 border border-white/10 sticky top-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Upload size={18} className="text-gold" /> Upload New Image
            </h2>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Select Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-black hover:file:bg-[#e09d35]"
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-400 block mb-1">Caption (Optional)</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Innova at Araku Valley"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:border-gold outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={!file || uploading}
                className="w-full bg-gold text-black font-bold py-3 rounded-xl hover:bg-[#e09d35] transition-colors disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </form>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="lg:col-span-2">
          {loading ? (
            <p className="text-gray-400">Loading gallery...</p>
          ) : images.length === 0 ? (
            <div className="text-center p-12 glass rounded-2xl border border-white/10">
              <ImageIcon size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-gray-400">No images uploaded yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden glass border border-white/10">
                  <img src={img.url} alt={img.caption || "Gallery image"} className="w-full h-48 object-cover" />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    {img.caption && <p className="text-white font-semibold mb-2">{img.caption}</p>}
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="bg-red-500 text-white p-2 rounded-lg flex items-center justify-center w-full gap-2 hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
