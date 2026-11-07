"use client";

import { useState } from "react";
import { ArrowRight, Play, Zap, GitBranch, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface HeroSectionProps {
  onWatchBuild?: () => void;
  onStartFree?: () => void;
}

export function HeroSection({ onWatchBuild, onStartFree }: HeroSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(2);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050505]">
      {/* ─── AMBIENT CINEMATIC LIGHTING & DIAGONAL LIGHT TRAILS ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Olive Green Gradient Halo in Top Center */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(198,255,54,0.12),transparent_70%)] blur-[100px] animate-pulse-glow" />

        {/* Subtle Right Halo behind Dashboard */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(198,255,54,0.08),transparent_65%)] blur-[120px]" />

        {/* Diagonal Glowing Neon-Lime Light Trail SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C6FF36" stopOpacity="0" />
              <stop offset="40%" stopColor="#C6FF36" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#C6FF36" stopOpacity="1" />
              <stop offset="100%" stopColor="#C6FF36" stopOpacity="0" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Flowing Diagonal S-curve Light Trail sweeping behind dashboard */}
          <path
            d="M -100 250 C 300 200, 600 450, 1100 320 C 1400 240, 1600 480, 2000 400"
            fill="none"
            stroke="url(#heroTrailGrad)"
            strokeWidth="2.5"
            filter="url(#glowEffect)"
            strokeDasharray="400 1200"
            style={{
              animation: "lightTrailFlow 16s linear infinite",
            }}
          />
          {/* Secondary faint echo trail */}
          <path
            d="M -50 320 C 350 270, 650 510, 1150 380 C 1450 300, 1650 540, 2050 460"
            fill="none"
            stroke="rgba(198,255,54,0.15)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
        </svg>

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
                  <span className="text-[11px] font-mono text-neutral-400 pl-2 border-l border-white/10">
                    flow_v4_invoice_recovery.rl
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1a2014] border border-[#C6FF36]/30 text-[#C6FF36] text-[10px] font-mono shadow-[0_0_10px_rgba(198,255,54,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse" />
                    LIVE RUNNING
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">Latency: 48ms</span>
                </div>
              </div>

              {/* Workflow Canvas Inner Interface */}
              <div className="p-4 sm:p-7 relative min-h-[440px] flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,rgba(198,255,54,0.03),transparent_60%)]">
                
                {/* SVG Connecting Flow Lines with Self-Drawing and Glowing Moving Particles */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="wireGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C6FF36" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#C6FF36" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="wireGlowHero" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Wire 1: Node 1 (Trigger) to Node 2 (Branch) */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                    d="M 190 85 C 240 85, 240 180, 290 180"
                    fill="none"
                    stroke="#C6FF36"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    filter="url(#wireGlowHero)"
                  />
                  {/* Moving pulse dot along wire 1 */}
                  <circle cx="240" cy="132" r="3.5" fill="#C6FF36" className="animate-ping" />
                  <circle cx="240" cy="132" r="2" fill="#FFFFFF" />

                  {/* Wire 2: Branch Node 2 to Branch A (Enterprise Slack Approval) */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
                    d="M 450 165 C 500 165, 480 100, 540 100"
                    fill="none"
                    stroke="#C6FF36"
                    strokeWidth="2"
                    filter="url(#wireGlowHero)"
                  />
                  {/* Moving pulse dot along wire 2 */}
                  <circle cx="495" cy="132" r="3" fill="#C6FF36" className="animate-pulse" />

                  {/* Wire 3: Branch Node 2 to Branch B (Automated Dunning) */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 1, delay: 1.1, ease: "easeInOut" }}
                    d="M 450 195 C 500 195, 480 270, 540 270"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />

                  {/* Wire 4: Branch A to Final Linear Action */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 0.8, delay: 1.3, ease: "easeInOut" }}
                    d="M 540 100 L 590 100"
                    fill="none"
                    stroke="#C6FF36"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* ─── WORKFLOW NODES CONTAINER WITH SEQUENTIAL APPEARANCE ─── */}
                <div className="relative z-10 flex flex-col gap-6">
                  
                  {/* TOP ROW: NODE 1 TRIGGER */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="card-futuristic-interactive relative p-3.5 sm:p-4 rounded-xl bg-[#161814] border border-[#C6FF36]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(198,255,54,0.1)] w-[190px] sm:w-[210px] group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold">
                            $
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            TRIGGER
                          </span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_8px_#C6FF36]" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Stripe Charge Failed</h4>
                      <p className="text-[11px] font-mono text-[#C6FF36] mt-1">$2,450.00 USD</p>
                    </motion.div>

                    {/* Floating Status Pill: Event Received */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#10110E] border border-white/10 text-[10px] font-mono text-neutral-400 hover:border-[#C6FF36]/30 transition-colors"
                    >
                      <Zap className="w-3 h-3 text-[#C6FF36]" />
                      <span>Webhook • 0.2ms</span>
                    </motion.div>
                  </div>

                  {/* MIDDLE ROW: NODE 2 CONDITIONAL DECISION */}
                  <div className="flex items-center justify-center sm:pl-28">
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                      className="card-futuristic-interactive p-3.5 sm:p-4 rounded-xl bg-[#161814] border border-white/15 w-[200px] sm:w-[230px] shadow-[0_8px_25px_rgba(0,0,0,0.6)] cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-[#C6FF36]" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            DECISION
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">eval(true)</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Customer Tier?</h4>
                      <div className="mt-2 flex items-center gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-[#C6FF36]/15 text-[#C6FF36] border border-[#C6FF36]/30 shadow-[0_0_8px_rgba(198,255,54,0.15)]">
                          ARR &gt; $20k: YES
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* BOTTOM ROW: BRANCHES (HUMAN IN THE LOOP & AUTOMATED) */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 sm:gap-6 pt-2">
                    
                    {/* Branch A: Human in the Loop (Slack Approval) */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                      className="card-futuristic-interactive p-3.5 sm:p-4 rounded-xl bg-[#161814] border border-[#C6FF36]/50 shadow-[0_4px_25px_rgba(198,255,54,0.15)] w-[220px] sm:w-[250px] relative group cursor-pointer"
                    >
                      <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#C6FF36] text-[9px] font-mono font-bold text-black uppercase tracking-wider shadow-[0_0_12px_#C6FF36]">
                        HUMAN STEP
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-4 h-4 rounded bg-[#4A154B] flex items-center justify-center text-white text-[10px] font-bold">
                          #
                        </span>
                        <span className="text-[10px] font-mono text-neutral-300">#revenue-recovery</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Sarah Chen (AE)</h4>
                      <p className="text-[11px] text-neutral-400 mt-1">Granted 7-day grace extension</p>
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#C6FF36]">
                        <span>Approved via Slack</span>
                        <span>09:41 AM</span>
                      </div>
                    </motion.div>

                    {/* Branch B: Automated Dunning (Dimmed Alternate) */}
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="card-futuristic-interactive p-3 rounded-xl bg-[#10110E]/70 border border-white/5 w-[180px] sm:w-[190px] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase">BRANCH (FALSE)</span>
                        <span className="text-[9px] font-mono text-neutral-500">Skipped</span>
                      </div>
                      <p className="text-xs text-neutral-400 font-medium">Standard Dunning Email</p>
                      <span className="text-[10px] font-mono text-neutral-600 block mt-1">Rule: ARR &lt; $20k</span>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Status Bar inside Dashboard */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="mt-6 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-400"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_6px_#C6FF36]" />
                      Execution ID: <span className="text-neutral-500">rec_99x418a</span>
                    </span>
                    <span className="hidden sm:inline text-neutral-600">•</span>
                    <span className="hidden sm:inline text-neutral-400">Total duration: 182ms</span>
                  </div>
                  <span className="text-[#C6FF36] flex items-center gap-1">
                    State: 100% committed
                  </span>
                </motion.div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
