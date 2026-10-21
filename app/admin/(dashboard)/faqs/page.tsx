"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, HelpCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/utils/swal";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "General",
  });

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/faqs");
      const data = await res.json();
      if (data.success && data.faqs) {
        setFaqs(data.faqs);
      }
    } catch (e) {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ question: "", answer: "", category: "General" });
    setModalOpen(true);
  };

  const openEditModal = (f: any) => {
    setEditingId(f._id);
    setForm({
      question: f.question,
      answer: f.answer,
      category: f.category || "General",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) {
      toast.error("Question and answer are required.");
      return;
    }

    try {
      const endpoint = editingId ? `/api/faqs/${editingId}` : "/api/faqs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "FAQ updated!" : "FAQ added!");
        setModalOpen(false);
        fetchFaqs();
      } else {
        toast.error(data.message || "Failed to save FAQ");
      }
    } catch (err) {
      toast.error("Error saving FAQ");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete("This FAQ will be removed.");
    if (!confirmed.isConfirmed) return;

    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("FAQ deleted");
        setFaqs((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (e) {
      toast.error("Error deleting FAQ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-xs text-gray-400">
            Provide answers to common homeowner inquiries about permits, costs, and schedules
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-xs sm:text-sm font-semibold shadow-gold self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No FAQs created yet.</div>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq._id}
              className="bg-[#14171B] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#C59B27]/15 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                    {faq.category || "General"}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                <button
                  onClick={() => openEditModal(faq)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-xs flex items-center gap-1"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 text-xs flex items-center gap-1"
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
              {editingId ? "Edit FAQ" : "Add New FAQ"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Timeline, Approvals, Pricing"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="e.g. Do you handle building permissions?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Detailed explanation..."
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
                  {editingId ? "Save Changes" : "Create FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
