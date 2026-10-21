import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Project from "@/utils/models/Project";
import Service from "@/utils/models/Service";
import Review from "@/utils/models/Review";
import Faq from "@/utils/models/Faq";
import Material from "@/utils/models/Material";
import Setting from "@/utils/models/Setting";
import Inquiry from "@/utils/models/Inquiry";

export async function POST() {
  try {
    await dbConnect();

    // Check & Seed Projects
    const projectCount = await Project.countDocuments({});
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: "Modern Villa",
          category: "Villa",
          location: "Indore, Madhya Pradesh",
          bhk: "5 BHK",
          sqft: "4,200 sq. ft.",
          duration: "14 months",
          imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
          description: "Ultra-luxury modern villa with double-height glass facade, private landscaped deck, and premium Italian marble finishes.",
          isFeatured: true,
          order: 1,
        },
        {
          title: "Bungalow Project",
          category: "Bungalow",
          location: "Indore, Madhya Pradesh",
          bhk: "4 BHK",
          sqft: "4,200 sq. ft.",
          duration: "12 months",
          imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
          description: "Contemporary family bungalow featuring grand portico, expansive terrace garden, and smart home automation integration.",
          isFeatured: true,
          order: 2,
        },
        {
          title: "Contemporary Home",
          category: "Residential",
          location: "Indore, Madhya Pradesh",
          bhk: "3 BHK",
          sqft: "3,800 sq. ft.",
          duration: "9 months",
          imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
          description: "Architectural masterpiece blending natural warm wood slats, textured concrete, and large open living concepts.",
          isFeatured: true,
          order: 3,
        },
      ]);
    }

    // Check & Seed Services
    const serviceCount = await Service.countDocuments({});
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          title: "Residential Construction",
          description: "Modern homes designed for comfort and functionality",
          icon: "Home",
          order: 1,
        },
        {
          title: "Renovation & Remodeling",
          description: "Give your old space a new life",
          icon: "Wrench",
          order: 2,
        },
        {
          title: "Bungalow Construction",
          description: "Spacious and elegant bungalows for your family",
          icon: "Building2",
          order: 3,
        },
        {
          title: "Interior & Exterior Work",
          description: "Elegant interiors & lasting exteriors",
          icon: "Paintbrush",
          order: 4,
        },
        {
          title: "Villa Construction",
          description: "Luxury villas crafted for a premium lifestyle",
          icon: "Castle",
          order: 5,
        },
        {
          title: "Land Development",
          description: "From raw land to ready-to-build plots",
          icon: "Layers",
          order: 6,
        },
      ]);
    }

    // Check & Seed Materials
    const materialCount = await Material.countDocuments({});
    if (materialCount === 0) {
      await Material.insertMany([
        {
          name: "TMT Steel",
          standard: "Fe 550D Grade",
          description: "Certified seismic and corrosion resistant reinforcement bars for structural integrity.",
          order: 1,
        },
        {
          name: "Premium Cement",
          standard: "Grade 53 OPC/PPC",
          description: "High early strength and superior binding capability for longevity.",
          order: 2,
        },
        {
          name: "Quality Bricks & Blocks",
          standard: "High-Density Autoclaved AAC",
          description: "Superior thermal insulation and precision alignment reducing dead loads.",
          order: 3,
        },
        {
          name: "Natural Stone & Tiles",
          standard: "First-Choice Marble & Granite",
          description: "Precision-cut natural stones and heavy-duty vitrified designer tiles.",
          order: 4,
        },
        {
          name: "Long-lasting Finishes",
          standard: "Weather-Shield Polymers",
          description: "Anti-fungal, UV-resistant exterior coating and luxury silk interior finishes.",
          order: 5,
        },
      ]);
    }

    // Check & Seed Reviews
    const reviewCount = await Review.countDocuments({});
    if (reviewCount === 0) {
      await Review.insertMany([
        {
          name: "Rajesh Sharma",
          location: "Indore",
          rating: 5,
          text: "The team was professional, transparent and delivered our villa on time. The quality is simply outstanding.",
          projectTitle: "Modern Villa, Indore",
          imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
          order: 1,
        },
        {
          name: "Vikram Patel",
          location: "Indore",
          rating: 5,
          text: "From foundation soil tests to finishing touches, Shreeji Constructions delivered beyond our expectations. Zero budget surprises.",
          projectTitle: "Bungalow Project, Indore",
          imgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
          order: 2,
        },
      ]);
    }

    // Check & Seed FAQs
    const faqCount = await Faq.countDocuments({});
    if (faqCount === 0) {
      await Faq.insertMany([
        {
          question: "What is the typical timeline for a villa construction?",
          answer: "A standard 3,500 to 5,000 sq. ft. villa typically takes between 10 to 14 months from excavation to handover, including all structural tests and complete interior finishing.",
          category: "Timeline",
          order: 1,
        },
        {
          question: "Do you provide material and design support?",
          answer: "Yes, we provide end-to-end solutions including architectural floor plans, 3D exterior elevations, structural calculations, and supply of lab-certified construction materials.",
          category: "Services",
          order: 2,
        },
        {
          question: "Is it possible to make changes during construction?",
          answer: "Yes, we accommodate design modifications where structurally viable. Any variations are documented with transparent cost/schedule adjustments before implementation.",
          category: "Process",
          order: 3,
        },
        {
          question: "Do you handle approvals and documentation?",
          answer: "Yes, our team assists clients with municipal sanction plans, building map approvals, structural safety certificates, and utility connection documentation.",
          category: "Approvals",
          order: 4,
        },
      ]);
    }

    // Check & Seed Sample Inquiry
    const inquiryCount = await Inquiry.countDocuments({});
    if (inquiryCount === 0) {
      await Inquiry.create({
        name: "Devendra Verma",
        email: "devendra.verma@example.com",
        phone: "+91 98260 12345",
        projectType: "Luxury Villa",
        message: "Looking to build a 4,500 sq ft modern villa on a 50x60 corner plot in Vijay Nagar, Indore. Need complete structural & turnkey estimate.",
        budget: "1.5 Cr+",
        plotSize: "3000 sq ft",
        status: "New",
      });
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
