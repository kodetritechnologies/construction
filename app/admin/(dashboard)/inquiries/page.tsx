"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Phone,
  Mail,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  X,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { confirmDelete } from "@/utils/swal";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      let url = `/api/inquiries?limit=50`;
      if (statusFilter !== "All") url += `&status=${statusFilter}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Updated to ${newStatus}`);
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete("This client lead will be permanently deleted.");
    if (!confirmed.isConfirmed) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Inquiry deleted successfully");
        setInquiries((prev) => prev.filter((item) => item._id !== id));
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
      }
    } catch (e) {
      toast.error("Error deleting inquiry");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Client Inquiries & Consultation Leads
          </h1>
          <p className="text-xs text-gray-400">
            Track leads generated through website estimate forms and direct requests
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs font-medium self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#14171B] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "New", "Contacted", "In Progress", "Completed", "Archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === st
                  ? "bg-[#C59B27] text-white shadow-gold"
                  : "bg-[#0B0D0F] text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-72">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C59B27]"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300"
          >
            Find
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-[#14171B] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0B0D0F] text-gray-400 uppercase text-[11px] tracking-wider border-b border-white/5">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Client</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Project Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    Loading inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No inquiries found matching criteria.
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-medium text-white">
                      <div>{item.name}</div>
                      {item.plotSize && (
                        <div className="text-[11px] text-gray-500">Plot: {item.plotSize}</div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-300">
                        <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                        <a href={`tel:${item.phone}`} className="hover:underline">
                          {item.phone}
                        </a>
                      </div>
                      {item.email && item.email !== "Not provided" && (
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                          <Mail className="w-3 h-3 text-gray-500" />
                          <span>{item.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 text-gray-300 text-xs border border-white/10">
                        {item.projectType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                        className={`text-xs rounded-lg px-2.5 py-1 font-medium bg-[#0B0D0F] border border-white/10 ${
                          item.status === "New"
                            ? "text-amber-400 border-amber-500/30"
                            : item.status === "Contacted"
                            ? "text-blue-400 border-blue-500/30"
                            : item.status === "In Progress"
                            ? "text-purple-400 border-purple-500/30"
                            : "text-green-400 border-green-500/30"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(item)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4 text-[#D4AF37]" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#181C20] border border-white/10 rounded-2xl w-full max-w-lg p-6 text-white relative shadow-2xl">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Lead Details
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                {selectedInquiry.name}
              </h3>
              <p className="text-xs text-gray-400">
                Received on {new Date(selectedInquiry.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-4 py-2 border-y border-white/10 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 block text-[11px]">Phone Number:</span>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="text-[#D4AF37] font-semibold hover:underline"
                  >
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Email Address:</span>
                  <span className="text-gray-200">{selectedInquiry.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 block text-[11px]">Project Type:</span>
                  <span className="text-white font-medium">{selectedInquiry.projectType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Current Status:</span>
                  <span className="text-[#D4AF37] font-medium">{selectedInquiry.status}</span>
                </div>
              </div>

              {selectedInquiry.plotSize && (
                <div>
                  <span className="text-gray-400 block text-[11px]">Plot Dimensions / Size:</span>
                  <span className="text-gray-200">{selectedInquiry.plotSize}</span>
                </div>
              )}

              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Client Message:</span>
                <div className="p-3.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="px-4 py-2 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
