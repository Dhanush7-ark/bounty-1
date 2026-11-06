"use client";

import { Container } from "@/components/ui/Container";
import { ServicesGrid } from "@/components/ui/ServicesGrid";

export function FeatureSection() {
  return (
    <section id="features" className="relative z-10 py-24 bg-black/90 text-white">
      <Container>
        <ServicesGrid />
      </Container>
    </section>
  );
}
