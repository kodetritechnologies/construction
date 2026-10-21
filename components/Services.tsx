"use client";

import { Home, Wrench, Building2, Paintbrush, Castle, Layers } from "lucide-react";

interface ServiceItem {
  _id?: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServicesProps {
  services?: ServiceItem[];
}

export default function Services({ services }: ServicesProps) {
  const defaultServices = [
    {
      title: "Residential Construction",
      description: "Modern homes designed for comfort and functionality",
      iconName: "Home",
    },
    {
      title: "Renovation & Remodeling",
      description: "Give your old space a new life",
      iconName: "Wrench",
    },
    {
      title: "Bungalow Construction",
      description: "Spacious and elegant bungalows for your family",
      iconName: "Building2",
    },
    {
      title: "Interior & Exterior Work",
      description: "Elegant interiors & lasting exteriors",
      iconName: "Paintbrush",
    },
    {
      title: "Villa Construction",
      description: "Luxury villas crafted for a premium lifestyle",
      iconName: "Castle",
    },
    {
      title: "Land Development",
      description: "From raw land to ready-to-build plots",
      iconName: "Layers",
    },
  ];

  const items = services && services.length > 0 ? services : defaultServices;

  const getIcon = (name?: string, index: number = 0) => {
    switch (name) {
      case "Home":
        return <Home className="w-5 h-5 text-[#C59B27]" />;
      case "Wrench":
        return <Wrench className="w-5 h-5 text-[#C59B27]" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-[#C59B27]" />;
      case "Paintbrush":
        return <Paintbrush className="w-5 h-5 text-[#C59B27]" />;
      case "Castle":
        return <Castle className="w-5 h-5 text-[#C59B27]" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-[#C59B27]" />;
      default:
        const icons = [
          <Home key="1" className="w-5 h-5 text-[#C59B27]" />,
          <Wrench key="2" className="w-5 h-5 text-[#C59B27]" />,
          <Building2 key="3" className="w-5 h-5 text-[#C59B27]" />,
          <Paintbrush key="4" className="w-5 h-5 text-[#C59B27]" />,
          <Castle key="5" className="w-5 h-5 text-[#C59B27]" />,
          <Layers key="6" className="w-5 h-5 text-[#C59B27]" />,
        ];
        return icons[index % icons.length];
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C59B27]">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-gray-900 leading-[1.2] mb-4">
            End-to-End Construction Solutions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            We handle every stage of construction, so you don't have to worry about a thing.
          </p>
        </div>

        {/* Content Grid: Services on Left, Feature Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Services Cards (2 columns on medium screens) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {items.map((service: any, index) => (
              <div
                key={service._id || service.title}
                className="group p-5 sm:p-6 rounded-xl border border-gray-100 bg-[#FAFAFA] hover:bg-white hover:border-[#C59B27]/40 hover:shadow-xl transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF5E6] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#C59B27] group-hover:text-white transition-all duration-300">
                  {getIcon(service.icon || service.iconName, index)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif mb-1 group-hover:text-[#C59B27] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Showcase Photo with Overlay Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury living and patio construction"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay Badge at Bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 sm:p-8 text-white">
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#E5C158] mb-1">
                  Design • Build • Deliver
                </div>
                <p className="text-xs sm:text-sm text-gray-300">
                  Your complete construction partner from concept to keys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
