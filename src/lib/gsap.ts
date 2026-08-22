import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Configure GSAP defaults for responsive smooth animations
  gsap.defaults({
    ease: "power2.out",
    duration: 1,
  });

  // Enable lag smoothing adjustment for smooth sync with scroll drivers
  gsap.ticker.lagSmoothing(1000, 16);
}

export { gsap, ScrollTrigger };
