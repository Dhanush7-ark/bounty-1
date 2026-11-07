import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power2.out",
    duration: 1,
  });

  gsap.ticker.lagSmoothing(1000, 16);
}

export { gsap, ScrollTrigger };
