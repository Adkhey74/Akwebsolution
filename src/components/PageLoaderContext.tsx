"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { PageLoader } from "@/components/PageLoader";

type PageLoaderContextValue = {
  setVideoReady: () => void;
};

const PageLoaderContext = createContext<PageLoaderContextValue | null>(null);

const MIN_LOAD_MS = 800;
const MIN_LOAD_HOME_MS = 1100;
const READY_DELAY_MS = 400;
const MAX_WAIT_MS = 5000;

export function usePageLoader() {
  const ctx = useContext(PageLoaderContext);
  return ctx;
}

export function PageLoaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReadyState] = useState(false);
  const loadStartRef = useRef<number>(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setVideoReady = useCallback(() => setVideoReadyState(true), []);

  // Reset et afficher le loader à chaque changement de route
  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    setVideoReadyState(false);
    loadStartRef.current = Date.now();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  // Page d'accueil : barre progresse pendant l'attente, puis 100 % quand vidéo prête
  useEffect(() => {
    if (pathname !== "/") return;

    const tryComplete = () => {
      const elapsed = Date.now() - loadStartRef.current;
      if (videoReady && elapsed >= MIN_LOAD_HOME_MS) {
        setProgress(100);
        timeoutRef.current = setTimeout(() => setIsLoading(false), READY_DELAY_MS);
        return true;
      }
      return false;
    };

    // Faire avancer la barre jusqu'à ~85 % pendant l'attente
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - loadStartRef.current;
      const target = Math.min(85, (elapsed / MIN_LOAD_HOME_MS) * 85);
      setProgress((p) => Math.max(p, target));
    }, 80);

    const checkInterval = setInterval(() => {
      if (tryComplete()) clearInterval(checkInterval);
    }, 100);

    const maxWait = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
      setProgress(100);
      timeoutRef.current = setTimeout(() => setIsLoading(false), READY_DELAY_MS);
    }, MAX_WAIT_MS);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
      clearTimeout(maxWait);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pathname, videoReady]);

  // Autres pages : prêt après un court délai
  useEffect(() => {
    if (pathname === "/") return;

    const t1 = setTimeout(() => {
      setProgress(100);
      timeoutRef.current = setTimeout(() => setIsLoading(false), READY_DELAY_MS);
    }, MIN_LOAD_MS);

    return () => {
      clearTimeout(t1);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  return (
    <PageLoaderContext.Provider value={{ setVideoReady }}>
      {children}
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="loader" progress={progress} />}
      </AnimatePresence>
    </PageLoaderContext.Provider>
  );
}
