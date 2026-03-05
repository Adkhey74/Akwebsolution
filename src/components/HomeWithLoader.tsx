"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PricingSection } from "@/components/PricingSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";

const MIN_LOAD_TIME_MS = 1200;
const MAX_LOAD_TIME_MS = 4500;

export function HomeWithLoader() {
  const [showLoader, setShowLoader] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  const onVideoReady = useCallback(() => setVideoReady(true), []);

  useEffect(() => {
    const t = setTimeout(() => setMinTimeElapsed(true), MIN_LOAD_TIME_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), MAX_LOAD_TIME_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (videoReady && minTimeElapsed && showLoader) {
      const t = setTimeout(() => setShowLoader(false), 350);
      return () => clearTimeout(t);
    }
  }, [videoReady, minTimeElapsed, showLoader]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <AnimatePresence mode="wait">
        {showLoader && <PageLoader key="loader" />}
      </AnimatePresence>
      <Header />
      <main>
        <Hero onVideoReady={onVideoReady} />
        <PricingSection />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
