"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free Trial",
      badge: "GET STARTED",
      description: "Ideal for testing workflows and exploring automation possibilities.",
      priceMonthly: "$0",
      priceAnnual: "$0",
      period: "for 14 days",
      highlighted: false,
      ctaText: "Start free trial",
      features: [
        "1,000 runs included",
        "Up to 10 active workflows",
        "240+ app integrations",
        "1-day run audit retention",
        "Community support & docs",
        "Standard webhook speeds",
      ],
    },
    {
      name: "Professional",
      badge: "MOST POPULAR",
      description: "For fast-moving teams that run core business operations on automated handoffs.",
      priceMonthly: "$59",
      priceAnnual: "$49",
      period: "/ month, billed annually",
      highlighted: true,
      ctaText: "Start 14-day trial",
      features: [
        "50,000 runs included per month",
        "Unlimited active workflows",
        "Human-in-the-loop approvals",
        "90-day payload audit replay",
        "Custom TypeScript logic nodes",
        "Priority Slack support channel",
        "Sub-second execution speeds",
        "Automated rollback on error",
      ],
    },
    {
      name: "Enterprise",
      badge: "CUSTOM RUNNERS",
      description: "For organizations requiring custom VPC runners, SOC2 compliance, and custom SLAs.",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      period: "tailored to volume",
      highlighted: false,
      ctaText: "Contact sales",
      features: [
        "Unlimited custom run volume",
        "Dedicated VPC tenant runners",
        "Custom 99.99% uptime SLA",
        "SOC2 Type II + HIPAA compliant",
        "SAML SSO & SCIM directory sync",
        "Dedicated solutions architect",
        "Custom on-premise connectors",
        "Cryptographic compliance audit",
      ],
    },
  ];

  return (
    <section id="pricing" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse,rgba(198,255,54,0.06),transparent_70%)] blur-[120px] animate-pulse-glow" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-[#C6FF36] mb-4">
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5">
            Predictable scale,{" "}
            <span className="font-serif-italic font-normal text-[#C6FF36]">
              zero surprises.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed mb-8">
            Start free for 14 days. Scale with transparent per-run tiers and dedicated enterprise infrastructure when you need it.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                !isAnnual
                  ? "bg-white/15 text-white font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isAnnual
                  ? "bg-[#C6FF36] text-[#050505] font-semibold shadow-[0_0_15px_rgba(198,255,54,0.3)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>Annual billing</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isAnnual ? "bg-black/20 text-black font-bold" : "bg-[#C6FF36]/20 text-[#C6FF36]"
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* 3 Pricing Cards with Staggered Entrance & Hover Lift */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" staggerDelay={0.1}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name} className="flex">
              <div
                className={`card-futuristic-interactive relative w-full rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-[#10110E] border-2 border-[#C6FF36] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(198,255,54,0.15)] -translate-y-2"
                    : "bg-[#10110E]/80 border border-white/10 hover:border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* Popular Glow Badge on Highlighted Plan */}
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C6FF36] text-[#050505] text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_#C6FF36] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  {!plan.highlighted && (
                    <span className="text-[11px] font-mono text-neutral-400 tracking-wider uppercase block mb-2">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-normal leading-relaxed mb-6 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pb-6 border-b border-white/8 mb-6">
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                      {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                      Included in this plan:
                    </span>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlighted ? "bg-[#C6FF36] text-black" : "bg-white/10 text-white"
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button with Button Neon Glow & Sweep */}
                <button
                  onClick={() => onSelectPlan?.(plan.name)}
                  className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.highlighted
                      ? "btn-primary-neon bg-[#C6FF36] text-[#050505]"
                      : "btn-secondary-glow bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Enterprise Security Callout Footer */}
        <ScrollReveal delay={0.2} className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF36] shadow-[0_0_6px_#C6FF36]" />
              SOC2 Type II Certified
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF36] shadow-[0_0_6px_#C6FF36]" />
              HIPAA & GDPR Compliant
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF36] shadow-[0_0_6px_#C6FF36]" />
              99.99% Uptime SLA Guaranteed
            </span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
