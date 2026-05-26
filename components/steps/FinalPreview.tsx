"use client";

import React, { useEffect, useState } from "react";
import { useDesignStore } from "@/lib/store/designStore";
import { translations } from "@/lib/i18n/translations";
import { COLORS } from "./ColorPicker";
import { ArrowRight, Edit3, Settings } from "lucide-react";

export default function FinalPreview() {
  const {
    locale,
    tshirtColor,
    logoScale,
    logoRotation,
    logoPosition,
    logoDataUrl,
    setStep,
  } = useDesignStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = translations[locale];

  // Format textual position descriptions based on offsets and locale
  const getPositionText = () => {
    const x = Math.round(logoPosition.x);
    const y = Math.round(logoPosition.y);

    if (x === 0 && y === -20) return t.step4.positionCenter;
    if (x < -15 && y < -30) return t.step4.positionLeft;
    if (x > 15 && y < -30) return t.step4.positionRight;

    const xDir =
      x > 0
        ? locale === "it"
          ? "destra"
          : locale === "en"
          ? "right"
          : "derecha"
        : locale === "it"
        ? "sinistra"
        : locale === "en"
        ? "left"
        : "izquierda";

    const yDir =
      y > 0
        ? locale === "it"
          ? "basso"
          : locale === "en"
          ? "down"
          : "abajo"
        : locale === "it"
        ? "alto"
        : locale === "en"
        ? "up"
        : "arriba";

    return t.step4.positionCustom
      .replace("{x}", String(Math.abs(x)))
      .replace("{xDir}", xDir)
      .replace("{y}", String(Math.abs(y)))
      .replace("{yDir}", yDir);
  };

  const selectedColorName =
    COLORS.find((c) => c.hex.toLowerCase() === tshirtColor.toLowerCase())?.name[locale] || "";

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-bold text-studio-accent tracking-widest uppercase">
            {t.step4.step}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="font-sans text-xs text-studio-text-secondary">{t.step4.sub}</span>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-white mt-2 tracking-wide uppercase">
          {t.step4.title}
        </h2>
        <p className="font-sans text-sm text-studio-text-secondary mt-1.5 leading-relaxed">
          {t.step4.desc}
        </p>

        {/* Configuration Summary Card */}
        <div className="mt-8 bg-studio-card border border-studio-border rounded-xl p-5 space-y-5">
          {/* Swatch Base Color */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] tracking-wider text-studio-text-secondary uppercase">
                {t.step4.fabricColor}
              </span>
              <span className="font-display text-sm font-bold text-white mt-0.5">
                {selectedColorName}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span
                style={{ backgroundColor: tshirtColor }}
                className="w-7 h-7 rounded-full border border-studio-border shadow-md"
              />
              <button
                onClick={() => setStep(1)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-studio-border/50 hover:bg-studio-border text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                title={t.step4.editColor}
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="h-px bg-studio-border/60" />

          {/* Logo Details */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] tracking-wider text-studio-text-secondary uppercase">
                {t.step4.printLogo}
              </span>
              <span className="font-display text-sm font-bold text-white mt-0.5">
                {locale === "it"
                  ? "Posizionata con successo"
                  : locale === "en"
                  ? "Positioned successfully"
                  : "Posicionado con éxito"}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {logoDataUrl && (
                <div className="w-9 h-9 flex items-center justify-center bg-studio-border/50 border border-white/5 rounded-lg p-1 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoDataUrl}
                    alt="Logo preview"
                    className="max-w-full max-h-full object-contain pointer-events-none select-none"
                  />
                </div>
              )}
              <button
                onClick={() => setStep(2)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-studio-border/50 hover:bg-studio-border text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                title={t.step4.editLogo}
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="h-px bg-studio-border/60" />

          {/* Coordinates Summary */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] tracking-wider text-studio-text-secondary uppercase">
                {t.step4.logoPosition}
              </span>
              <span className="font-display text-sm font-bold text-white mt-0.5 truncate max-w-[200px]">
                {getPositionText()}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col items-end text-[11px] font-mono text-studio-accent bg-studio-accent/5 border border-studio-accent/15 px-2 py-0.5 rounded">
                <span>Dim: {logoScale}%</span>
                <span className="mt-0.5">Rot: {logoRotation}°</span>
              </div>
              <button
                onClick={() => setStep(3)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-studio-border/50 hover:bg-studio-border text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                title={t.step4.editPosition}
              >
                <Settings className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 pt-6 border-t border-studio-border/60">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setStep(3)}
            className="font-sans text-xs text-white/50 hover:text-white uppercase tracking-wider cursor-pointer text-left"
          >
            {t.step4.btnBack}
          </button>

          <button
            onClick={() => setStep(5)}
            className="flex items-center gap-2 bg-studio-accent text-black font-display text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-lg accent-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{t.step4.btnNext}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
