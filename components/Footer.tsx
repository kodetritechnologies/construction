"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight, Building2 } from "lucide-react";

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings }: FooterProps) {
  const companyName = settings?.companyName || "Shreeji Constructions";
  const tagline = settings?.tagline || "Building Your Tomorrow";
  const phone = settings?.phone || "+91 98765 43210";
  const email = settings?.email || "info@shreejiconstructions.com";
  const address = settings?.address || "Indore, Madhya Pradesh";

  return (
    <footer className="bg-[#0B0D0F] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center text-white shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 10h6" />
                  <path d="M9 14h6" />
                  <path d="M9 18h6" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold tracking-wider text-white uppercase font-sans block">
                  {companyName}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#C59B27] uppercase font-medium">
                  {tagline}
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premier residential contractors specializing in bespoke bungalow and luxury villa construction with full architectural, civil and finishing mastery.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#hero" className="hover:text-[#D4AF37] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#D4AF37] transition-colors">Projects</a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#D4AF37] transition-colors">Process</a>
              </li>
              <li>
                <a href="#materials" className="hover:text-[#D4AF37] transition-colors">Materials</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D4AF37] transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans border-b border-white/10 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">Residential Construction</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">Bungalow Construction</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">Villa Construction</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">Renovation & Remodeling</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">Land Development</a>
              </li>
            </ul>
          </div>

          {/* Thumbnail Preview Card */}
          <div className="lg:col-span-3 space-y-4">
            <div className="group rounded-xl overflow-hidden border border-white/10 bg-[#14171B] p-3 shadow-lg">
              <div className="relative h-28 rounded-lg overflow-hidden mb-3">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                  alt="Quality Construction"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h5 className="text-xs font-serif font-bold text-white mb-1">
                Quality Construction
              </h5>
              <p className="text-[11px] text-gray-400 leading-tight">
                For a Better Tomorrow in Indore & Madhya Pradesh.
              </p>
            </div>
            
            <div className="pt-1">
              <Link
                href="/admin"
                className="text-[11px] text-gray-500 hover:text-[#D4AF37] transition-colors flex items-center gap-1"
              >
                <span>Staff Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </div>
          <div className="text-gray-400 font-medium">
            Designed for a stronger tomorrow.
          </div>
        </div>
      </div>
    </footer>
  );
}
