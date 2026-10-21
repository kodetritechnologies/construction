"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, ShieldCheck, Building2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || (isLogin ? "Welcome back!" : "Account registered successfully!"));
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Authentication failed.");
        toast.error(data.message || "Authentication failed.");
      }
    } catch (err: any) {
      setError("An unexpected network error occurred.");
      toast.error("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#14171B]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center mx-auto mb-4 shadow-gold">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-white"
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 10h6" />
                <path d="M9 14h6" />
                <path d="M9 18h6" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
              Shreeji Admin Console
            </h1>
            <p className="text-xs text-gray-400 mt-1.5 uppercase tracking-widest">
              Construction Management Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C59B27] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Master Contractor"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0D0F] pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C59B27] transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C59B27] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shreeji.com"
                  className="w-full rounded-xl border border-white/10 bg-[#0B0D0F] pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C59B27] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C59B27] mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-[#0B0D0F] pl-10 pr-11 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C59B27] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-[#C59B27] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#9A7B1C] px-6 py-3.5 text-sm font-bold text-black shadow-gold transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 active:scale-[0.98]"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>{isLogin ? "Sign In to Console" : "Register Admin Account"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle login / register */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              {isLogin ? "First time setup?" : "Already registered as admin?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="ml-1.5 text-[#D4AF37] font-semibold hover:underline"
              >
                {isLogin ? "Register here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <ShieldCheck className="h-3.5 w-3.5 text-[#C59B27]" />
          <span>Secured JWT session authentication</span>
        </div>
      </div>
    </div>
  );
}
