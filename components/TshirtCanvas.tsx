"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDesignStore } from "@/lib/store/designStore";
import { translations } from "@/lib/i18n/translations";
import { motion } from "framer-motion";
import { Rotate3d, Loader2 } from "lucide-react";

// Dynamic client-side import for R3F Canvas to fully resolve Next.js SSR WebGL contexts
const TshirtCanvas3D = dynamic(() => import("./TshirtCanvas3D"), {
  ssr: false,
  loading: () => <CanvasLoadingPlaceholder />,
});

// Premium Animated Skeleton Loading State
function CanvasLoadingPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-studio-card/10 backdrop-blur-md rounded-2xl">
      <Loader2 className="h-8 w-8 text-studio-accent animate-spin" />
      <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase mt-4 animate-pulse">
        Loading 3D Studio...
      </span>
    </div>
  );
}

export default function TshirtCanvas() {
  const { currentStep, locale } = useDesignStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[locale];
  const isFinalPreview = currentStep === 4;

  return (
    <motion.div
      animate={{
        scale: isFinalPreview ? [0.98, 1] : 1,
        opacity: [0.95, 1],
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative flex items-center justify-center bg-studio-card/30 border border-studio-border rounded-2xl p-4 overflow-hidden h-[450px] lg:h-[600px] w-full"
    >
      {/* Grid Blueprint Texture Background (visible during setup stages) */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.012)_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none transition-opacity duration-500 ${
          currentStep === 3 ? "opacity-100" : "opacity-40"
        }`}
      />

      {/* Floating 3D Badge Indicator */}
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-studio-bg/80 border border-studio-border text-white/50 text-[9px] font-mono tracking-widest uppercase py-1.5 px-3 rounded-md select-none pointer-events-none shadow-lg backdrop-blur-sm z-10">
        <Rotate3d className="h-3 w-3 text-studio-accent animate-pulse" />
        <span>3D Studio • 360° View</span>
      </div>

      {/* Swipe/Drag Instructions Overlay */}
      <div className="absolute bottom-6 flex items-center gap-1.5 bg-studio-bg/85 border border-studio-border text-white/40 text-[9px] font-sans tracking-wide py-1 px-3 rounded-full select-none pointer-events-none shadow-md backdrop-blur-sm z-10">
        <span>{t.showroom.hint}</span>
      </div>

      {/* 3D Canvas element */}
      <div className="w-full h-full flex items-center justify-center z-0">
        <TshirtCanvas3D />
      </div>
    </motion.div>
  );
}
