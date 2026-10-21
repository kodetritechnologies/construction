"use client";

import { ArrowUpRight, Award, CheckCircle2, ShieldCheck, Users } from "lucide-react";

export default function About() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAFAFA] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C59B27]">
                About Us
              </span>
              <div className="w-12 h-[2px] bg-[#C59B27]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-gray-900 leading-[1.2]">
              Building Better Spaces for Modern Living
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
              We are a team of experienced construction professionals committed to delivering high-quality homes, bungalows and villas. With a focus on detail, transparent communication and on-time delivery, we ensure that your dream home is built exactly the way you imagine it.
            </p>

            {/* Metric Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">15+</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#C59B27] font-serif">120+</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Completed Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">100%</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">On-Time Handover</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm font-semibold group"
              >
                <span>Know More About Us</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80"
                alt="Engineers reviewing blueprints at construction site"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Quality Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white p-4 sm:p-5 rounded-xl shadow-xl border border-gray-100 max-w-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#FAF5E6] text-[#C59B27] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 font-serif">Licensed & Certified</h4>
                <p className="text-xs text-gray-500">Government approved engineers & architectural standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
