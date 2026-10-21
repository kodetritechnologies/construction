"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import EstimateModal from "@/components/EstimateModal";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<any>(null);
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header onOpenEstimate={() => setEstimateModalOpen(true)} />
      <main className="flex-1 w-full">{children}</main>
      <Footer settings={settings} />
      <FloatingButtons settings={settings} />
      <EstimateModal
        isOpen={estimateModalOpen}
        onClose={() => setEstimateModalOpen(false)}
      />
    </div>
  );
}
