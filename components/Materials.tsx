"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Materials() {
  const materialsList = [
    { title: "TMT Steel", spec: "Fe 550D High Earthquake Resistance" },
    { title: "Premium Cement", spec: "Grade 53 Ultratech / Ambuja certified" },
    { title: "Quality Bricks & Blocks", spec: "High Strength AAC & Red Clay" },
    { title: "Natural Stone & Tiles", spec: "Italian Marble, Granite & GVT Vitrified" },
    { title: "Long-lasting Finishes", spec: "Weather-proof exterior & luxury silk interiors" },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="materials" className="py-20 lg:py-28 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Materials Photo Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg h-56 sm:h-64 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80"
                    alt="High grade TMT steel bars"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-40 sm:h-48 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
                    alt="Natural stone and architectural bricks"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg h-40 sm:h-48 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
                    alt="Structural timber and lumber beams"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-56 sm:h-64 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80"
                    alt="Polished luxury marble flooring"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column & Materials Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C59B27] block">
              Quality & Materials
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-gray-900 leading-[1.2]">
              Built with the Best Materials
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
              We use high-quality, industry-approved materials and work with trusted suppliers to ensure durability, safety and long-term value for your home.
            </p>

            {/* Checklist Items */}
            <div className="space-y-3.5 pt-2">
              {materialsList.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-[#FAFAFA] border border-gray-100 hover:border-[#C59B27]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FAF5E6] text-[#C59B27] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#C59B27]" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-gray-900 font-serif block">
                      {item.title}
                    </span>
                    <span className="text-xs text-gray-500">{item.spec}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all text-sm font-semibold group"
              >
                <span>Our Material Standards</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
