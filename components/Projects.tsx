"use client";

import { useState } from "react";
import { ArrowUpRight, BedDouble, Maximize, Clock, MapPin } from "lucide-react";

interface ProjectItem {
  _id?: string;
  title: string;
  category: string;
  location: string;
  bhk: string;
  sqft: string;
  duration: string;
  imageUrl: string;
  description?: string;
}

interface ProjectsProps {
  projects?: ProjectItem[];
  onOpenEstimate?: () => void;
}

export default function Projects({ projects, onOpenEstimate }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const defaultProjects: ProjectItem[] = [
    {
      title: "Modern Villa",
      category: "Villa",
      location: "Indore, Madhya Pradesh",
      bhk: "5 BHK",
      sqft: "4,200 sq. ft.",
      duration: "14 months",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      description: "Ultra-luxury modern villa with double-height glass facade and landscaped deck.",
    },
    {
      title: "Bungalow Project",
      category: "Bungalow",
      location: "Indore, Madhya Pradesh",
      bhk: "4 BHK",
      sqft: "4,200 sq. ft.",
      duration: "12 months",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      description: "Contemporary family bungalow featuring grand portico and terrace gardens.",
    },
    {
      title: "Contemporary Home",
      category: "Residential",
      location: "Indore, Madhya Pradesh",
      bhk: "3 BHK",
      sqft: "3,800 sq. ft.",
      duration: "9 months",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      description: "Architectural masterpiece blending warm timber slats with textured stone.",
    },
  ];

  const items = projects && projects.length > 0 ? projects : defaultProjects;

  const filteredProjects =
    activeCategory === "All"
      ? items
      : items.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  const categories = ["All", "Villa", "Bungalow", "Residential"];

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#FAFAFA] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-2">
              Featured Projects
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-gray-900 leading-[1.2]">
              Our Recent Work
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#C59B27] text-white shadow-md"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => {
                const el = document.getElementById("contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-[#C59B27] transition-colors ml-4 group"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project._id || project.title}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Photo Box */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium tracking-wide">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-[#C59B27] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Specs Row */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#FAFAFA] rounded-lg">
                    <BedDouble className="w-4 h-4 text-gray-400 group-hover:text-[#C59B27]" />
                    <span className="font-semibold text-gray-800">{project.bhk}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#FAFAFA] rounded-lg">
                    <Maximize className="w-4 h-4 text-gray-400 group-hover:text-[#C59B27]" />
                    <span className="font-semibold text-gray-800">{project.sqft}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#FAFAFA] rounded-lg">
                    <Clock className="w-4 h-4 text-gray-400 group-hover:text-[#C59B27]" />
                    <span className="font-semibold text-gray-800">{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
