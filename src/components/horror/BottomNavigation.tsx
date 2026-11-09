"use client";

interface BottomNavigationProps {
  className?: string;
  onConnect?: () => void;
}

/**
 * BottomNavigation
 * Exact 1:1 match to the user's reference (media_1794159907591_7b50e8ae.jpg):
 * - Left: Glowing red audio equalizer barcode
 * - Center: ✕ TENSION ✕ IMMERSION ✕ IMPACT ✕
 * - Right: Authentic avatar card with "ONLINE •" and "Let's Connect"
 */
export function BottomNavigation({
  className = "",
  onConnect,
}: BottomNavigationProps) {
  // 26 animated barcode bars
  const equalizerBars = [
    { id: 1, h: "8px", dur: "0.85s" },
    { id: 2, h: "15px", dur: "1.15s" },
    { id: 3, h: "11px", dur: "0.72s" },
    { id: 4, h: "17px", dur: "1.32s" },
    { id: 5, h: "14px", dur: "0.92s" },
    { id: 6, h: "9px", dur: "1.22s" },
    { id: 7, h: "16px", dur: "0.68s" },
    { id: 8, h: "13px", dur: "1.05s" },
    { id: 9, h: "15px", dur: "0.78s" },
    { id: 10, h: "10px", dur: "1.18s" },
    { id: 11, h: "18px", dur: "0.88s" },
    { id: 12, h: "12px", dur: "1.08s" },
    { id: 13, h: "14px", dur: "0.96s" },
    { id: 14, h: "16px", dur: "1.26s" },
    { id: 15, h: "10px", dur: "0.74s" },
    { id: 16, h: "17px", dur: "1.12s" },
    { id: 17, h: "13px", dur: "0.82s" },
    { id: 18, h: "19px", dur: "1.38s" },
    { id: 19, h: "11px", dur: "0.91s" },
    { id: 20, h: "16px", dur: "1.16s" },
    { id: 21, h: "14px", dur: "0.76s" },
    { id: 22, h: "18px", dur: "1.02s" },
    { id: 23, h: "9px", dur: "1.24s" },
    { id: 24, h: "15px", dur: "0.86s" },
    { id: 25, h: "12px", dur: "1.10s" },
    { id: 26, h: "17px", dur: "0.94s" },
  ];

  return (
    <div
      className={`relative z-30 w-full pb-4 sm:pb-5 pt-2 px-4 sm:px-8 md:px-12 flex items-center justify-between text-xs font-mono uppercase select-none pointer-events-none ${className}`}
    >
      {/* ─── 1. LEFT: GLOWING RED AUDIO EQUALIZER BARCODE ─── */}
      <div className="flex items-end gap-[2px] sm:gap-[2.5px] h-5">
        {equalizerBars.map((bar) => (
          <span
            key={bar.id}
            className="w-[2px] bg-[#FF1E38] rounded-full shadow-[0_0_6px_rgba(255,30,56,0.85)]"
            style={{
              height: bar.h,
              animation: `equalizerPulse ${bar.dur} ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ─── 2. CENTER: EXACT TELEMETRY STRIP (+ TENSION + IMMERSION + IMPACT +) ─── */}
      <div className="flex items-center gap-4 sm:gap-8 md:gap-12 text-[10px] sm:text-xs font-semibold tracking-[0.28em] text-white/95">
        <svg
          className="w-2.5 h-2.5 text-white/70 inline-block flex-shrink-0"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <line x1="5" y1="1" x2="5" y2="9" />
          <line x1="1" y1="5" x2="9" y2="5" />
        </svg>

        <span className="tracking-[0.32em] text-white">TENSION</span>

        <svg
          className="w-2.5 h-2.5 text-white/70 inline-block flex-shrink-0"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <line x1="5" y1="1" x2="5" y2="9" />
          <line x1="1" y1="5" x2="9" y2="5" />
        </svg>

        <span className="tracking-[0.32em] text-white">IMMERSION</span>

        <svg
          className="w-2.5 h-2.5 text-white/70 inline-block flex-shrink-0"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <line x1="5" y1="1" x2="5" y2="9" />
          <line x1="1" y1="5" x2="9" y2="5" />
        </svg>

        <span className="tracking-[0.32em] text-white">IMPACT</span>

        <svg
          className="w-2.5 h-2.5 text-white/70 inline-block flex-shrink-0"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <line x1="5" y1="1" x2="5" y2="9" />
          <line x1="1" y1="5" x2="9" y2="5" />
        </svg>
      </div>

      {/* ─── 3. RIGHT: AUTHENTIC "ONLINE • Let's Connect" BADGE ─── */}
      <div className="pointer-events-auto">
        <button
          onClick={onConnect}
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded bg-black/75 hover:bg-black border border-white/15 hover:border-[#FF1E38]/60 transition-all duration-200 shadow-[0_0_12px_rgba(0,0,0,0.85)] group cursor-pointer"
        >
          {/* Authentic Portrait Avatar */}
          <div className="w-6 h-7 rounded-[2px] overflow-hidden bg-neutral-900 border border-white/20 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar_connect.png"
              alt="Connect"
              className="w-full h-full object-cover filter contrast-125"
            />
          </div>

          <div className="flex flex-col text-left leading-none font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-white font-semibold tracking-wider">
                ONLINE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E38] shadow-[0_0_6px_#FF1E38] animate-pulse" />
            </div>
            <span className="text-[10px] text-white/80 tracking-wide font-sans mt-0.5 capitalize group-hover:text-white transition-colors">
              Let&apos;s Connect
            </span>
          </div>
        </button>
      </div>

      <style>{`
        @keyframes equalizerPulse {
          0% {
            transform: scaleY(0.3);
            opacity: 0.55;
          }
          100% {
            transform: scaleY(1.0);
            opacity: 1.0;
          }
        }
      `}</style>
    </div>
  );
}
