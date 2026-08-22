"use client";

interface CanvasFallbackProps {
  message?: string;
}

export function CanvasFallback({
  message = "WebGL is unavailable on this browser or device.",
}: CanvasFallbackProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-6 text-center text-white">
      <div className="max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/80 p-8 backdrop-blur-md">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lime-500/10 text-lime-400">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">Bounty Bytes 3D Engine</h3>
        <p className="text-sm text-neutral-400">{message}</p>
        <p className="mt-4 text-xs text-neutral-500">
          The rest of the website remains fully accessible.
        </p>
      </div>
    </div>
  );
}
