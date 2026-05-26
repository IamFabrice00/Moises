"use client";

import React, { useEffect, useState } from "react";
import { useDesignStore } from "@/lib/store/designStore";
import { translations } from "@/lib/i18n/translations";
import Navbar from "@/components/Navbar";
import StudioShowcase from "@/components/StudioShowcase";
import TshirtCanvas from "@/components/TshirtCanvas";
import ColorPicker from "@/components/steps/ColorPicker";
import LogoUpload from "@/components/steps/LogoUpload";
import LogoPositioner from "@/components/steps/LogoPositioner";
import FinalPreview from "@/components/steps/FinalPreview";
import OrderForm from "@/components/steps/OrderForm";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Home() {
  const { locale, currentStep, setStep } = useDesignStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToCustomizer = () => {
    const el = document.getElementById("customizer-studio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!mounted) return null;

  const t = translations[locale];

  // Custom step component mapping
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <ColorPicker key="step1" />;
      case 2:
        return <LogoUpload key="step2" />;
      case 3:
        return <LogoPositioner key="step3" />;
      case 4:
        return <FinalPreview key="step4" />;
      default:
        return null;
    }
  };

  // Horizontal transition animation settings
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-studio-bg text-studio-text-primary selection:bg-studio-accent selection:text-black">
      {/* Dynamic Header */}
      <Navbar />

      {/* Hero: Flagship 3D Couture Showroom */}
      <section className="relative flex flex-col items-center justify-center min-h-[92vh] pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          {/* Left: Draggable 192 frame model */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <StudioShowcase />
          </div>

          {/* Right: Premium Couture Intro */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 bg-studio-accent/10 border border-studio-accent/20 px-2 py-0.5 rounded text-[10px] font-bold text-studio-accent uppercase tracking-widest">
                <Sparkles className="h-3 w-3" />
                {t.hero.badge}
              </span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight uppercase">
              {locale === "es" ? "Merch" : "Merch"}{" "}
              <span className="text-studio-accent">Studio</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-studio-text-secondary leading-relaxed max-w-lg">
              {t.hero.description}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToCustomizer}
                className="flex items-center justify-center gap-2 bg-studio-accent text-black font-display text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-lg accent-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{t.hero.btnCreate}</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("atelier-concept");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 px-8 py-4 rounded-lg font-display text-xs font-bold tracking-widest uppercase transition-colors duration-200 cursor-pointer"
              >
                {t.hero.btnExplore}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customizer workspace layout */}
      <section
        id="customizer-studio"
        className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-studio-border/30 scroll-mt-20"
      >
        {currentStep <= 4 ? (
          // Steps 1 to 4: Dynamic Split layout (Canvas | Swatches)
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Split Left: High-fidelity customization Canvas */}
            <div className="lg:col-span-7 flex justify-center w-full sticky top-28">
              <TshirtCanvas />
            </div>

            {/* Split Right: Interactive step panel sheets */}
            <div className="lg:col-span-5 bg-studio-card border border-studio-border rounded-2xl p-6 sm:p-8 min-h-[450px] lg:min-h-[550px] flex flex-col justify-between shadow-xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {renderStepComponent()}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        ) : (
          // Step 5: Order sheets morphs to full-width card
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full"
          >
            <OrderForm />
          </motion.div>
        )}
      </section>

      {/* Conceptual Atelier Showcase Block */}
      <section
        id="atelier-concept"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-studio-border/30 text-center space-y-6"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="font-display text-xs font-bold text-studio-accent tracking-widest uppercase">
            {t.hero.conceptBadge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
            {locale === "it"
              ? "Stampa serigrafica "
              : locale === "en"
              ? "Luxury digital "
              : "Serigrafía digital "}
            <span className="text-studio-accent">
              {locale === "it"
                ? "digitale di lusso"
                : locale === "en"
                ? "screenprinting"
                : "de lujo"}
            </span>
          </h2>
          <p className="font-sans text-sm text-studio-text-secondary leading-relaxed">
            {t.hero.conceptDesc}
          </p>
        </div>
      </section>

      {/* Studio Footer */}
      <footer className="border-t border-studio-border bg-studio-bg py-12 text-center text-white/30 text-xs font-mono tracking-widest uppercase">
        <span>{t.hero.footer}</span>
      </footer>
    </div>
  );
}
