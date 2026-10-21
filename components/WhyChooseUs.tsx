"use client";

import { CheckCircle2, Shield, Clock, Users2, FileCheck } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Experienced team and skilled professionals",
      desc: "Licensed civil engineers, master masons, and seasoned site supervisors.",
      icon: Users2,
    },
    {
      title: "Transparent project planning and costing",
      desc: "Detailed bill of quantities (BOQ) with zero hidden overheads or surprise costs.",
      icon: FileCheck,
    },
    {
      title: "Regular updates and on-site supervision",
      desc: "Weekly video walk-throughs, milestone progress reports, and dedicated site in-charge.",
      icon: Shield,
    },
    {
      title: "Commitment to quality and timely delivery",
      desc: "Contractually backed milestone schedules with rigorous material strength testing.",
      icon: Clock,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Large Finished Luxury Bungalow Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Finished modern bungalow with warm night illumination"
                className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Why Choose Us Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C59B27] block">
              Why Choose Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-gray-900 leading-[1.2]">
              Your Vision, <br />
              Our Responsibility
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
              We focus on quality workmanship, clear communication and timely delivery — ensuring your home is built with care and precision.
            </p>

            <div className="space-y-4 pt-4">
              {points.map((pt) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={pt.title}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-[#C59B27]/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5E6] text-[#C59B27] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-[#C59B27]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 font-serif mb-0.5">
                        {pt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
