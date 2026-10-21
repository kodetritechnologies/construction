import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0D0F] text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center mx-auto shadow-gold">
          <span className="text-2xl font-bold font-serif text-white">404</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Page Under Construction
        </h1>
        <p className="text-gray-400 text-sm">
          The page you are looking for does not exist or has been relocated.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C59B27] hover:bg-[#B38B20] text-white text-sm font-semibold shadow-gold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
