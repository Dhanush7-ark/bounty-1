"use client";

import { useState } from "react";
import { ArrowRight, Play, Zap, GitBranch, ArrowUpRight, Database, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroLightRibbon } from "./HeroLightRibbon";

interface HeroSectionProps {
  onWatchBuild?: () => void;
  onStartFree?: () => void;
}

export function HeroSection({ onWatchBuild, onStartFree }: HeroSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(2);
  const shouldReduceMotion = false;

  return (
    <section className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      {/* ─── AMBIENT CINEMATIC LIGHTING & MATCHED LIGHT RIBBON ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Olive Green Gradient Halo in Top Center */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(198,255,54,0.12),transparent_70%)] blur-[100px] animate-pulse-glow" />

        {/* Subtle Right Halo behind Dashboard */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(198,255,54,0.08),transparent_65%)] blur-[120px]" />

        {/* ─── EXACT MATCH LIGHT RIBBON VORTEX (FROM REFERENCE VIDEO & PHOTO) ─── */}
        <HeroLightRibbon />

        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ─── LEFT COLUMN: HERO COPY & CTAS ─── */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start z-10"
          >
            {/* Small outlined badge */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-neutral-300 mb-8 hover:border-[#C6FF36]/40 hover:shadow-[0_0_15px_rgba(198,255,54,0.15)] transition-all cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse" />
              <span>Open beta / 240 apps connected</span>
              <ArrowUpRight className="w-3 h-3 text-[#C6FF36] opacity-70" />
            </motion.div>

            {/* Large headline with modern sans & italic serif */}
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-white leading-[1.08] mb-6"
            >
              The handoffs run{" "}
              <span className="font-serif-italic font-normal text-[#C6FF36] block sm:inline">
                themselves.
              </span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed max-w-xl mb-10 text-balance"
            >
              Relay runs the steps between your apps and only asks a person when it matters.
            </motion.p>

            {/* Buttons with Premium Hover Effects */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6"
            >
              {/* Primary button: Start free (glow + light sweep) */}
              <button
                onClick={onStartFree}
                className="btn-primary-neon group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C6FF36] text-[#050505] font-semibold text-sm cursor-pointer"
              >
                <span>Start free</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary button: Watch a build, 2 minutes */}
              <button
                onClick={onWatchBuild}
                className="btn-secondary-glow group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#10110E] hover:bg-[#161814] border border-white/10 hover:border-[#C6FF36]/30 text-neutral-200 text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#C6FF36] group-hover:text-black transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch a build, 2 minutes</span>
              </button>
            </motion.div>

            {/* Below the buttons microcopy */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xs font-mono text-neutral-500 tracking-wide flex items-center gap-2"
            >
              <span>Free for 14 days</span>
              <span className="text-neutral-700">/</span>
              <span>No card</span>
              <span className="text-neutral-700">/</span>
              <span>No sales calls</span>
            </motion.p>
          </motion.div>

          {/* ─── RIGHT COLUMN: SOPHISTICATED WORKFLOW AUTOMATION DASHBOARD ─── */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative z-10"
          >
            {/* Ambient Backlight for Dashboard Card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#C6FF36]/15 via-transparent to-[#C6FF36]/5 blur-xl opacity-60 animate-pulse-glow" />

            {/* Dashboard Outer Glass Panel with Gentle Float */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#10110E]/90 border border-white/10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(198,255,54,0.04)] overflow-hidden animate-float-slow">
              
              {/* Dashboard Window Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-[#0a0b09]/80">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-300 pl-2 border-l border-white/10 font-medium">
                    Refunds over 5000 &nbsp;|&nbsp; 3 steps / 1 branch
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1a2014] border border-[#C6FF36]/30 text-[#C6FF36] text-[10px] font-mono shadow-[0_0_10px_rgba(198,255,54,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse" />
                    LIVE RUNNING
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">Latency: 24ms</span>
                </div>
              </div>

              {/* Workflow Canvas Inner Interface */}
              <div className="p-4 sm:p-7 relative min-h-[460px] flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,rgba(198,255,54,0.03),transparent_60%)]">
                
                {/* SVG Connecting Flow Lines with Self-Drawing and Glowing Moving Particles */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="wireGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C6FF36" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#C6FF36" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="wireGlowHero" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Wire 1: Node 1 (Refund created) to Node 2 (Amount over 5000 condition) */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                    d="M 170 85 C 220 85, 230 85, 275 85"
                    fill="none"
                    stroke="#C6FF36"
                    strokeWidth="2"
                    filter="url(#wireGlowHero)"
                  />
                  {/* Glowing moving particle traveling along wire 1 */}
                  <circle r="3.5" fill="#C6FF36" filter="url(#wireGlowHero)">
                    <animateMotion
                      path="M 170 85 C 220 85, 230 85, 275 85"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="1.5" fill="#FFFFFF">
                    <animateMotion
                      path="M 170 85 C 220 85, 230 85, 275 85"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Wire 2: Branch true (Amount over 5000) to Action (Log to warehouse) */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
                    d="M 445 70 C 490 70, 480 160, 520 160"
                    fill="none"
                    stroke="#C6FF36"
                    strokeWidth="2"
                    filter="url(#wireGlowHero)"
                  />
                  {/* Glowing moving particle traveling along wire 2 */}
                  <circle r="3.5" fill="#C6FF36" filter="url(#wireGlowHero)">
                    <animateMotion
                      path="M 445 70 C 490 70, 480 160, 520 160"
                      dur="2.0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="1.5" fill="#FFFFFF">
                    <animateMotion
                      path="M 445 70 C 490 70, 480 160, 520 160"
                      dur="2.0s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Wire 3: Branch else (dimmed alternate path) */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.35 }}
                    transition={{ duration: 1, delay: 1.1, ease: "easeInOut" }}
                    d="M 445 105 C 490 105, 480 230, 520 230"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* ─── WORKFLOW NODES CONTAINER WITH SEQUENTIAL APPEARANCE ─── */}
                <div className="relative z-10 flex flex-col gap-5">
                  
                  {/* TOP ROW: NODE 1 TRIGGER + NODE 2 CONDITION */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Node 1: Refund created */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="card-futuristic-interactive relative p-3 sm:p-3.5 rounded-xl bg-[#161814] border border-[#C6FF36]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(198,255,54,0.1)] w-[160px] sm:w-[175px] group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded bg-[#C6FF36]/15 border border-[#C6FF36]/30 flex items-center justify-center text-[#C6FF36] text-[10px]">
                            ⚡
                          </span>
                          <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400">
                            TRIGGER
                          </span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_6px_#C6FF36]" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Refund created</h4>
                      <p className="text-[10px] font-mono text-[#C6FF36] mt-0.5">Stripe webhook</p>
                    </motion.div>

                    {/* Node 2: Amount over 5000 Condition */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="card-futuristic-interactive relative p-3 sm:p-3.5 rounded-xl bg-[#161814] border border-white/15 w-[190px] sm:w-[210px] shadow-[0_8px_25px_rgba(0,0,0,0.6)] cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <GitBranch className="w-3.5 h-3.5 text-[#C6FF36]" />
                          <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400">
                            CONDITION
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-neutral-500">eval: true</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Amount over 5000</h4>
                      <div className="mt-2 flex items-center justify-between gap-1 text-[9px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-[#C6FF36]/15 text-[#C6FF36] border border-[#C6FF36]/30 font-bold">
                          true
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-neutral-500">
                          else
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* ACTION ROW: LOG TO WAREHOUSE POSTGRES */}
                  <div className="flex justify-end pt-1">
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="card-futuristic-interactive p-3 sm:p-3.5 rounded-xl bg-[#161814] border border-[#C6FF36]/50 shadow-[0_4px_25px_rgba(198,255,54,0.12)] w-[210px] sm:w-[230px] relative group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-[#C6FF36]" />
                          <span className="text-[9px] font-mono uppercase tracking-wider text-[#C6FF36]">
                            ACTION
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-[#C6FF36]">SUCCESS</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Log to warehouse</h4>
                      <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>postgres</span>
                        <span className="text-emerald-400">12ms</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* ─── LAST RUNS EXECUTION TABLE (MATCHING PHOTO) ─── */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="mt-5 pt-3 border-t border-white/5 font-mono text-[11px]"
                >
                  <div className="flex items-center justify-between mb-2 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                    <span>last runs</span>
                    <span className="text-neutral-600">status</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between py-1 px-2 rounded bg-white/[0.02] border border-white/5 hover:border-[#C6FF36]/20 transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#C6FF36]" />
                        <span className="text-neutral-200">invoice reminder</span>
                      </div>
                      <span className="text-[10px] text-neutral-500">14:12:01 • OK</span>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2 rounded bg-[#C6FF36]/5 border border-[#C6FF36]/20">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse" />
                        <span className="text-[#C6FF36] font-medium">Refunds over 5000</span>
                      </div>
                      <span className="text-[10px] text-[#C6FF36]">14:12:15 • 24ms</span>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2 rounded bg-white/[0.02] border border-white/5 hover:border-[#C6FF36]/20 transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-neutral-400" />
                        <span className="text-neutral-400">backend routine</span>
                      </div>
                      <span className="text-[10px] text-neutral-500">14:11:48 • OK</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
