"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Briefcase, X, Home, Wrench, Building2, Paintbrush, Castle, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/utils/swal";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "Home",
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success && data.services) {
        setServices(data.services);
      }
    } catch (e) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      icon: "Home",
    });
    setModalOpen(true);
  };

  const openEditModal = (s: any) => {
    setEditingId(s._id);
    setForm({
      title: s.title,
      description: s.description,
      icon: s.icon || "Home",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required.");
      return;
    }

    try {
      const endpoint = editingId ? `/api/services/${editingId}` : "/api/services";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Service updated!" : "Service added!");
        setModalOpen(false);
        fetchServices();
      } else {
        toast.error(data.message || "Failed to save service");
      }
    } catch (err) {
      toast.error("Error saving service");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete("This service will be deleted.");
    if (!confirmed.isConfirmed) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Service deleted");
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (e) {
      toast.error("Error deleting service");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Construction Services
          </h1>
          <p className="text-xs text-gray-400">
            Manage the service offerings shown in the "End-to-End Solutions" section
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-xs sm:text-sm font-semibold shadow-gold self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            No services configured.
          </div>
        ) : (
          services.map((serv) => (
            <div
              key={serv._id}
              className="bg-[#14171B] rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/15 text-[#D4AF37] border border-[#C59B27]/30 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-2">
                  {serv.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {serv.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(serv)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-xs flex items-center gap-1"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(serv._id)}
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
              {editingId ? "Edit Service" : "Add Construction Service"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Villa Construction"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Icon Type
                </label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                >
                  <option value="Home">Home / Residential</option>
                  <option value="Castle">Castle / Villa</option>
                  <option value="Building2">Building2 / Bungalow</option>
                  <option value="Wrench">Wrench / Renovation</option>
                  <option value="Paintbrush">Paintbrush / Interiors</option>
                  <option value="Layers">Layers / Land Development</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Summary of this service..."
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
                  {editingId ? "Save" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
