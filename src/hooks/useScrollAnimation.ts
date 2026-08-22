"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

interface ScrollAnimationOptions {
  triggerRef: RefObject<HTMLElement | null>;
  animation?: (tl: gsap.core.Timeline) => void;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | HTMLElement;
  markers?: boolean;
}

export function useScrollAnimation({
  triggerRef,
  animation,
  start = "top bottom",
  end = "bottom top",
  scrub = 1,
  pin = false,
  markers = false,
}: ScrollAnimationOptions) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start,
          end,
          scrub,
          pin,
          markers,
        },
      });

      timelineRef.current = tl;
      if (animation) {
        animation(tl);
      }
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [triggerRef, animation, start, end, scrub, pin, markers]);

  return timelineRef;
}
