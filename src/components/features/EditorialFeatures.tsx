"use client";

import { useState } from "react";
import { CheckCircle2, Clock, GitCommit, Play, RefreshCw, Terminal, ArrowUpRight, Search, Filter, ShieldCheck, Zap } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export function EditorialFeatures() {
  const [selectedLogIndex, setSelectedLogIndex] = useState<number>(0);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(8); // bar chart active column

  // Section B Activity Log Data
  const tuesdayEvents = [
    {
      time: "09:02 AM",
      title: "Enterprise Deal Closed in HubSpot ($48,000 ARR)",
      app: "HubSpot",
      action: "Provisioned AWS dedicated RDS cluster + invited 14 team members on Slack",
      status: "Success",
      duration: "410ms",
      actor: "Automatic",
    },
    {
      time: "11:24 AM",
      title: "Failed Dunning Attempt ($1,850)",
      app: "Stripe",
      action: "Triggered grace period rule; pinged Sarah Chen (AE) for approval",
      status: "Approved",
      duration: "2.4m",
      actor: "Sarah Chen (Slack)",
    },
    {
      time: "01:45 PM",
      title: "Security Secret Detected in Public Fork",
      app: "GitHub",
      action: "Rotated AWS IAM credentials & quarantined repo branch",
      status: "Critical Handled",
      duration: "85ms",
      actor: "Relay Guardian",
    },
    {
      time: "03:12 PM",
      title: "Customer Support Escalation Tier 3",
      app: "Zendesk",
      action: "Created Linear issue ENG-4091 + pinned thread in #incident-ops",
      status: "Success",
      duration: "135ms",
      actor: "Automatic",
    },
    {
      time: "05:48 PM",
      title: "Nightly Financial Reconciliation Matrix",
      app: "Postgres",
      action: "Validated 14,892 transactions against Stripe ledger with 0 discrepancy",
      status: "Completed",
      duration: "1.2s",
      actor: "Scheduled Cron",
    },
  ];

  // Section C 3D Bar Chart Data (Hourly run volume over 12 hours)
  const barChartData = [
    { hour: "08:00", count: 2420, height: 42, active: false, latency: "42ms" },
    { hour: "09:00", count: 4890, height: 75, active: false, latency: "51ms" },
    { hour: "10:00", count: 6120, height: 92, active: false, latency: "48ms" },
    { hour: "11:00", count: 5400, height: 82, active: false, latency: "44ms" },
    { hour: "12:00", count: 3950, height: 60, active: false, latency: "38ms" },
    { hour: "13:00", count: 5120, height: 78, active: false, latency: "46ms" },
    { hour: "14:00", count: 7200, height: 100, active: false, latency: "52ms" },
    { hour: "15:00", count: 6840, height: 95, active: false, latency: "49ms" },
    { hour: "16:00", count: 7940, height: 110, active: true, latency: "39ms" },
    { hour: "17:00", count: 5900, height: 86, active: false, latency: "41ms" },
    { hour: "18:00", count: 4120, height: 64, active: false, latency: "36ms" },
    { hour: "19:00", count: 2840, height: 48, active: false, latency: "34ms" },
  ];

  const activeBar = barChartData[selectedColumnIndex] || barChartData[8];

  return (
    <div className="relative bg-[#050505] text-white overflow-hidden">
      
      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION A: "One canvas, many branches."
          Visual Workflow Builder Editorial Section
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copy Column with Scroll Reveal */}
            <ScrollReveal className="lg:col-span-5 flex flex-col items-start">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6FF36] mb-3">
                01 // VISUAL CANVAS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
                One canvas,{" "}
                <span className="font-serif-italic font-normal text-[#C6FF36]">
                  many branches.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed mb-8">
                Build powerful workflows visually. Connect applications, automate decisions, and keep everything moving without wrestling with fragile glue code.
              </p>

              {/* Feature Points */}
              <div className="flex flex-col gap-4 text-sm text-neutral-300 font-mono">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-[#C6FF36]/15 border border-[#C6FF36]/40 flex items-center justify-center text-[#C6FF36] text-xs shadow-[0_0_8px_rgba(198,255,54,0.2)]">
                    ✓
                  </span>
                  <span>Branch conditionally on any JSON payload key</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-[#C6FF36]/15 border border-[#C6FF36]/40 flex items-center justify-center text-[#C6FF36] text-xs shadow-[0_0_8px_rgba(198,255,54,0.2)]">
                    ✓
                  </span>
                  <span>Human-in-the-loop approvals via Slack or Email</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-[#C6FF36]/15 border border-[#C6FF36]/40 flex items-center justify-center text-[#C6FF36] text-xs shadow-[0_0_8px_rgba(198,255,54,0.2)]">
                    ✓
                  </span>
                  <span>Automatic schema inference & payload validation</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Visual Dashboard Column with Interactive Card Hover */}
            <ScrollReveal delay={0.2} scale={0.98} className="lg:col-span-7">
              <div className="card-futuristic-interactive relative rounded-3xl bg-[#10110E] border border-white/10 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(198,255,54,0.06),transparent_70%)] blur-3xl pointer-events-none" />

                {/* Canvas Mini Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/8 mb-6 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-[#C6FF36] shadow-[0_0_8px_#C6FF36]" />
                    <span className="text-white font-semibold">Workflow: Enterprise SLA Escalation</span>
                  </div>
                  <span className="text-[#C6FF36]">Auto-save: 2s ago</span>
                </div>

                {/* Node Tree Diagram */}
                <div className="flex flex-col gap-5">
                  <div className="p-4 rounded-xl bg-[#161814] border border-[#C6FF36]/40 flex items-center justify-between shadow-[0_0_15px_rgba(198,255,54,0.08)]">
                    <div>
                      <span className="text-[10px] font-mono text-[#C6FF36]">TRIGGER</span>
                      <h4 className="text-sm font-semibold text-white">Zendesk Ticket: SLA Breach Alert</h4>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">P0 Urgent</span>
                  </div>

                  <div className="pl-6 border-l-2 border-dashed border-[#C6FF36]/40 flex flex-col gap-4">
                    <div className="p-3.5 rounded-xl bg-[#161814] border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-amber-300">RULE</span>
                        <h5 className="text-xs font-medium text-white">Tier === &quot;Strategic Enterprise&quot;</h5>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400">Match (True)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#0a0b09] border border-[#C6FF36]/30 hover:border-[#C6FF36] transition-colors">
                        <span className="text-[10px] font-mono text-[#C6FF36]">ACTION 1</span>
                        <p className="text-xs text-neutral-200 mt-1">Page On-Call VP via PagerDuty</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#0a0b09] border border-[#C6FF36]/30 hover:border-[#C6FF36] transition-colors">
                        <span className="text-[10px] font-mono text-[#C6FF36]">ACTION 2</span>
                        <p className="text-xs text-neutral-200 mt-1">Open War Room Slack Channel</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION B: "A Tuesday, seen from Relay."
          Editorial Timeline Execution Dashboard
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#070806]">
        {/* Ambient subtle green glow */}
        <div className="absolute top-1/2 right-1/4 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(198,255,54,0.05),transparent_70%)] blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          
          {/* Section B Header with Scroll Reveal */}
          <ScrollReveal className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-[#C6FF36] mb-4">
              <span>02 // REAL-TIME DISPATCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.15]">
              A Tuesday,{" "}
              <span className="font-serif-italic font-normal text-[#C6FF36]">
                seen from Relay.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed">
              Every handoff happens silently in the background. Your team only hears from Relay when a human exception genuinely requires judgment.
            </p>
          </ScrollReveal>

          {/* Interactive Editorial Dashboard Panel with Scroll Reveal */}
          <ScrollReveal delay={0.15} className="card-futuristic-interactive rounded-3xl bg-[#10110E] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Daily Activity Badge Header */}
            <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/8 bg-[#0a0b09]/80 gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#C6FF36]/15 border border-[#C6FF36]/30 text-[#C6FF36] text-xs font-mono font-semibold shadow-[0_0_10px_rgba(198,255,54,0.15)]">
                  Tuesday, Nov 12 • 4,812 runs completed
                </span>
                <span className="text-neutral-500 font-mono text-xs hidden sm:inline">All automated pipelines nominal</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                  0 unhandled errors
                </span>
                <span className="text-neutral-600">|</span>
                <span>Avg latency: 42ms</span>
              </div>
            </div>

            {/* Main Log Stream Table */}
            <div className="divide-y divide-white/5">
              {tuesdayEvents.map((event, idx) => (
                <div
                  key={event.time}
                  onClick={() => setSelectedLogIndex(idx)}
                  className={`p-5 sm:px-8 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    selectedLogIndex === idx
                      ? "bg-[#161814] border-l-2 border-[#C6FF36]"
                      : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="text-xs font-mono text-[#C6FF36] w-20 shrink-0 font-semibold">
                      {event.time}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-neutral-300 border border-white/10">
                      {event.app}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{event.title}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 font-mono">{event.action}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto text-xs font-mono">
                    <span className="text-neutral-500">{event.actor}</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">
                      {event.status} ({event.duration})
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </ScrollReveal>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION C: "Every run is on the record."
          3D-Style Bar Chart with Floating Rectangular Columns
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#050505]">
        {/* Green light beam behind chart */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse,rgba(198,255,54,0.07),transparent_70%)] blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          
          {/* Section C Header with Scroll Reveal */}
          <ScrollReveal className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6FF36] mb-3 block">
              03 // REPLAY & COMPLIANCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.15]">
              Every run is{" "}
              <span className="font-serif-italic font-normal text-[#C6FF36]">
                on the record.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed">
              Inputs, outputs and timings for 90 days. Replay any run before you trust it with money.
            </p>
          </ScrollReveal>

          {/* 3D-Style Floating Bar Chart Card with Scroll Reveal */}
          <ScrollReveal delay={0.15} className="card-futuristic-interactive rounded-3xl bg-[#10110E] border border-white/10 p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
            
            {/* Chart Toolbar & Metric Preview */}
            <div className="flex flex-wrap items-center justify-between pb-8 border-b border-white/8 gap-4">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  HOURLY RUN DISPATCH AUDIT (UTC)
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
                    {activeBar.count.toLocaleString()} runs
                  </span>
                  <span className="text-xs font-mono text-[#C6FF36] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse" />
                    Latency: {activeBar.latency}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                  Time Window: 12 Hours
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#C6FF36]/15 border border-[#C6FF36]/30 text-xs font-mono text-[#C6FF36] font-semibold">
                  Retention: 90 Days
                </span>
              </div>
            </div>

            {/* 3D-Style Floating Bar Columns Visualizer */}
            <div className="pt-12 pb-6">
              <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-6">
                {barChartData.map((bar, idx) => {
                  const isSelected = selectedColumnIndex === idx;
                  return (
                    <div
                      key={bar.hour}
                      onClick={() => setSelectedColumnIndex(idx)}
                      className="flex-1 flex flex-col items-center gap-3 cursor-pointer group"
                    >
                      {/* Tooltip on Hover */}
                      <span
                        className={`text-[10px] font-mono transition-opacity duration-200 ${
                          isSelected ? "opacity-100 text-[#C6FF36] font-semibold" : "opacity-0 group-hover:opacity-100 text-neutral-400"
                        }`}
                      >
                        {bar.count}
                      </span>

                      {/* 3D Rectangular Column */}
                      <div className="w-full max-w-[40px] flex items-end justify-center h-48 relative">
                        <div
                          style={{ height: `${bar.height}%` }}
                          className={`w-full rounded-t-lg transition-all duration-300 relative ${
                            isSelected
                              ? "bg-gradient-to-t from-[#C6FF36]/40 to-[#C6FF36] shadow-[0_0_25px_rgba(198,255,54,0.5)] scale-y-105"
                              : "bg-[#1f2319] hover:bg-[#C6FF36]/40 border-t border-white/20"
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute -top-1 left-0 right-0 h-1 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                          )}
                        </div>
                      </div>

                      {/* Hour Label */}
                      <span
                        className={`text-[11px] font-mono transition-colors ${
                          isSelected ? "text-[#C6FF36] font-bold" : "text-neutral-500 group-hover:text-neutral-300"
                        }`}
                      >
                        {bar.hour}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 90-Day Execution Replay Inspector */}
            <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0a0b09] p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="p-2 rounded-lg bg-white/5 text-[#C6FF36]">
                  <RefreshCw className="w-4 h-4" />
                </span>
                <div>
                  <h5 className="font-semibold text-white">Instant Deterministic Replay Engine</h5>
                  <p className="text-neutral-400">Step through any historical execution with identical incoming payloads</p>
                </div>
              </div>

              <button className="btn-secondary-glow px-4 py-2 rounded-xl bg-[#161814] hover:bg-[#1a2014] border border-[#C6FF36]/30 text-xs font-mono text-[#C6FF36] transition-all cursor-pointer whitespace-nowrap">
                Inspect Payload {activeBar.hour}:00 UTC →
              </button>
            </div>

          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}
