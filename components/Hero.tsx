"use client";

import { ArrowUpRight, MapPin, CheckCircle, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOpenEstimate?: () => void;
}

export default function Hero({ onOpenEstimate }: HeroProps) {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    if (onOpenEstimate) {
      onOpenEstimate();
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Villa Construction"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Layered gradients for rich contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D0F]/90 via-[#0B0D0F]/70 to-[#0B0D0F]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-transparent to-[#0B0D0F]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-3xl">
          {/* Subheading Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C59B27]/40 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E5C158] uppercase font-sans">
              Premium Construction Contractors
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white leading-[1.1] tracking-tight mb-6">
            Complete Home, <br className="hidden sm:block" />
            Bungalow & Villa <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#D4AF37]">
              Construction
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed mb-10 max-w-2xl">
            From foundation to finishing — we bring your vision to life with quality, transparency and commitment.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-16">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#C59B27] hover:bg-[#B38B20] text-white text-base font-semibold shadow-gold transition-all duration-300 hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-[0px]"
            >
              <span>Get Free Estimate</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 text-white hover:text-[#D4AF37] text-base font-medium transition-colors py-2 group border-b border-white/40 hover:border-[#D4AF37]"
            >
              <span>View Our Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Hero Metadata Bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="font-medium text-white">Indore, Madhya Pradesh</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-400">
            <span className="text-white/80">Residential Homes</span>
            <span className="w-1 h-1 rounded-full bg-[#C59B27]" />
            <span className="text-white/80">Bungalows</span>
            <span className="w-1 h-1 rounded-full bg-[#C59B27]" />
            <span className="text-white/80">Luxury Villas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
