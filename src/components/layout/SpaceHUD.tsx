"use client";

import Image from "next/image";

interface SpaceHUDProps {
  scrollProgress: number; // 0.0 to 1.0
  onJumpToWaypoint?: (progress: number) => void;
}

const WAYPOINTS = [
  { id: "hero", label: "01 // HERO", progress: 0.0 },
  { id: "tech", label: "02 // TECH", progress: 0.35 },
  { id: "core", label: "03 // CORE", progress: 0.70 },
  { id: "terminal", label: "04 // TERMINAL", progress: 0.96 },
];

export function SpaceHUD({ scrollProgress, onJumpToWaypoint }: SpaceHUDProps) {
  const percent = Math.round(scrollProgress * 100);
  const depthMeters = Math.round(scrollProgress * 290);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-4 sm:p-8">
      {/* ─── TOP HUD HEADER ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between pointer-events-auto w-full max-w-7xl mx-auto">
        {/* Spacecraft Logo Badge */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="relative h-11 px-4 flex items-center rounded-xl border border-[#b5f200]/30 bg-black/80 backdrop-blur-md transition-all duration-300 group-hover:border-[#b5f200] group-hover:shadow-[0_0_20px_rgba(181,242,0,0.3)]">
            <Image
              src="/images/image.png"
              alt="Bounty Bytes AI Studios"
              width={150}
              height={42}
              className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(181,242,0,0.4)]"
              priority
            />
          </div>
        </a>

        {/* Center Navigation Links matching Screenshot */}
        <nav className="hidden md:flex items-center space-x-8 px-6 py-2.5 rounded-full border border-white/10 bg-black/80 backdrop-blur-md text-sm font-medium text-white shadow-xl">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); onJumpToWaypoint?.(0.0); }}
            className="hover:text-[#b5f200] transition-colors cursor-pointer"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); onJumpToWaypoint?.(0.35); }}
            className="hover:text-[#b5f200] transition-colors cursor-pointer"
          >
            About Us
          </a>
          <a
            href="#service"
            onClick={(e) => { e.preventDefault(); onJumpToWaypoint?.(0.70); }}
            className="hover:text-[#b5f200] transition-colors cursor-pointer"
          >
            Service
          </a>
          <div className="relative group cursor-pointer flex items-center gap-1.5 hover:text-[#b5f200] transition-colors">
            <span>Resources</span>
            <svg className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </nav>

        {/* Header Right Action: Contact Us Pill Button & Telemetry */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onJumpToWaypoint?.(0.96)}
            className="px-6 py-2.5 rounded-full font-bold text-sm text-black bg-[#b5f200] hover:bg-[#c6ff1a] transition-all duration-300 shadow-[0_0_20px_rgba(181,242,0,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </header>

      {/* ─── BOTTOM HUD BAR ─────────────────────────────────────────────── */}
      <footer className="flex items-end justify-between pointer-events-auto text-[11px] font-mono select-none">
        {/* Left Coordinates & Depth Gauge */}
        <div className="p-3.5 rounded-2xl border border-[#00FF66]/20 bg-black/75 backdrop-blur-md flex flex-col gap-1 text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="text-[#00FF66]/60">SPACE DEPTH:</span>
            <span className="text-[#00FF66] font-bold">-{depthMeters}m</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00FF66]/60">WARP VECTOR:</span>
            <span className="text-[#00FF66] font-bold">{percent}%</span>
          </div>
        </div>

        {/* Center Progress Bar Line */}
        <div className="hidden lg:flex flex-col items-center gap-1.5 w-64">
          <div className="flex items-center justify-between w-full text-[10px] text-[#00FF66]/70 uppercase tracking-wider">
            <span>START</span>
            <span>SPACE TRAVERSE</span>
            <span>TERMINAL</span>
          </div>
          <div className="w-full h-1 rounded-full bg-neutral-900 border border-[#00FF66]/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#00FF66] transition-all duration-100 shadow-[0_0_10px_#00FF66]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Right Engine Info */}
        <div className="p-3.5 rounded-2xl border border-[#00FF66]/20 bg-black/75 backdrop-blur-md flex flex-col items-end gap-1 text-neutral-400">
          <div><span className="text-[#00FF66]">R3F</span> • <span className="text-[#00FF66]">GSAP</span> • <span className="text-[#00FF66]">LENIS</span></div>
          <div className="text-[10px] text-neutral-500">BOUNTY BYTES UNIVERSE v2.0</div>
        </div>
      </footer>
    </div>
  );
}
