"use client";

import { useState } from "react";
import { X, CheckCircle2, ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EstimateModal({ isOpen, onClose }: EstimateModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Luxury Villa",
    plotSize: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Estimate request sent! We will call you shortly.");
        setSubmitted(true);
      } else {
        toast.error(data.message || "Failed to submit request.");
      }
    } catch (err) {
      toast.error("Error submitting estimate request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#181C20] border border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 text-white relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF5E6] text-[#C59B27] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Estimate Request Received</h3>
            <p className="text-gray-300 text-sm">
              Our chief estimator will review your specifications and contact you with a customized project BOQ.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-md bg-[#C59B27] text-white text-sm font-semibold hover:bg-[#B38B20]"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Quick Consultation
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                Get a Free Construction Estimate
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Enter your details below to receive a preliminary cost estimate for your plot in Indore.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#111417] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#111417] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#111417] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                  >
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Bungalow Construction">Bungalow Construction</option>
                    <option value="Residential Home">Residential Home</option>
                    <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                    <option value="Interior Work">Interior Work</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">
                    Plot Size (sq ft)
                  </label>
                  <input
                    type="text"
                    value={formData.plotSize}
                    onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                    placeholder="e.g. 2400 sq. ft."
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#111417] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your plot location, preferred number of floors, timeline..."
                  className="w-full px-3.5 py-2.5 rounded-md bg-[#111417] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C59B27] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-[#C59B27] hover:bg-[#B38B20] text-white text-sm font-semibold shadow-gold transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Estimate Request</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
