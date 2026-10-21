"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Minus, Star, Quote } from "lucide-react";

interface ReviewItem {
  _id?: string;
  name: string;
  location: string;
  rating?: number;
  text: string;
  projectTitle?: string;
  imgUrl?: string;
}

interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
}

interface TestimonialsFaqProps {
  reviews?: ReviewItem[];
  faqs?: FaqItem[];
}

export default function TestimonialsFaq({ reviews, faqs }: TestimonialsFaqProps) {
  const defaultReviews: ReviewItem[] = [
    {
      name: "Rajesh Sharma",
      location: "Indore",
      rating: 5,
      text: "The team was professional, transparent and delivered our villa on time. The quality is simply outstanding.",
      projectTitle: "Modern Villa, Indore",
      imgUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Vikram Patel",
      location: "Indore",
      rating: 5,
      text: "From foundation soil tests to finishing touches, Shreeji Constructions delivered beyond our expectations. Zero budget surprises.",
      projectTitle: "Bungalow Project, Indore",
      imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Anita Choudhary",
      location: "Indore",
      rating: 5,
      text: "Transparent budget, weekly video updates, and zero hidden costs. Building our dream bungalow was completely stress-free.",
      projectTitle: "Contemporary Home, Indore",
      imgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const defaultFaqs: FaqItem[] = [
    {
      question: "What is the typical timeline for a villa construction?",
      answer:
        "A standard 3,500 to 5,000 sq. ft. villa typically takes between 10 to 14 months from excavation to handover, including all structural tests and complete turnkey interior finishing.",
    },
    {
      question: "Do you provide material and design support?",
      answer:
        "Yes, we provide end-to-end solutions including architectural floor plans, 3D exterior elevations, structural calculations, and supply of lab-certified construction materials.",
    },
    {
      question: "Is it possible to make changes during construction?",
      answer:
        "Yes, we accommodate design modifications where structurally viable. Any variations are documented with transparent cost/schedule adjustments before implementation.",
    },
    {
      question: "Do you handle approvals and documentation?",
      answer:
        "Yes, our team assists clients with municipal sanction plans, building map approvals, structural safety certificates, and utility connection documentation.",
    },
  ];

  const reviewItems = reviews && reviews.length > 0 ? reviews : defaultReviews;
  const faqItems = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? reviewItems.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev === reviewItems.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviewItems[activeReviewIdx];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Testimonial & Villa Image */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C59B27] block">
              What Our Clients Say
            </span>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFAFA] border border-gray-100 relative">
              <Quote className="w-8 h-8 text-[#C59B27]/30 mb-4" />

              <p className="text-lg sm:text-xl font-serif text-gray-900 italic leading-relaxed mb-6">
                "{currentReview.text}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <div className="font-bold text-gray-900 font-serif text-base">
                    — {currentReview.name}
                  </div>
                  <div className="text-xs text-gray-500">{currentReview.location}</div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevReview}
                    className="w-8 h-8 rounded-full border border-gray-300 hover:border-[#C59B27] hover:text-[#C59B27] flex items-center justify-center transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="w-8 h-8 rounded-full border border-gray-300 hover:border-[#C59B27] hover:text-[#C59B27] flex items-center justify-center transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Villa Image Card */}
            {currentReview.imgUrl && (
              <div className="rounded-2xl overflow-hidden shadow-lg h-52 sm:h-60 border border-gray-100 bg-gray-100">
                <img
                  src={currentReview.imgUrl}
                  alt={currentReview.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* Right Column: FAQs Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C59B27] block">
              Frequently Asked Questions
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-gray-900 leading-tight">
              Answers to Common Queries
            </h2>

            <div className="space-y-3 pt-2">
              {faqItems.map((faq, index) => {
                const isOpen = openFaqIdx === index;
                return (
                  <div
                    key={faq._id || faq.question}
                    className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-[#C59B27]/50 bg-[#FAF5E6]/30 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
                    >
                      <span className="text-sm sm:text-base font-semibold text-gray-900 font-serif">
                        {faq.question}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                          isOpen ? "bg-[#C59B27] text-white rotate-180" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-[#C59B27]/20 pt-3">
                        {faq.answer}
                      </div>
                    )}
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
