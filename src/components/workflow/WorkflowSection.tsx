"use client";

import { useState } from "react";
import { Play, RotateCcw, CheckCircle, Clock, ShieldAlert, DollarSign, UserCheck, Send, Database } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function WorkflowSection() {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // fully executed by default

  const scenarios = [
    {
      id: "chargeback",
      title: "Invoice & Chargeback Resolution",
      triggerName: "Stripe Dispute Created",
      triggerParam: "Amount: $4,200 (Risk Score: 78)",
      conditionName: "Is Customer Tier VIP?",
      branchTrueName: "Route to Concierge Ops",
      branchFalseName: "Automated Dispute Filing",
      actionName: "Ping Sarah on Slack & Pause Subscription in Postgres",
    },
    {
      id: "onboarding",
      title: "Enterprise Tenant Provisioning",
      triggerName: "Contract Signed via HubSpot",
      triggerParam: "Plan: Enterprise ($60k ARR)",
      conditionName: "Dedicated VPC Required?",
      branchTrueName: "Spin up AWS RDS + VPC",
      branchFalseName: "Assign Shared Cluster",
      actionName: "Generate SAML SSO + Invite Org Admin via Slack",
    },
    {
      id: "incident",
      title: "SOC2 Security Incident Escalate",
      triggerName: "GitHub Token Exposed in PR",
      triggerParam: "Severity: Critical (prod-db)",
      conditionName: "Token Active in Production?",
      branchTrueName: "Immediate Revocation",
      branchFalseName: "Warn Author & Close PR",
      actionName: "Revoke AWS IAM Key & Page Security Lead on Call",
    },
  ];

  const current = scenarios[selectedScenario];

  const handleSimulateRun = () => {
    setIsRunning(true);
    setActiveStepIndex(0);

    setTimeout(() => setActiveStepIndex(1), 600);
    setTimeout(() => setActiveStepIndex(2), 1400);
    setTimeout(() => {
      setActiveStepIndex(3);
      setIsRunning(false);
    }, 2200);
  };

  return (
    <section id="workflow" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(198,255,54,0.08),transparent_70%)] blur-[120px] animate-pulse-glow" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-[#C6FF36] mb-4">
              <span>CANVAS ARCHITECTURE // LIVE SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Automate the{" "}
              <span className="font-serif-italic font-normal text-[#C6FF36]">
                messy middle.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed max-w-2xl">
              Real workflows have human exceptions, conditional dead-ends, and multi-app handoffs. Relay orchestrates every branch without dropping state.
            </p>
          </div>

          {/* Interactive Scenario Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#10110E] border border-white/10 self-start md:self-auto shadow-lg">
            {scenarios.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenario(idx);
                  setActiveStepIndex(3);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                  selectedScenario === idx
                    ? "bg-[#C6FF36] text-[#050505] font-semibold shadow-[0_0_18px_rgba(198,255,54,0.4)] scale-105"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── INTERACTIVE WORKFLOW CANVAS DISPLAY ─── */}
        <ScrollReveal delay={0.15} className="relative rounded-3xl bg-[#10110E]/90 border border-white/10 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_35px_rgba(198,255,54,0.03)] overflow-hidden">
          
          {/* Top Canvas Toolbar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/8 bg-[#0a0b09]/80 gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-neutral-300 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_8px_#C6FF36]" />
                {current.title}
              </span>
              <span className="text-neutral-600 font-mono text-xs">|</span>
              <span className="text-xs font-mono text-neutral-400">Environment: Production (us-east-1)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSimulateRun}
                disabled={isRunning}
                className="btn-primary-neon inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6FF36] text-[#050505] text-xs font-mono font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing step {activeStepIndex + 1}...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Simulate Test Run</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Flow Nodes Visualizer */}
          <div className="p-6 sm:p-12 relative min-h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(198,255,54,0.02),transparent_70%)]">
            
            {/* SVG Interactive Connection Lines with Glowing Pulse Particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <filter id="wirePulseFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Line 1: Trigger to Decision */}
              <line
                x1="220"
                y1="120"
                x2="380"
                y2="120"
                stroke={activeStepIndex >= 1 ? "#C6FF36" : "rgba(255,255,255,0.15)"}
                strokeWidth="2"
                strokeDasharray={activeStepIndex >= 1 ? "none" : "4 4"}
                filter={activeStepIndex >= 1 ? "url(#wirePulseFilter)" : undefined}
              />
              {activeStepIndex >= 1 && (
                <circle cx="300" cy="120" r="3.5" fill="#C6FF36" className="animate-ping" />
              )}

              {/* Line 2: Decision to Branch True (Upper) */}
              <path
                d="M 580 120 C 640 120, 640 60, 710 60"
                fill="none"
                stroke={activeStepIndex >= 2 ? "#C6FF36" : "rgba(255,255,255,0.15)"}
                strokeWidth="2"
                filter={activeStepIndex >= 2 ? "url(#wirePulseFilter)" : undefined}
              />
              {activeStepIndex >= 2 && (
                <circle cx="650" cy="85" r="3" fill="#C6FF36" className="animate-pulse" />
              )}

              {/* Line 3: Decision to Branch False (Lower) */}
              <path
                d="M 580 120 C 640 120, 640 220, 710 220"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Line 4: Branch True to Action Node */}
              <line
                x1="910"
                y1="60"
                x2="970"
                y2="60"
                stroke={activeStepIndex >= 3 ? "#C6FF36" : "rgba(255,255,255,0.15)"}
                strokeWidth="2"
                filter={activeStepIndex >= 3 ? "url(#wirePulseFilter)" : undefined}
              />
              {activeStepIndex >= 3 && (
                <circle cx="940" cy="60" r="3.5" fill="#C6FF36" className="animate-pulse" />
              )}
            </svg>

            {/* Nodes Grid */}
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-4">
              
              {/* NODE 1: TRIGGER NODE */}
              <div
                className={`card-futuristic-interactive p-5 rounded-2xl bg-[#161814] border transition-all duration-300 w-full lg:w-[240px] shadow-xl cursor-pointer ${
                  activeStepIndex >= 0
                    ? "border-[#C6FF36] shadow-[0_0_25px_rgba(198,255,54,0.2)]"
                    : "border-white/10 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6FF36] bg-[#C6FF36]/10 px-2 py-0.5 rounded border border-[#C6FF36]/30">
                    STEP 01 // TRIGGER
                  </span>
                  <CheckCircle className={`w-4 h-4 transition-colors ${activeStepIndex >= 0 ? "text-[#C6FF36] drop-shadow-[0_0_6px_#C6FF36]" : "text-neutral-600"}`} />
                </div>
                <h4 className="text-sm font-semibold text-white">{current.triggerName}</h4>
                <p className="text-xs font-mono text-neutral-400 mt-1.5">{current.triggerParam}</p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>Source: Webhook</span>
                  <span className="text-[#C6FF36]">12ms</span>
                </div>
              </div>

              {/* NODE 2: CONDITIONAL DECISION NODE */}
              <div
                className={`card-futuristic-interactive p-5 rounded-2xl bg-[#161814] border transition-all duration-300 w-full lg:w-[250px] shadow-xl cursor-pointer ${
                  activeStepIndex >= 1
                    ? "border-[#C6FF36] shadow-[0_0_25px_rgba(198,255,54,0.2)]"
                    : "border-white/10 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    STEP 02 // LOGIC
                  </span>
                  <CheckCircle className={`w-4 h-4 transition-colors ${activeStepIndex >= 1 ? "text-[#C6FF36] drop-shadow-[0_0_6px_#C6FF36]" : "text-neutral-600"}`} />
                </div>
                <h4 className="text-sm font-semibold text-white">{current.conditionName}</h4>
                <div className="mt-3 flex flex-col gap-1.5 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-[#C6FF36]/15 text-[#C6FF36] border border-[#C6FF36]/40 flex items-center justify-between shadow-[0_0_8px_rgba(198,255,54,0.15)]">
                    <span>BRANCH TRUE</span>
                    <span>✓ Matched</span>
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 text-neutral-500 border border-white/5">
                    BRANCH FALSE (Bypassed)
                  </span>
                </div>
              </div>

              {/* NODE 3 & 4: BRANCH STACK & ACTIONS */}
              <div className="flex flex-col gap-5 w-full lg:w-[320px]">
                
                {/* Upper Branch: True (Active) */}
                <div
                  className={`card-futuristic-interactive p-4 rounded-2xl bg-[#161814] border transition-all duration-300 cursor-pointer ${
                    activeStepIndex >= 2
                      ? "border-[#C6FF36] shadow-[0_0_25px_rgba(198,255,54,0.2)]"
                      : "border-white/10 opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#C6FF36] bg-[#C6FF36]/10 px-2 py-0.5 rounded border border-[#C6FF36]/20">
                      BRANCH 1 // HUMAN GATE
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_8px_#C6FF36]" />
                  </div>
                  <h5 className="text-xs font-semibold text-white">{current.branchTrueName}</h5>
                  <p className="text-[11px] text-neutral-400 mt-1">Intervention required only if threshold &gt; 90%</p>
                </div>

                {/* Lower Branch: False (Skipped) */}
                <div className="card-futuristic-interactive p-3 rounded-xl bg-[#10110E] border border-white/5 opacity-40 cursor-default">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>BRANCH 2 // AUTOMATED</span>
                    <span>Bypassed</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-medium mt-1">{current.branchFalseName}</p>
                </div>

                {/* ACTION NODE: FINAL RESULT */}
                <div
                  className={`card-futuristic-interactive p-4 rounded-2xl bg-[#161814] border transition-all duration-300 cursor-pointer ${
                    activeStepIndex >= 3
                      ? "border-[#C6FF36] shadow-[0_0_30px_rgba(198,255,54,0.25)]"
                      : "border-white/10 opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      STEP 03 // DISPATCH ACTIONS
                    </span>
                    <CheckCircle className={`w-4 h-4 ${activeStepIndex >= 3 ? "text-[#C6FF36] drop-shadow-[0_0_8px_#C6FF36]" : "text-neutral-600"}`} />
                  </div>
                  <h5 className="text-xs font-semibold text-white">{current.actionName}</h5>
                  <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                    <span className="text-[#C6FF36]">State: Committing to Postgres</span>
                    <span>• 4ms</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Execution Status Footer */}
          <div className="px-6 py-4 border-t border-white/8 bg-[#0d0e0b] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_8px_#C6FF36]" />
                {isRunning ? "Simulating execution steps..." : "Last execution completed cleanly"}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">Exit code: 0 (OK)</span>
            </div>

            <div className="flex items-center gap-4 text-neutral-400">
              <span>Runs remaining this billing cycle: <strong className="text-white">49,820</strong></span>
              <a href="#product" className="text-[#C6FF36] hover:underline cursor-pointer">
                View Full Audit Replay →
              </a>
            </div>
          </div>

        </ScrollReveal>

      </div>
    </section>
  );
}
