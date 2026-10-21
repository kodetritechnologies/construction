"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Materials from "@/components/Materials";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsFaq from "@/components/TestimonialsFaq";
import ContactForm from "@/components/ContactForm";
import EstimateModal from "@/components/EstimateModal";

export default function HomePage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);

  useEffect(() => {
    // Attempt auto-seed if needed and fetch content
    const initData = async () => {
      try {
        await fetch("/api/seed", { method: "POST" });
      } catch (e) {
        // Continue if seed already done or server initializing
      }

      try {
        const [projRes, servRes, revRes, faqRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/services"),
          fetch("/api/reviews"),
          fetch("/api/faqs"),
        ]);

        const [projData, servData, revData, faqData] = await Promise.all([
          projRes.json(),
          servRes.json(),
          revRes.json(),
          faqRes.json(),
        ]);

        if (projData.success && projData.projects?.length > 0) {
          setProjects(projData.projects);
        }
        if (servData.success && servData.services?.length > 0) {
          setServices(servData.services);
        }
        if (revData.success && revData.reviews?.length > 0) {
          setReviews(revData.reviews);
        }
        if (faqData.success && faqData.faqs?.length > 0) {
          setFaqs(faqData.faqs);
        }
      } catch (err) {
        console.error("Data loading error:", err);
      }
    };

    initData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Hero onOpenEstimate={() => setEstimateModalOpen(true)} />
      <About />
      <Services services={services} />
      <Projects
        projects={projects}
        onOpenEstimate={() => setEstimateModalOpen(true)}
      />
      <Process />
      <Materials />
      <WhyChooseUs />
      <TestimonialsFaq reviews={reviews} faqs={faqs} />
      <ContactForm />
      <EstimateModal
        isOpen={estimateModalOpen}
        onClose={() => setEstimateModalOpen(false)}
      />
    </div>
  );
}
