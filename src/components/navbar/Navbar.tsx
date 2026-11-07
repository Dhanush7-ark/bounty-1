"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onStartFree?: () => void;
}

export function Navbar({ onStartFree }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section spy
      const sections = ["product", "workflow", "customers", "pricing"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "#product", id: "product" },
    { label: "How it works", href: "#workflow", id: "workflow" },
    { label: "Customers", href: "#customers", id: "customers" },
    { label: "Pricing", href: "#pricing", id: "pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pointer-events-none transition-all duration-500">
      <div
        className={`max-w-6xl mx-auto rounded-full pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "bg-[#10110E]/85 backdrop-blur-2xl border border-[#C6FF36]/20 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(198,255,54,0.06)] py-2.5 px-4 sm:px-6"
            : "bg-transparent border border-white/5 py-3 px-4 sm:px-6 backdrop-blur-[2px]"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Neon-green logo icon + Brand name: Relay */}
          <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#161814] border border-[#C6FF36]/30 flex items-center justify-center transition-all duration-300 group-hover:border-[#C6FF36] group-hover:shadow-[0_0_18px_rgba(198,255,54,0.4)] group-hover:scale-105">
              {/* Custom Relay Logo SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12"
                  stroke="#C6FF36"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9 16L12 12L15 16"
                  stroke="#C6FF36"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2.5" fill="#C6FF36" />
              </svg>
            </div>
            <span className="font-semibold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
              Relay
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse" />
            </span>
          </a>

          {/* Center: Navigation Links with Active-Section Highlighting */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#888888] hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C6FF36] rounded-full shadow-[0_0_8px_#C6FF36]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Status Indicator Pill & Start Free Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Status indicator pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#161814]/80 border border-white/5 text-[11px] font-mono text-neutral-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF36] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF36]" />
              </span>
              <span>All systems normal</span>
            </div>

            {/* Neon-green "Start free" button with light sweep & glow */}
            <button
              onClick={onStartFree}
              className="btn-primary-neon group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#C6FF36] text-[#050505] font-semibold text-xs sm:text-sm cursor-pointer"
            >
              <span>Start free</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-1.5 transition-colors font-medium px-2 ${
                  activeSection === link.id
                    ? "text-[#C6FF36]"
                    : "text-neutral-300 hover:text-[#C6FF36]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-neutral-400 px-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF36]" />
              <span>All systems normal</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
