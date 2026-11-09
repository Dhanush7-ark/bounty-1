"use client";

import { ThisWillFeelDifferentSection } from "./ThisWillFeelDifferentSection";

interface RevolutionizeSectionProps {
  onBookConsultation: () => void;
}

/**
 * RevolutionizeSection
 * Forwards directly to the reference-accurate "THIS WILL FEEL DIFFERENT"
 * cinematic green statement section.
 */
export function RevolutionizeSection({ onBookConsultation }: RevolutionizeSectionProps) {
  return <ThisWillFeelDifferentSection onBookConsultation={onBookConsultation} />;
}
