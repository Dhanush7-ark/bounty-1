"use client";

import { ReactNode } from "react";
import { LoadingProvider, useLoadingState } from "@/hooks/useLoadingState";
import { SmoothScrollProvider } from "@/hooks/useLenis";
import { CinematicLoader } from "@/components/loader/CinematicLoader";
import { CustomCursor } from "@/components/ui/CustomCursor";

function AppShellInner({ children }: { children: ReactNode }) {
  const { isLoading } = useLoadingState();

  return (
    <>
      {/* Custom Glowing Green Arrow Cursor */}
      <CustomCursor />

      {/* Cinematic loading overlay — renders on top of everything */}
      {isLoading && <CinematicLoader />}

      {/* Main website content — hidden behind the loader during asset prep */}
      <div
        style={{
          visibility: isLoading ? "hidden" : "visible",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.15s ease",
        }}
      >
        <main>{children}</main>
      </div>
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <LoadingProvider>
      <SmoothScrollProvider>
        <AppShellInner>{children}</AppShellInner>
      </SmoothScrollProvider>
    </LoadingProvider>
  );
}
