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
      <header className="flex items-center justify-between pointer-events-auto">
        {/* Spacecraft Logo Badge */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="relative h-10 px-4 flex items-center rounded-xl border border-[#00FF66]/30 bg-black/70 backdrop-blur-md transition-all duration-300 group-hover:border-[#00FF66] group-hover:shadow-[0_0_15px_rgba(0,255,102,0.3)]">
            <Image
              src="/images/image.png"
              alt="Bounty Bytes AI Studios"
              width={140}
              height={40}
              className="h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(0,255,102,0.4)]"
              priority
            />
          </div>
        </a>

        {/* Spatial Waypoints Quick Jump Bar */}
        <nav className="hidden md:flex items-center space-x-2 p-1.5 rounded-full border border-[#00FF66]/20 bg-black/70 backdrop-blur-md text-xs font-mono">
          {WAYPOINTS.map((wp) => {
            const isActive = Math.abs(scrollProgress - wp.progress) < 0.15;
            return (
              <button
                key={wp.id}
                onClick={() => onJumpToWaypoint?.(wp.progress)}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#00FF66] text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.4)]"
                    : "text-neutral-400 hover:text-[#00FF66] hover:bg-[#00FF66]/10"
                }`}
              >
                {wp.label}
              </button>
            );
          })}
        </nav>

        {/* Spacecraft System Status Badge */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-[#00FF66]/30 bg-black/70 backdrop-blur-md font-mono text-[11px] text-[#00FF66]">
            <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span className="hidden sm:inline">SPACECRAFT NAV:</span> ACTIVE
          </div>
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
