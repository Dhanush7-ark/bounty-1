"use client";

import { useState } from "react";
import { X, Calendar, Phone, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [selectedFocus, setSelectedFocus] = useState<string>("Autonomous Workflows");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "10-50",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  const handleReset = () => {
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-3xl bg-[#10110E] border border-white/10 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(198,255,54,0.06)] overflow-hidden z-10"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(198,255,54,0.15),transparent_70%)] blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {step === "form" ? (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#161814] border border-[#C6FF36]/30 text-[#C6FF36] text-[10px] font-mono mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>PRIVATE ARCHITECTURE SESSION</span>
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-white tracking-tight">
                    Book a Free Consultation
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Connect directly with an AI automation architect to map out high-impact workflows for your team.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Focus Selection */}
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Primary Automation Goal
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Autonomous Workflows",
                        "Data Pipelines",
                        "App Integrations",
                        "Custom AI Agents",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSelectedFocus(item)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                            selectedFocus === item
                              ? "bg-[#C6FF36]/15 border-[#C6FF36] text-[#C6FF36] shadow-[0_0_12px_rgba(198,255,54,0.15)]"
                              : "bg-[#161814] border-white/10 text-neutral-300 hover:border-white/20"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161814] border border-white/10 focus:border-[#C6FF36] text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161814] border border-white/10 focus:border-[#C6FF36] text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company & Team Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161814] border border-white/10 focus:border-[#C6FF36] text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                        Team Size
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161814] border border-white/10 focus:border-[#C6FF36] text-sm text-white focus:outline-none transition-colors"
                      >
                        <option value="1-10">1-10 people</option>
                        <option value="10-50">10-50 people</option>
                        <option value="50-250">50-250 people</option>
                        <option value="250+">250+ people</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 rounded-xl bg-[#C6FF36] hover:bg-[#b8f02f] text-black font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(198,255,54,0.3)] transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Consultation Request</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <p className="text-[11px] font-mono text-neutral-500 text-center">
                    30-minute strategic walkthrough • No sales pressure • Guaranteed response within 4 hours
                  </p>
                </form>
              </>
            ) : (
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#C6FF36]/15 border border-[#C6FF36] flex items-center justify-center text-[#C6FF36] mb-4 shadow-[0_0_25px_rgba(198,255,54,0.35)]">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="font-syne text-xl font-bold text-white mb-2">
                  Consultation Confirmed!
                </h4>
                <p className="text-sm text-neutral-300 max-w-sm mb-6 leading-relaxed">
                  Thanks, <span className="text-[#C6FF36]">{formData.name || "friend"}</span>. Our lead automation architect will email you at{" "}
                  <span className="text-white font-mono">{formData.email}</span> with calendar availability for your session.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Return to Experience
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
