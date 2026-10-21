"use client";

import { useState } from "react";
import { ArrowUpRight, Send, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Residential Construction",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        toast.success(data.message || "Inquiry sent successfully!");
        setSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "Residential Construction",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to submit inquiry.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#111417] text-white relative overflow-hidden">
      {/* Background architectural blueprint overlay */}
      <div className="absolute inset-0 opacity-10 bg-repeat bg-center pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white leading-[1.2]">
              Let's Build <br />
              Your Dream Home
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
              Get in touch with us for a free consultation and detailed estimate. We'll help you plan, design and build your perfect space.
            </p>

            <div className="pt-6 space-y-4 border-t border-white/10 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 98765 43210 / +91 98260 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@shreejiconstructions.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Right Lead Generation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#181C20] rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF5E6] text-[#C59B27] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Thank You!</h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto">
                    Your inquiry has been submitted. Our construction director will call you within 24 hours with project details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-md bg-[#C59B27] text-white text-sm font-semibold hover:bg-[#B38B20]"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Full Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-md bg-[#111417] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C59B27] transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Phone Number <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-md bg-[#111417] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C59B27] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Email Address <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@example.com"
                        className="w-full px-4 py-3 rounded-md bg-[#111417] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C59B27] transition-colors"
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-md bg-[#111417] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27] transition-colors"
                      >
                        <option value="Residential Construction">Residential Construction</option>
                        <option value="Luxury Villa">Luxury Villa</option>
                        <option value="Bungalow Construction">Bungalow Construction</option>
                        <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                        <option value="Interior & Exterior Work">Interior & Exterior Work</option>
                        <option value="Land Development">Land Development</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your plot size, location, preferred layout or budget requirements..."
                      className="w-full px-4 py-3 rounded-md bg-[#111417] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C59B27] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[#C59B27] hover:bg-[#B38B20] text-white text-sm font-semibold shadow-gold transition-all duration-300 hover:shadow-xl hover:translate-y-[-1px] active:translate-y-[0px] disabled:opacity-60"
                    >
                      {loading ? (
                        <span>Sending Inquiry...</span>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
