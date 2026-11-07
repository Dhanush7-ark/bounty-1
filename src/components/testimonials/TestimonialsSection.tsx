"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "We went from spending Monday mornings reconciling failed multi-app webhooks to literally never thinking about handoffs. Relay handles our entire fintech provisioning pipeline silently.",
      name: "Marcus Vance",
      title: "VP of Engineering",
      company: "Ramp",
      metric: "4,200+ runs/day",
    },
    {
      quote:
        "The human-in-the-loop primitive is what makes Relay special. It only pings our account executives when contract value crosses $50k or an anomaly occurs. The rest just executes.",
      name: "Elena Rostova",
      title: "Head of Revenue Operations",
      company: "Retool",
      metric: "12 hours saved/wk",
    },
    {
      quote:
        "The 90-day execution replay alone saved us during our last SOC2 audit. Being able to inspect exact cryptographic payloads and diffs for any run gave compliance complete confidence.",
      name: "Julian Thorne",
      title: "Principal Infrastructure Architect",
      company: "Vercel",
      metric: "99.99% uptime",
    },
  ];

  return (
    <section id="customers" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden border-t border-white/5">
      {/* Ambient background soft glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[300px] bg-[radial-gradient(ellipse,rgba(198,255,54,0.04),transparent_70%)] blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-[#C6FF36] mb-4">
            <span>PROOF // CUSTOMER VOICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Built for operators who{" "}
            <span className="font-serif-italic font-normal text-[#C6FF36]">
              care about details.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed">
            Powering mission-critical operations for high-growth tech companies.
          </p>
        </ScrollReveal>

        {/* Three Minimal Testimonial Columns with Stagger & Card Lift */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div
                className="card-futuristic-interactive group relative rounded-3xl bg-[#10110E]/80 border border-white/8 hover:border-[#C6FF36]/40 p-8 flex flex-col justify-between h-full cursor-pointer"
              >
                <div>
                  {/* Subtle top company pill */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <span className="text-sm font-semibold text-white tracking-wide">
                      {t.company}
                    </span>
                    <span className="text-[10px] font-mono text-[#C6FF36] px-2 py-0.5 rounded bg-[#C6FF36]/10 border border-[#C6FF36]/30 shadow-[0_0_8px_rgba(198,255,54,0.15)]">
                      {t.metric}
                    </span>
                  </div>

                  {/* Quote Typography (Small, elegant, understated) */}
                  <p className="text-sm text-neutral-300 font-normal leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Attribution */}
                <div className="pt-4 border-t border-white/5">
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono mt-0.5">
                    {t.title}, {t.company}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
