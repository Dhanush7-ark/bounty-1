"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export function IntegrationsSection() {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const integrations = [
    {
      name: "Slack",
      tagline: "Bi-directional pings & approvals",
      latency: "12ms",
      connected: true,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
        </svg>
      ),
    },
    {
      name: "Stripe",
      tagline: "Instant charge webhooks",
      latency: "8ms",
      connected: true,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
        </svg>
      ),
    },
    {
      name: "Postgres",
      tagline: "Direct SQL triggers & mutations",
      latency: "4ms",
      connected: true,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
    },
    {
      name: "HubSpot",
      tagline: "CRM contacts & deal stage sync",
      latency: "24ms",
      connected: true,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.89 8.28V5.7a2.22 2.22 0 1 0-1.88 0v2.58a7.07 7.07 0 0 0-3.32 1.74l-6.58-5.1a2.38 2.38 0 1 0-1.46 1.88l6.39 4.95a7.1 7.1 0 0 0-.25 1.87 7.12 7.12 0 1 0 7.1-7.62zm-10.82-5a.94.94 0 1 1-.94.94.94.94 0 0 1 .94-.94zm9.88 2.22a.94.94 0 1 1 .94.94.94.94 0 0 1-.94-.94zm-1 14.88a4.94 4.94 0 1 1 4.94-4.94 4.94 4.94 0 0 1-4.94 4.94z"/>
        </svg>
      ),
    },
    {
      name: "Notion",
      tagline: "Database items & docs update",
      latency: "32ms",
      connected: true,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.875c-.466-.373-.886-.466-2.007-.373L3.106 2.574c-.373.047-.466.28-.326.42l1.679 1.214zm.84 3.919v13.636c0 .793.373 1.073 1.26 1.026l14.288-.84c.886-.046.98-.56.98-1.26V7.054c0-.7-.28-.98-.98-.933l-14.568.886c-.7.047-.98.373-.98 1.12zm13.168.326c.093.42.093.84-.28.887l-1.073.186v9.846c0 .7-.373.933-.933.98l-3.36.187c-.466.046-.7-.14-.933-.513l-4.153-6.486v5.88c.373.187.7.373.7.84 0 .047-.046.28-.233.28l-3.173.187c-.093 0-.187-.093-.187-.28 0-.467.28-.7.747-.84v-9.566c0-.466-.28-.606-.84-.7-.093 0-.093-.28 0-.28l3.407-.233c.513-.047.793.186 1.073.606l4.293 6.673V8.08c-.373-.186-.7-.373-.7-.793 0-.093.047-.28.187-.28l3.407-.233c.14 0 .186.093.233.28z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      tagline: "PR mergers, issues & deploy tags",
      latency: "15ms",
      connected: true,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: "Linear",
      tagline: "Auto-triage & status transitions",
      latency: "11ms",
      connected: true,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M3.1 3.1c4.9-4.9 12.9-4.9 17.8 0 4.9 4.9 4.9 12.9 0 17.8-4.9 4.9-12.9 4.9-17.8 0-4.9-4.9-4.9-12.9 0-17.8zm1.4 1.4c-4.1 4.1-4.1 10.9 0 15 4.1 4.1 10.9 4.1 15 0 4.1-4.1 4.1-10.9 0-15-4.1-4.1-10.9-4.1-15 0zm6.5 4.5h2v6h-2zm-3 3h2v3h-2zm6-1h2v4h-2z"/>
        </svg>
      ),
    },
  ];

  // Marquee duplicates for seamless infinite loop
  const marqueeList = [...integrations, ...integrations];

  return (
    <section id="product" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* ─── ANIMATED VERTICAL GREEN LIGHT TRAILS BACKGROUND ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical laser light lines streaming down */}
        <div className="absolute left-[15%] top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C6FF36]/30 to-transparent" />
        <div className="absolute left-[38%] top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C6FF36]/15 to-transparent" />
        <div className="absolute left-[62%] top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C6FF36]/25 to-transparent" />
        <div className="absolute left-[85%] top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C6FF36]/10 to-transparent" />

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse,rgba(198,255,54,0.06),transparent_70%)] blur-[90px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-[#C6FF36] mb-4">
            <span>ECOSYSTEM // 240+ CONNECTORS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            One canvas,{" "}
            <span className="font-serif-italic font-normal text-[#C6FF36]">
              many branches.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed">
            Connect applications in seconds with native webhooks, sub-second sync, and automatic schema inference.
          </p>
        </ScrollReveal>

        {/* ─── INFINITE HORIZONTAL SCROLLING INTEGRATION LOGO MARQUEE ─── */}
        <div className="mb-12 relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee-track flex gap-4">
            {marqueeList.map((app, index) => (
              <div
                key={`${app.name}-${index}`}
                className="group inline-flex items-center gap-3.5 px-5 py-3 rounded-xl bg-[#10110E]/90 border border-white/10 hover:border-[#C6FF36]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(198,255,54,0.2)] hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <div className="w-8 h-8 rounded-lg bg-[#161814] border border-white/10 flex items-center justify-center text-white group-hover:text-[#C6FF36] group-hover:border-[#C6FF36]/40 transition-colors">
                  {app.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#C6FF36] transition-colors">
                      {app.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] opacity-75 group-hover:opacity-100 group-hover:shadow-[0_0_6px_#C6FF36]" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    {app.latency} sync
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Row of Integration Cards with Staggered Entrance & Interactive Hover Lift */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4" staggerDelay={0.06}>
          {integrations.map((app) => (
            <StaggerItem key={app.name}>
              <div
                onMouseEnter={() => setHoveredApp(app.name)}
                onMouseLeave={() => setHoveredApp(null)}
                className="card-futuristic-interactive group relative p-4 rounded-2xl bg-[#10110E]/80 border border-white/8 hover:border-[#C6FF36]/50 flex flex-col justify-between min-h-[140px] cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#161814] border border-white/10 flex items-center justify-center text-white group-hover:text-[#C6FF36] group-hover:border-[#C6FF36]/40 transition-colors">
                    {app.icon}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#C6FF36]" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#C6FF36] transition-colors flex items-center justify-between">
                    <span>{app.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5 line-clamp-1">
                    {app.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>{app.latency}</span>
                  <span className="text-[#C6FF36] opacity-80">Synced</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Ecosystem Bottom Callout Pill */}
        <ScrollReveal delay={0.2} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#10110E] border border-white/10 text-xs text-neutral-300 font-mono hover:border-[#C6FF36]/30 transition-all hover:shadow-[0_0_15px_rgba(198,255,54,0.1)]">
            <span className="text-[#C6FF36]">✦ Need a custom API?</span>
            <span>Write custom TypeScript hooks or trigger via webhook in under 3 lines.</span>
            <span className="text-white hover:text-[#C6FF36] underline cursor-pointer ml-1">View API Docs</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
