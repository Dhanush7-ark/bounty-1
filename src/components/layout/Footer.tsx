"use client";

import { ArrowUpRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export function Footer() {
  const productLinks = [
    { label: "Visual Canvas", href: "#workflow" },
    { label: "Integrations (240+)", href: "#product" },
    { label: "Human-in-the-Loop", href: "#workflow" },
    { label: "90-Day Execution Replay", href: "#product" },
    { label: "Security & SOC2", href: "#product" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Customers", href: "#customers" },
    { label: "Careers (We're hiring)", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Press Kit", href: "#" },
  ];

  const resourceLinks = [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Webhook Simulator", href: "#" },
    { label: "Community Discord", href: "#" },
    { label: "Status Page", href: "#" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security Whitepaper", href: "#" },
    { label: "Subprocessors", href: "#" },
  ];

  return (
    <footer className="relative bg-transparent pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-neutral-400 overflow-hidden">
      
      {/* ─── GLOWING GREEN DIVIDER LINE WITH ENTRANCE ─── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6FF36]/50 to-transparent shadow-[0_0_20px_#C6FF36]" />

      {/* Subtle light trails in the footer background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse,rgba(198,255,54,0.05),transparent_70%)] blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 w-px h-64 bg-gradient-to-t from-[#C6FF36]/20 to-transparent" />
        <div className="absolute right-1/4 bottom-0 w-px h-64 bg-gradient-to-t from-[#C6FF36]/15 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Main Footer Grid with Staggered Entrance */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12 mb-16" staggerDelay={0.08}>
          
          {/* Brand Column (Col 1 & 2 on mobile) */}
          <StaggerItem className="col-span-2 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#161814] border border-[#C6FF36]/40 flex items-center justify-center shadow-[0_0_15px_rgba(198,255,54,0.2)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12"
                      stroke="#C6FF36"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 16L12 12L15 16"
                      stroke="#C6FF36"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="2.5" fill="#C6FF36" />
                  </svg>
                </div>
                <span className="font-semibold text-lg tracking-tight text-white flex items-center gap-1.5">
                  Relay
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] shadow-[0_0_6px_#C6FF36]" />
                </span>
              </div>

              <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-6 font-normal">
                The handoffs run themselves. Relay connects the steps between your apps and only asks a person when it matters.
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-neutral-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF36] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF36]" />
                </span>
                <span>All systems operational • 99.98% uptime</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8 text-neutral-400">
              {/* GitHub */}
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:text-[#C6FF36] hover:bg-white/10 transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:text-[#C6FF36] hover:bg-white/10 transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:text-[#C6FF36] hover:bg-white/10 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </StaggerItem>

          {/* Col 2: Product Links */}
          <StaggerItem>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#C6FF36] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Col 3: Company Links */}
          <StaggerItem>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#C6FF36] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Col 4: Resources Links */}
          <StaggerItem>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#C6FF36] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

        </StaggerContainer>

        {/* Bottom Sub-Footer Bar */}
        <ScrollReveal delay={0.2} className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Relay Technologies, Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-neutral-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
}
