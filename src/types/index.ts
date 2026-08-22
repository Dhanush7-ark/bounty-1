export type { PerformanceTier, PerformanceConfig } from "./three";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    twitter: string;
  };
}

export interface ScrollAnimationState {
  progress: number;
  direction: number;
  velocity: number;
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}
