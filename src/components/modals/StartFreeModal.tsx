"use client";

import { useState } from "react";
import { X, Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface StartFreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export function StartFreeModal({ isOpen, onClose, selectedPlan = "Professional" }: StartFreeModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl transition-all">
      <div className="relative w-full max-w-md rounded-3xl bg-[#10110E] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#C6FF36]/15 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161814] border border-[#C6FF36]/30 text-[11px] font-mono text-[#C6FF36] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>14-DAY FULL TRIAL // {selectedPlan.toUpperCase()}</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Start building with Relay.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6 font-normal">
              No credit card required. Connect up to 240 apps and deploy your first handoff in minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0b09] border border-white/10 focus:border-[#C6FF36] focus:outline-none text-white text-sm font-mono placeholder:text-neutral-600 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#C6FF36] hover:bg-[#d5ff5e] text-[#050505] font-semibold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(198,255,54,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Create Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/8 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6FF36]" />
                SOC2 Type II Ready
              </span>
              <span>Instant provisioning</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-[#C6FF36]/20 border border-[#C6FF36] text-[#C6FF36] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(198,255,54,0.4)]">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Check your inbox</h4>
            <p className="text-xs text-neutral-400 font-mono mb-6 max-w-xs mx-auto">
              We&apos;ve sent your magic setup link to <span className="text-[#C6FF36]">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
            >
              Back to site
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

