"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star, Quote, X } from "lucide-react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/utils/swal";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    location: "Indore",
    rating: 5,
    text: "",
    projectTitle: "Modern Villa, Indore",
    imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success && data.reviews) {
        setReviews(data.reviews);
      }
    } catch (e) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      name: "",
      location: "Indore",
      rating: 5,
      text: "",
      projectTitle: "Modern Villa, Indore",
      imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    });
    setModalOpen(true);
  };

  const openEditModal = (r: any) => {
    setEditingId(r._id);
    setForm({
      name: r.name,
      location: r.location || "Indore",
      rating: r.rating || 5,
      text: r.text,
      projectTitle: r.projectTitle || "",
      imgUrl: r.imgUrl || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) {
      toast.error("Name and review text are required.");
      return;
    }

    try {
      const endpoint = editingId ? `/api/reviews/${editingId}` : "/api/reviews";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Review updated!" : "Review added!");
        setModalOpen(false);
        fetchReviews();
      } else {
        toast.error(data.message || "Failed to save review");
      }
    } catch (err) {
      toast.error("Error saving review");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete("This review will be permanently deleted.");
    if (!confirmed.isConfirmed) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Review deleted");
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (e) {
      toast.error("Error deleting review");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Client Testimonials ("What Our Clients Say")
          </h1>
          <p className="text-xs text-gray-400">
            Manage authentic homeowner testimonials and project recommendations
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-xs sm:text-sm font-semibold shadow-gold self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            No testimonials recorded yet.
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-[#14171B] rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500">{rev.location}</span>
                </div>

                <p className="text-sm font-serif italic text-gray-300 mb-4 leading-relaxed">
                  "{rev.text}"
                </p>

                <div className="font-bold text-white text-sm">— {rev.name}</div>
                {rev.projectTitle && (
                  <div className="text-xs text-gray-400">{rev.projectTitle}</div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(rev)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-xs flex items-center gap-1"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#181C20] border border-white/10 rounded-2xl w-full max-w-md p-6 text-white relative shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-white mb-4">
              {editingId ? "Edit Testimonial" : "Add Client Testimonial"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Indore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Rating (1 to 5)
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Good)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Project Reference
                  </label>
                  <input
                    type="text"
                    value={form.projectTitle}
                    onChange={(e) => setForm({ ...form, projectTitle: e.target.value })}
                    placeholder="e.g. Modern Villa, Indore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  placeholder="Client words..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Finished Home Photo URL
                </label>
                <input
                  type="url"
                  value={form.imgUrl}
                  onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white font-semibold"
                >
                  {editingId ? "Save Changes" : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
