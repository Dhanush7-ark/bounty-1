import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-lime-500/40 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-lime-500/5",
        className
      )}
    >
      {children}
    </div>
  );
}
