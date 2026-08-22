import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Bounty Bytes AI Studios",
  description:
    "Bounty Bytes AI Studios - Next-generation 3D interactive web experiences powered by Next.js, React Three Fiber, GSAP, and Lenis.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/image.png",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
};
