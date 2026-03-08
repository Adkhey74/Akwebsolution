"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LOGO_SRC = "/images/logo3.png";

type PageLoaderProps = {
  progress: number;
};

export function PageLoader({ progress }: PageLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      aria-hidden
    >
      {/* Barre de chargement — synchronisée avec le chargement réel */}
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-white/10">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(100, progress)}%` }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-[240px] sm:w-[300px] md:w-[340px]"
      >
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="[&_img]:brightness-0 [&_img]:invert"
        >
          <Image
            src={LOGO_SRC}
            alt="AK Web Solutions"
            width={340}
            height={105}
            className="h-auto w-full object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
