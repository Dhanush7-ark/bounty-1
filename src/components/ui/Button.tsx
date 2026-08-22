import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500/50 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-lime-500 to-emerald-500 text-black font-bold hover:from-lime-400 hover:to-emerald-400 shadow-lg shadow-lime-500/25 border border-lime-400/30",
    secondary: "bg-neutral-900 text-neutral-100 hover:bg-neutral-800 border border-neutral-800",
    outline:
      "border border-lime-500/30 bg-black/40 text-lime-400 hover:bg-lime-500/10 hover:border-lime-400/60 backdrop-blur-sm",
    ghost: "text-neutral-300 hover:text-lime-400 hover:bg-lime-500/10",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
