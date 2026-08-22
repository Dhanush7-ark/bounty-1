"use client";

import { useProgress, Html } from "@react-three/drei";

interface Preloader3DProps {
  onLoaded?: () => void;
}

export function Preloader3D({ onLoaded }: Preloader3DProps) {
  const { progress, active } = useProgress();

  if (!active && progress === 100 && onLoaded) {
    onLoaded();
  }

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center rounded-xl border border-lime-500/20 bg-black/90 px-6 py-4 backdrop-blur-md">
        <div className="mb-2 text-xs font-mono tracking-wider text-lime-400 font-semibold">
          BOUNTY BYTES 3D ENGINE
        </div>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-neutral-900">
          <div
            className="h-full bg-gradient-to-r from-lime-500 to-emerald-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="mt-1 text-[10px] font-mono text-neutral-400">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}
