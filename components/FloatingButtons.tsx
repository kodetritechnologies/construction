"use client";

import { MessageCircle, Phone } from "lucide-react";

interface FloatingButtonsProps {
  settings?: any;
}

export default function FloatingButtons({ settings }: FloatingButtonsProps) {
  const whatsappNumber = settings?.whatsapp || "+919876543210";
  const phone = settings?.phone || "+919876543210";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20Shreeji%20Constructions,%20I%20am%20interested%20in%20a%20construction%20estimate.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phone}`}
        aria-label="Direct Phone Call"
        className="w-12 h-12 rounded-full bg-[#C59B27] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
