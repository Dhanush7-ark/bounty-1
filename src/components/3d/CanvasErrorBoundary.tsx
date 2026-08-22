"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { CanvasFallback } from "./CanvasFallback";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("3D Canvas Error Boundary caught an error:", error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <CanvasFallback message="Failed to load 3D graphics canvas." />;
    }

    return this.props.children;
  }
}
