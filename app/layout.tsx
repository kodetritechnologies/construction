import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shreeji Constructions | Complete Home, Bungalow & Villa Construction",
  description: "From foundation to finishing — we bring your vision to life with quality, transparency and commitment in Indore, Madhya Pradesh.",
  openGraph: {
    title: "Shreeji Constructions | Building Your Tomorrow",
    description: "Premium Construction Contractors for Homes, Bungalows & Luxury Villas in Indore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased selection:bg-[#C59B27] selection:text-white">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#181C20",
              color: "#F9FAFB",
              border: "1px solid rgba(197, 155, 39, 0.3)",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
              borderRadius: "0.75rem",
              padding: "14px 18px",
              fontSize: "0.9rem",
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: "#C59B27",
                secondary: "#181C20",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#181C20",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
