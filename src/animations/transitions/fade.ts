import { gsap } from "@/lib/gsap";

export function fadeInElement(
  element: HTMLElement | null,
  duration = 0.8,
  delay = 0
): gsap.core.Tween | null {
  if (!element) return null;

  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
  );
}

export function fadeOutElement(
  element: HTMLElement | null,
  duration = 0.5
): gsap.core.Tween | null {
  if (!element) return null;

  return gsap.to(element, {
    opacity: 0,
    y: -20,
    duration,
    ease: "power2.in",
  });
}
