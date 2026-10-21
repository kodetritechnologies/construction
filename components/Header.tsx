"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Phone, Building2 } from "lucide-react";

interface HeaderProps {
  onOpenEstimate?: () => void;
}

export default function Header({ onOpenEstimate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Process", href: "#process" },
    { name: "Materials", href: "#materials" },
    { name: "FAQs", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#111417]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
          : "bg-gradient-to-b from-[#111417]/80 via-[#111417]/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
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
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wider text-white uppercase font-sans group-hover:text-[#D4AF37] transition-colors">
                Shreeji Constructions
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C59B27] uppercase font-medium">
                Building Your Tomorrow
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-200 hover:text-[#D4AF37] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                if (onOpenEstimate) {
                  onOpenEstimate();
                } else {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#C59B27] hover:bg-[#B38B20] text-white text-sm font-semibold shadow-gold transition-all duration-300 hover:shadow-xl hover:translate-y-[-1px] active:translate-y-[0px]"
            >
              <span>Get Free Estimate</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#14171B] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-[#D4AF37] transition-colors py-1.5 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenEstimate) {
                  onOpenEstimate();
                } else {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#C59B27] text-white text-sm font-semibold shadow-gold"
            >
              <span>Get Free Estimate</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+919876543210"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-white/20 text-gray-300 text-sm font-medium hover:bg-white/5"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
