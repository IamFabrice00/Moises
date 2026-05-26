"use client";

import React, { useEffect, useState } from "react";
import { useDesignStore } from "@/lib/store/designStore";
import { translations, Locale } from "@/lib/i18n/translations";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { locale, setLocale, currentStep, setStep, logoDataUrl } = useDesignStore();
  const [mounted, setMounted] = useState(false);

  // Prevent SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 z-50 w-full border-b border-studio-border bg-studio-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="font-display text-lg font-bold tracking-widest text-white">
            MERCH STUDIO
          </div>
          <div></div>
        </div>
      </header>
    );
  }

  const steps = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const t = translations[locale];

  // Order is active if logo is loaded and step 4 is reached/completed
  const isOrderUnlocked = logoDataUrl !== null && currentStep >= 4;

  const handleStepClick = (stepId: number) => {
    if (stepId === 2 && currentStep < 1) return;
    if (stepId === 3 && !logoDataUrl) return;
    if (stepId === 4 && !logoDataUrl) return;
    if (stepId === 5 && !isOrderUnlocked) return;
    setStep(stepId as 1 | 2 | 3 | 4 | 5);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-studio-border bg-studio-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand logo */}
        <div
          onClick={() => setStep(1)}
          className="cursor-pointer font-display text-xl font-extrabold tracking-widest text-white select-none transition-opacity hover:opacity-80"
        >
          MERCH <span className="text-studio-accent">STUDIO</span>
        </div>

        {/* Center: Linear step indicators (Desktop) */}
        <nav className="hidden md:flex items-center space-x-2">
          {steps.map((s, idx) => {
            const isActive = currentStep === s.id;
            const isCompleted = currentStep > s.id;
            const isSelectable =
              s.id === 1 ||
              (s.id === 2 && currentStep >= 1) ||
              (s.id === 3 && logoDataUrl) ||
              (s.id === 4 && logoDataUrl) ||
              (s.id === 5 && isOrderUnlocked);

            const stepName = t.navbar.steps[s.id as 1 | 2 | 3 | 4 | 5];

            return (
              <React.Fragment key={s.id}>
                {idx > 0 && (
                  <span className="text-white/20 select-none px-1 text-xs">→</span>
                )}
                <button
                  onClick={() => handleStepClick(s.id)}
                  disabled={!isSelectable}
                  className={`relative px-3.5 py-1.5 rounded-full font-display text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-black font-bold"
                      : isCompleted
                      ? "text-white/80 hover:text-white"
                      : isSelectable
                      ? "text-white/50 hover:text-white/80 cursor-pointer"
                      : "text-white/20 cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10">{stepName}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeStepIndicator"
                      className="absolute inset-0 rounded-full bg-studio-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Center: Simplified step indicator (Mobile) */}
        <div className="flex md:hidden items-center justify-center bg-studio-card/80 border border-studio-border px-3.5 py-1.5 rounded-full">
          <span className="font-display text-[10px] tracking-wider text-studio-text-secondary uppercase mr-1.5">
            Step
          </span>
          <span className="font-display text-xs font-bold text-studio-accent">
            {currentStep}
          </span>
          <span className="text-white/30 px-0.5 text-xs">/</span>
          <span className="font-display text-xs text-white/50">5</span>
        </div>

        {/* Right Controls: Switcher + Checkout button */}
        <div className="flex items-center">
          {/* i18n Typographic Switcher */}
          <div className="flex items-center gap-1.5 border-r border-studio-border pr-4 mr-4 text-[10px] font-mono tracking-wider uppercase select-none">
            {(["it", "en", "es"] as Locale[]).map((loc) => {
              const isSelected = locale === loc;
              return (
                <button
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`px-1.5 py-0.5 rounded transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "text-black bg-studio-accent font-bold rounded"
                      : "text-white/40 hover:text-white/80"
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => isOrderUnlocked && setStep(5)}
            disabled={!isOrderUnlocked}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
              isOrderUnlocked
                ? "bg-studio-accent text-black accent-glow cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{t.navbar.order}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
