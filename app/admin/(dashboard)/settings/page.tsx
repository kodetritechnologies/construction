"use client";

import { useEffect, useState } from "react";
import { Settings, Save, CheckCircle2, Building2, Phone, Mail, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    companyName: "Shreeji Constructions",
    tagline: "Building Your Tomorrow",
    phone: "+91 98765 43210",
    whatsapp: "+919876543210",
    email: "info@shreejiconstructions.com",
    address: "Indore, Madhya Pradesh, India",
    experienceYears: "15+",
    projectsCompleted: "120+",
    happyClients: "98%",
    bannerText: "Now accepting bookings for Q1 Villa & Bungalow Construction in Indore & MP.",
    showBanner: true,
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setForm({
          companyName: data.settings.companyName || "Shreeji Constructions",
          tagline: data.settings.tagline || "Building Your Tomorrow",
          phone: data.settings.phone || "+91 98765 43210",
          whatsapp: data.settings.whatsapp || "+919876543210",
          email: data.settings.email || "info@shreejiconstructions.com",
          address: data.settings.address || "Indore, Madhya Pradesh, India",
          experienceYears: data.settings.experienceYears || "15+",
          projectsCompleted: data.settings.projectsCompleted || "120+",
          happyClients: data.settings.happyClients || "98%",
          bannerText: data.settings.bannerText || "",
          showBanner: data.settings.showBanner ?? true,
        });
      }
    } catch (e) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error(data.message || "Failed to update settings");
      }
    } catch (err) {
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">
          Website & Company Settings
        </h1>
        <p className="text-xs text-gray-400">
          Configure company name, phone, WhatsApp, office address, and live announcement banner
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Identity */}
        <div className="bg-[#14171B] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-serif font-bold text-[#D4AF37] border-b border-white/5 pb-2">
            Company Branding
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-[#14171B] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-serif font-bold text-[#D4AF37] border-b border-white/5 pb-2">
            Contact & Location Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                WhatsApp Number (for floating button)
              </label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Office Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Office Address / City
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="bg-[#14171B] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-serif font-bold text-[#D4AF37] border-b border-white/5 pb-2">
            Performance Metrics (Shown in About Section)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Years of Experience
              </label>
              <input
                type="text"
                value={form.experienceYears}
                onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Completed Projects
              </label>
              <input
                type="text"
                value={form.projectsCompleted}
                onChange={(e) => setForm({ ...form, projectsCompleted: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                On-Time Handover %
              </label>
              <input
                type="text"
                value={form.happyClients}
                onChange={(e) => setForm({ ...form, happyClients: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C59B27]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-sm font-semibold shadow-gold transition-all duration-300 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
