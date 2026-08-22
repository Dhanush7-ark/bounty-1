"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface LoadingContextValue {
  isLoading: boolean;
  isRevealed: boolean;
  onLoadingComplete: () => void;
  onRevealComplete: () => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: true,
  isRevealed: false,
  onLoadingComplete: () => {},
  onRevealComplete: () => {},
});

export function useLoadingState(): LoadingContextValue {
  return useContext(LoadingContext);
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);

  const onLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const onRevealComplete = useCallback(() => {
    setIsRevealed(true);
  }, []);

  return (
    <LoadingContext.Provider
      value={{ isLoading, isRevealed, onLoadingComplete, onRevealComplete }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
