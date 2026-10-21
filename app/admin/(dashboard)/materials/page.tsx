"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Layers, CheckCircle2, X } from "lucide-react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/utils/swal";

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    standard: "",
    description: "",
  });

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/materials");
      const data = await res.json();
      if (data.success && data.materials) {
        setMaterials(data.materials);
      }
    } catch (e) {
      toast.error("Failed to load materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ name: "", standard: "", description: "" });
    setModalOpen(true);
  };

  const openEditModal = (m: any) => {
    setEditingId(m._id);
    setForm({
      name: m.name,
      standard: m.standard,
      description: m.description || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.standard) {
      toast.error("Name and standard specification are required.");
      return;
    }

    try {
      const endpoint = editingId ? `/api/materials/${editingId}` : "/api/materials";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Material updated!" : "Material added!");
        setModalOpen(false);
        fetchMaterials();
      } else {
        toast.error(data.message || "Failed to save material");
      }
    } catch (err) {
      toast.error("Error saving material");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete("This material standard will be removed.");
    if (!confirmed.isConfirmed) return;

    try {
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Material deleted");
        setMaterials((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (e) {
      toast.error("Error deleting material");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Materials & Standards ("Built with the Best Materials")
          </h1>
          <p className="text-xs text-gray-400">
            Define approved grades for TMT Steel, Cement, AAC Bricks, Stones & Finishes
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-xs sm:text-sm font-semibold shadow-gold self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Material</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            Loading materials...
          </div>
        ) : materials.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            No materials specified.
          </div>
        ) : (
          materials.map((mat) => (
            <div
              key={mat._id}
              className="bg-[#14171B] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF5E6]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                  {mat.name}
                </h3>
                <span className="text-xs font-semibold text-[#D4AF37] block mb-2">
                  {mat.standard}
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {mat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(mat)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-xs flex items-center gap-1"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(mat._id)}
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
              {editingId ? "Edit Material" : "Add Material Standard"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Material Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. TMT Steel"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Standard / Grade Specification *
                </label>
                <input
                  type="text"
                  required
                  value={form.standard}
                  onChange={(e) => setForm({ ...form, standard: e.target.value })}
                  placeholder="e.g. Fe 550D High Earthquake Resistance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Why this material ensures structural longevity..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27] resize-none"
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
                  {editingId ? "Save Changes" : "Add Material"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
