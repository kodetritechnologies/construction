"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Building,
  Image as ImageIcon,
  X,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/utils/swal";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "Villa",
    location: "Indore, Madhya Pradesh",
    bhk: "4 BHK",
    sqft: "4,200 sq. ft.",
    duration: "12 months",
    imageUrl: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && data.projects) {
        setProjects(data.projects);
      }
    } catch (e) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      title: "",
      category: "Villa",
      location: "Indore, Madhya Pradesh",
      bhk: "4 BHK",
      sqft: "4,200 sq. ft.",
      duration: "12 months",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      description: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      category: p.category || "Villa",
      location: p.location || "Indore, Madhya Pradesh",
      bhk: p.bhk || "4 BHK",
      sqft: p.sqft || "4,200 sq. ft.",
      duration: p.duration || "12 months",
      imageUrl: p.imageUrl || "",
      description: p.description || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) {
      toast.error("Title and Image URL are required.");
      return;
    }

    try {
      const endpoint = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Project updated!" : "Project created!");
        setModalOpen(false);
        fetchProjects();
      } else {
        toast.error(data.message || "Failed to save project.");
      }
    } catch (err) {
      toast.error("Error saving project.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete("This project will be removed from your portfolio.");
    if (!confirmed.isConfirmed) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Project deleted successfully");
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (e) {
      toast.error("Error deleting project");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Projects Portfolio ("Our Recent Work")
          </h1>
          <p className="text-xs text-gray-400">
            Showcase your completed bungalows, villas, and modern residential structures
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-xs sm:text-sm font-semibold shadow-gold self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            No projects found. Click "Add New Project" to showcase your work.
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-[#14171B] rounded-2xl border border-white/10 overflow-hidden shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-medium text-white">
                    {proj.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-serif font-bold text-white mb-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">{proj.location}</p>

                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-[#0B0D0F] p-2.5 rounded-xl border border-white/5">
                    <div>
                      <span className="text-gray-500 block">Rooms</span>
                      <span className="text-gray-200 font-semibold">{proj.bhk}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Area</span>
                      <span className="text-gray-200 font-semibold">{proj.sqft}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Timeline</span>
                      <span className="text-gray-200 font-semibold">{proj.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-white/5 flex items-center justify-end gap-2 bg-[#111417]">
                <button
                  onClick={() => openEditModal(proj)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-xs flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#181C20] border border-white/10 rounded-2xl w-full max-w-lg p-6 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h3 className="text-xl font-serif font-bold text-white">
                {editingId ? "Edit Project Details" : "Add New Showcase Project"}
              </h3>
              <p className="text-xs text-gray-400">
                This project will appear in the "Our Recent Work" section on the homepage.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Modern Villa"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Indore, Madhya Pradesh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    BHK Config
                  </label>
                  <input
                    type="text"
                    value={form.bhk}
                    onChange={(e) => setForm({ ...form, bhk: e.target.value })}
                    placeholder="4 BHK"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Total Sq. Ft.
                  </label>
                  <input
                    type="text"
                    value={form.sqft}
                    onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                    placeholder="4,200 sq. ft."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="12 months"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Architectural style, standout features..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white font-semibold shadow-gold"
                >
                  {editingId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
