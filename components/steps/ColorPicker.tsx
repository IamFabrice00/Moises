"use client";

import React, { useEffect, useState } from "react";
import { useDesignStore } from "@/lib/store/designStore";
import { translations } from "@/lib/i18n/translations";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const COLORS = [
  { name: { it: "Bianco", en: "White", es: "Blanco" }, hex: "#FFFFFF", isDark: false },
  { name: { it: "Nero", en: "Black", es: "Negro" }, hex: "#1A1A1A", isDark: true },
  { name: { it: "Grigio", en: "Gray", es: "Gris" }, hex: "#8A8A8A", isDark: false },
  { name: { it: "Navy", en: "Navy", es: "Navy" }, hex: "#1B2A4A", isDark: true },
  { name: { it: "Blu Elettrico", en: "Electric Blue", es: "Azul Eléctrico" }, hex: "#2563EB", isDark: true },
  { name: { it: "Verde Salvia", en: "Sage Green", es: "Verde Salvia" }, hex: "#5A7A5A", isDark: true },
  { name: { it: "Rosso", en: "Red", es: "Rojo" }, hex: "#C0392B", isDark: true },
  { name: { it: "Arancio", en: "Orange", es: "Naranja" }, hex: "#E67E22", isDark: false },
  { name: { it: "Rosa Cipria", en: "Blush Pink", es: "Rosa Palo" }, hex: "#F4B8B8", isDark: false },
  { name: { it: "Giallo", en: "Yellow", es: "Amarillo" }, hex: "#F5D76E", isDark: false },
  { name: { it: "Viola", en: "Purple", es: "Púrpura" }, hex: "#6C3483", isDark: true },
  { name: { it: "Beige", en: "Beige", es: "Beige" }, hex: "#F5F0E8", isDark: false },
];

export default function ColorPicker() {
  const { locale, tshirtColor, setColor, setStep } = useDesignStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[locale];

  const getSelectedColorName = () => {
    const colorObj = COLORS.find((c) => c.hex.toLowerCase() === tshirtColor.toLowerCase());
    if (!colorObj) return "";
    return colorObj.name[locale];
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-bold text-studio-accent tracking-widest uppercase">
            {t.step1.step}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="font-sans text-xs text-studio-text-secondary">{t.step1.sub}</span>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-white mt-2 tracking-wide uppercase">
          {t.step1.title}
        </h2>
        <p className="font-sans text-sm text-studio-text-secondary mt-1.5 leading-relaxed">
          {t.step1.desc}
        </p>

        {/* Swatches Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mt-8">
          {COLORS.map((c) => {
            const isSelected = tshirtColor.toLowerCase() === c.hex.toLowerCase();
            const colorName = c.name[locale];

            return (
              <div key={c.hex} className="flex flex-col items-center gap-1.5 group">
                <button
                  onClick={() => setColor(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className={`relative w-12 h-12 rounded-full border border-studio-border cursor-pointer transition-all duration-300 hover:scale-115 hover:border-white/40 flex items-center justify-center ${
                    isSelected ? "border-2 border-studio-accent ring-2 ring-studio-accent/25" : ""
                  }`}
                  title={colorName}
                >
                  {isSelected && (
                    <Check
                      className={`h-5.5 w-5.5 ${
                        c.isDark ? "text-white" : "text-black"
                      } font-extrabold drop-shadow-md`}
                    />
                  )}
                </button>
                <span className="font-sans text-[10px] text-white/45 group-hover:text-white/80 transition-colors duration-200 mt-1 truncate max-w-full text-center">
                  {colorName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 pt-6 border-t border-studio-border/60">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex flex-col">
            <span className="font-sans text-[10px] tracking-wider text-studio-text-secondary uppercase">
              {t.step1.selected}
            </span>
            <span className="font-display text-sm font-bold text-white">
              {getSelectedColorName()}
            </span>
          </div>

          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 bg-studio-accent hover:bg-studio-accent text-black font-display text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-lg accent-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{t.step1.btnNext}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
