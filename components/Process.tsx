"use client";

import { ArrowUpRight } from "lucide-react";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Planning & Design",
      desc: "Understanding your vision and creating detailed architectural plans.",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80", // Blueprints & architectural drafting
    },
    {
      num: "02",
      title: "Foundation Work",
      desc: "Deep excavation, soil stabilization, and reinforced foundation casting.",
      img: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80", // Rebar footing & foundation work
    },
    {
      num: "03",
      title: "Structural Construction",
      desc: "Erecting precision RCC columns, beams, slab casting, and masonry walls.",
      img: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80", // Structural framework & concrete pillars
    },
    {
      num: "04",
      title: "Interior & Finishing",
      desc: "Adding the final touches, flooring, painting, and turnkey styling to bring your vision to life.",
      img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80", // Finished luxury interior living room
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#111417] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column Text */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
              Our Process
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white leading-[1.2]">
              A Clear Plan <br />
              From Start to Finish
            </h2>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-normal">
              We follow a structured and transparent process to make your construction journey smooth and stress-free.
            </p>

            <div className="pt-2">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all text-sm font-semibold group"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Step Cards (2x2 grid) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="group bg-[#181C20] rounded-2xl overflow-hidden border border-white/10 hover:border-[#C59B27]/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Step Photo */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-900">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181C20] via-transparent to-transparent" />
                </div>

                {/* Step Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37] block mb-1">
                      {step.num}
                    </span>
                    <h3 className="text-lg font-bold font-serif text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
