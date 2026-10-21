"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Building,
  Star,
  Layers,
  ArrowUpRight,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Inquiry marked as ${newStatus}`);
        loadStats();
      } else {
        toast.error("Failed to update status");
      }
    } catch (e) {
      toast.error("Error updating status");
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#181C20] via-[#14171B] to-[#181C20] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/30 text-xs font-semibold text-[#D4AF37]">
            <span>System Active</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Welcome to Shreeji Constructions Console
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            Monitor incoming client estimates, manage recent architectural works, customer reviews, and site parameters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-xs sm:text-sm font-semibold shadow-gold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/10 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            <span>All Inquiries</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Inquiries */}
        <div className="p-5 rounded-2xl bg-[#14171B] border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium block mb-1">Total Inquiries</span>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {stats?.totalInquiries ?? 0}
            </div>
            <span className="text-[11px] text-[#D4AF37] mt-1 block">
              {stats?.newInquiries ?? 0} new waiting
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FAF5E6]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Projects */}
        <div className="p-5 rounded-2xl bg-[#14171B] border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium block mb-1">Featured Projects</span>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {stats?.totalProjects ?? 0}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Portfolio showcased</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Reviews */}
        <div className="p-5 rounded-2xl bg-[#14171B] border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium block mb-1">Client Reviews</span>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {stats?.totalReviews ?? 0}
            </div>
            <span className="text-[11px] text-green-400 mt-1 block">5.0 Star Average</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: FAQs */}
        <div className="p-5 rounded-2xl bg-[#14171B] border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium block mb-1">Knowledge FAQs</span>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {stats?.totalFaqs ?? 0}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Active on site</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Inquiries Lead Table */}
      <div className="bg-[#14171B] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-white">
              Recent Inquiries & Leads
            </h3>
            <p className="text-xs text-gray-400">
              Clients who requested estimates from the website form
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0B0D0F] text-gray-400 uppercase text-[11px] tracking-wider border-b border-white/5">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Client Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Project Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {stats?.recentInquiries?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No inquiries recorded yet.
                  </td>
                </tr>
              ) : (
                stats?.recentInquiries?.map((item: any) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-medium text-white">
                      <div>{item.name}</div>
                      <div className="text-[11px] text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-300">
                        <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>{item.phone}</span>
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
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "New"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : item.status === "Contacted"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : item.status === "In Progress"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-green-500/10 text-green-400 border border-green-500/20"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                        className="bg-[#0B0D0F] border border-white/10 text-gray-300 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#C59B27]"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
