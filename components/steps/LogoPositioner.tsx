"use client";

import React, { useEffect, useState } from "react";
import { useDesignStore } from "@/lib/store/designStore";
import { translations } from "@/lib/i18n/translations";
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Maximize2, Move, ArrowRight } from "lucide-react";

export default function LogoPositioner() {
  const {
    locale,
    logoScale,
    logoRotation,
    setLogoScale,
    setLogoRotation,
    setLogoPosition,
    setStep,
  } = useDesignStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = translations[locale];

  // Quick Preset Alignments
  const alignLeftChest = () => {
    setLogoPosition({ x: -40, y: -45 });
  };

  const alignCenterChest = () => {
    setLogoPosition({ x: 0, y: -20 });
  };

  const alignRightChest = () => {
    setLogoPosition({ x: 40, y: -45 });
  };

  const resetTransforms = () => {
    setLogoScale(50);
    setLogoRotation(0);
    setLogoPosition({ x: 0, y: -20 });
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-bold text-studio-accent tracking-widest uppercase">
            {t.step3.step}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="font-sans text-xs text-studio-text-secondary">{t.step3.sub}</span>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-white mt-2 tracking-wide uppercase">
          {t.step3.title}
        </h2>
        <p className="font-sans text-sm text-studio-text-secondary mt-1.5 leading-relaxed">
          {t.step3.desc}
        </p>

        {/* Drag Hint banner */}
        <div className="flex items-center gap-3 bg-studio-card border border-studio-border p-3.5 rounded-xl mt-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-studio-accent/5 border border-studio-accent/20 text-studio-accent">
            <Move className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
              {t.step3.dragTipHeader}
            </span>
            <span className="font-sans text-[11px] text-studio-text-secondary mt-0.5">
              {t.step3.dragTipBody}
            </span>
          </div>
        </div>

        {/* Alignment Presets */}
        <div className="mt-8">
          <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
            {t.step3.presetsHeader}
          </span>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <button
              onClick={alignLeftChest}
              className="flex flex-col items-center justify-center gap-2 py-3 rounded-lg border border-studio-border bg-studio-card/20 hover:border-white/20 hover:bg-studio-card/45 transition-all duration-200 cursor-pointer"
            >
              <AlignLeft className="h-4.5 w-4.5 text-white/70" />
              <span className="font-sans text-[10px] text-white/50 uppercase tracking-wider text-center px-1">
                {t.step3.presetLeft}
              </span>
            </button>
            <button
              onClick={alignCenterChest}
              className="flex flex-col items-center justify-center gap-2 py-3 rounded-lg border border-studio-border bg-studio-card/20 hover:border-white/20 hover:bg-studio-card/45 transition-all duration-200 cursor-pointer"
            >
              <AlignCenter className="h-4.5 w-4.5 text-studio-accent" />
              <span className="font-sans text-[10px] text-white/50 uppercase tracking-wider text-center px-1">
                {t.step3.presetCenter}
              </span>
            </button>
            <button
              onClick={alignRightChest}
              className="flex flex-col items-center justify-center gap-2 py-3 rounded-lg border border-studio-border bg-studio-card/20 hover:border-white/20 hover:bg-studio-card/45 transition-all duration-200 cursor-pointer"
            >
              <AlignRight className="h-4.5 w-4.5 text-white/70" />
              <span className="font-sans text-[10px] text-white/50 uppercase tracking-wider text-center px-1">
                {t.step3.presetRight}
              </span>
            </button>
          </div>
        </div>

        {/* Sliders Container */}
        <div className="mt-8 space-y-6">
          {/* Dimension Slider */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <Maximize2 className="h-3.5 w-3.5 text-white/50" />
                <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                  {t.step3.sliderScale}
                </span>
              </div>
              <span className="font-sans text-xs font-bold text-studio-accent bg-studio-accent/5 border border-studio-accent/15 px-2 py-0.5 rounded">
                {logoScale}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={logoScale}
              onChange={(e) => setLogoScale(Number(e.target.value))}
              className="w-full h-1 bg-studio-border rounded-lg appearance-none cursor-pointer accent-studio-accent"
              style={{
                background: `linear-gradient(to right, #E8FF47 0%, #E8FF47 ${((logoScale - 20) / 80) * 100}%, #2A2A2A ${((logoScale - 20) / 80) * 100}%, #2A2A2A 100%)`
              }}
            />
          </div>

          {/* Rotation Slider */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-white/50" />
                <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                  {t.step3.sliderRotation}
                </span>
              </div>
              <span className="font-sans text-xs font-bold text-studio-accent bg-studio-accent/5 border border-studio-accent/15 px-2 py-0.5 rounded">
                {logoRotation}°
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={logoRotation}
              onChange={(e) => setLogoRotation(Number(e.target.value))}
              className="w-full h-1 bg-studio-border rounded-lg appearance-none cursor-pointer accent-studio-accent"
              style={{
                background: `linear-gradient(to right, #E8FF47 0%, #E8FF47 ${((logoRotation + 30) / 60) * 100}%, #2A2A2A ${((logoRotation + 30) / 60) * 100}%, #2A2A2A 100%)`
              }}
            />
          </div>
        </div>

        {/* Reset utilities button */}
        <button
          onClick={resetTransforms}
          className="mt-6 text-[11px] font-sans text-white/40 hover:text-white uppercase tracking-wider cursor-pointer"
        >
          {t.step3.reset}
        </button>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 pt-6 border-t border-studio-border/60">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setStep(2)}
            className="font-sans text-xs text-white/50 hover:text-white uppercase tracking-wider cursor-pointer text-left"
          >
            {t.step3.btnBack}
          </button>

          <button
            onClick={() => setStep(4)}
            className="flex items-center gap-2 bg-studio-accent text-black font-display text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-lg accent-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{t.step3.btnNext}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
