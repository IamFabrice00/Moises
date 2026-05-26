"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDesignStore, SizeSelection } from "@/lib/store/designStore";
import { translations } from "@/lib/i18n/translations";
import { COLORS } from "./ColorPicker";
import { drawTshirt, setupRetinaCanvas } from "@/lib/canvas/tshirtCompositor";
import { CheckCircle2, Loader2, Sparkles, Truck, Users, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COUNTRIES = [
  { key: "it", name: { it: "Italia", en: "Italy", es: "Italia" } },
  { key: "fr", name: { it: "Francia", en: "France", es: "Francia" } },
  { key: "de", name: { it: "Germania", en: "Germany", es: "Alemania" } },
  { key: "es", name: { it: "Spagna", en: "Spain", es: "España" } },
  { key: "ch", name: { it: "Svizzera", en: "Switzerland", es: "Suiza" } },
];

export default function OrderForm() {
  const {
    locale,
    tshirtColor,
    logoScale,
    logoRotation,
    logoPosition,
    logoDataUrl,
    setStep,
    resetAll,
  } = useDesignStore();

  const [mounted, setMounted] = useState(false);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const thumbCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("it");

  // Size Distribution State
  const [sizes, setSizes] = useState<SizeSelection>({
    xs: 0,
    s: 5,
    m: 10,
    l: 10,
    xl: 5,
    xxl: 0,
  });

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = translations[locale];

  // Pre-load logo for the thumbnail canvas
  useEffect(() => {
    if (logoDataUrl) {
      const img = new Image();
      img.src = logoDataUrl;
      img.onload = () => setLogoImg(img);
    }
  }, [logoDataUrl]);

  // Render thumbnail canvas
  useEffect(() => {
    const canvas = thumbCanvasRef.current;
    if (!canvas || !mounted) return;

    const ctx = setupRetinaCanvas(canvas, 120, 144);
    drawTshirt(ctx, tshirtColor, logoImg, logoPosition, logoScale, logoRotation, {
      showPrintArea: false,
      isDragging: false,
      width: 120,
      height: 144,
    });
  }, [tshirtColor, logoImg, logoPosition, logoScale, logoRotation, mounted]);

  if (!mounted) return null;

  // Aggregate quantity from sizes
  const totalQuantity = Object.values(sizes).reduce((acc, qty) => acc + qty, 0);

  // Price calculations
  const basePrice = 15.0; // € per pc
  let discount = 0.0;
  if (totalQuantity >= 100) {
    discount = 0.2; // -20%
  } else if (totalQuantity >= 50) {
    discount = 0.1; // -10%
  }

  const unitPrice = basePrice * (1 - discount);
  const totalPrice = unitPrice * totalQuantity;

  // Shipping details
  const getDeliveryEstimate = () => {
    if (totalQuantity >= 100) return t.step5.estDelivery100;
    if (totalQuantity >= 50) return t.step5.estDelivery50;
    return t.step5.estDeliveryBase;
  };

  const handleSizeChange = (key: keyof SizeSelection, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setSizes((prev) => ({
      ...prev,
      [key]: numValue,
    }));
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!fullName.trim()) tempErrors.fullName = t.step5.errName;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = t.step5.errEmail;
    } else if (!emailRegex.test(email)) {
      tempErrors.email = t.step5.errEmailFormat;
    }

    if (!street.trim()) tempErrors.street = t.step5.errStreet;
    if (!city.trim()) tempErrors.city = t.step5.errCity;
    if (!zipCode.trim()) tempErrors.zipCode = t.step5.errZip;

    if (totalQuantity <= 0) {
      tempErrors.quantity = t.step5.errQuantity;
    } else if (totalQuantity > 500) {
      tempErrors.quantity = t.step5.errMaxQuantity;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2200);
  };

  const handleRestart = () => {
    resetAll();
    window.location.reload();
  };

  const selectedColorName =
    COLORS.find((c) => c.hex.toLowerCase() === tshirtColor.toLowerCase())?.name[locale] || "";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="order-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left: Input sheet (7 columns) */}
            <div className="lg:col-span-7 bg-studio-card border border-studio-border rounded-2xl p-6 sm:p-8 space-y-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-xs font-bold text-studio-accent tracking-widest uppercase">
                    {t.step5.step}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-sans text-xs text-studio-text-secondary">{t.step5.sub}</span>
                </div>
                <h2 className="font-display text-2xl font-extrabold text-white mt-2 tracking-wide uppercase">
                  {t.step5.title}
                </h2>
                <p className="font-sans text-sm text-studio-text-secondary mt-1.5 leading-relaxed">
                  {t.step5.desc}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Contatti */}
                <div className="space-y-4">
                  <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider border-b border-studio-border/50 pb-2">
                    {t.step5.secContact}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] text-white/50 uppercase tracking-wider">
                        {t.step5.labelName}
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.step5.placeName}
                        className={`bg-studio-bg/60 border ${
                          errors.fullName ? "border-red-500/40" : "border-studio-border"
                        } px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 focus:border-studio-accent focus:ring-1 focus:ring-studio-accent/20 outline-none transition-all duration-150`}
                      />
                      {errors.fullName && (
                        <span className="font-sans text-[10px] text-red-400 mt-1">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] text-white/50 uppercase tracking-wider">
                        {t.step5.labelEmail}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.step5.placeEmail}
                        className={`bg-studio-bg/60 border ${
                          errors.email ? "border-red-500/40" : "border-studio-border"
                        } px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 focus:border-studio-accent focus:ring-1 focus:ring-studio-accent/20 outline-none transition-all duration-150`}
                      />
                      {errors.email && (
                        <span className="font-sans text-[10px] text-red-400 mt-1">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] text-white/50 uppercase tracking-wider">
                      {t.step5.labelPhone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.step5.placePhone}
                      className="bg-studio-bg/60 border border-studio-border px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 focus:border-studio-accent focus:ring-1 focus:ring-studio-accent/20 outline-none transition-all duration-150"
                    />
                  </div>
                </div>

                {/* Section 2: Size Matrix */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-studio-border/50 pb-2">
                    <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
                      {t.step5.secSizes}
                    </h3>
                    {totalQuantity >= 50 && (
                      <span className="flex items-center gap-1 bg-studio-accent/10 border border-studio-accent/20 px-2 py-0.5 rounded text-[10px] font-bold text-studio-accent uppercase tracking-wider animate-pulse">
                        <Sparkles className="h-3 w-3" />
                        {t.step5.sizesApplied}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {(Object.keys(sizes) as Array<keyof SizeSelection>).map((sizeKey) => (
                      <div
                        key={sizeKey}
                        className="flex flex-col items-center bg-studio-bg/40 border border-studio-border rounded-lg p-2.5"
                      >
                        <span className="font-display text-xs font-extrabold text-white/60 uppercase">
                          {sizeKey}
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={sizes[sizeKey] || ""}
                          onChange={(e) => handleSizeChange(sizeKey, e.target.value)}
                          className="w-full bg-transparent border-b border-studio-border focus:border-studio-accent outline-none text-center font-mono font-bold text-sm text-studio-accent mt-2 py-1"
                        />
                      </div>
                    ))}
                  </div>
                  {errors.quantity && (
                    <span className="font-sans text-[10px] text-red-400 mt-1 block">{errors.quantity}</span>
                  )}
                </div>

                {/* Section 3: Indirizzo */}
                <div className="space-y-4">
                  <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider border-b border-studio-border/50 pb-2">
                    {t.step5.secAddress}
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] text-white/50 uppercase tracking-wider">
                      {t.step5.labelStreet}
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder={t.step5.placeStreet}
                      className={`bg-studio-bg/60 border ${
                        errors.street ? "border-red-500/40" : "border-studio-border"
                      } px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 focus:border-studio-accent focus:ring-1 focus:ring-studio-accent/20 outline-none transition-all duration-150`}
                    />
                    {errors.street && (
                      <span className="font-sans text-[10px] text-red-400 mt-1">{errors.street}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5 sm:col-span-1.5">
                      <label className="font-sans text-[11px] text-white/50 uppercase tracking-wider">
                        {t.step5.labelCity}
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={t.step5.placeCity}
                        className={`bg-studio-bg/60 border ${
                          errors.city ? "border-red-500/40" : "border-studio-border"
                        } px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 focus:border-studio-accent focus:ring-1 focus:ring-studio-accent/20 outline-none transition-all duration-150`}
                      />
                      {errors.city && (
                        <span className="font-sans text-[10px] text-red-400 mt-1">{errors.city}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] text-white/50 uppercase tracking-wider">
                        {t.step5.labelZip}
                      </label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder={t.step5.placeZip}
                        className={`bg-studio-bg/60 border ${
                          errors.zipCode ? "border-red-500/40" : "border-studio-border"
                        } px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 focus:border-studio-accent focus:ring-1 focus:ring-studio-accent/20 outline-none transition-all duration-150`}
                      />
                      {errors.zipCode && (
                        <span className="font-sans text-[10px] text-red-400 mt-1">{errors.zipCode}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] text-white/50 uppercase tracking-wider">
                        {t.step5.labelCountry}
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="bg-studio-bg/60 border border-studio-border px-4 py-3 rounded-lg text-sm text-white focus:border-studio-accent focus:ring-1 focus:ring-studio-accent/20 outline-none transition-all duration-150 cursor-pointer"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.key} value={c.key}>
                            {c.name[locale]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 4: Notes */}
                <div className="space-y-4">
                  <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider border-b border-studio-border/50 pb-2">
                    {t.step5.secNotes}
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.step5.placeNotes}
                      rows={3}
                      className="bg-studio-bg/60 border border-studio-border px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 focus:border-studio-accent focus:ring-1 focus:ring-studio-accent/20 outline-none transition-all duration-150 resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex-1 font-sans text-xs text-white/50 hover:text-white uppercase tracking-wider cursor-pointer text-center border border-studio-border rounded-lg py-3 hover:bg-white/5"
                  >
                    {t.step5.btnBack}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] flex items-center justify-center gap-2 bg-studio-accent text-black font-display text-xs font-bold tracking-widest uppercase py-3.5 rounded-lg accent-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t.step5.btnSending}</span>
                      </>
                    ) : (
                      <span>{t.step5.btnSubmit}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Real-time Order Summary Sidebar (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Product Card */}
              <div className="bg-studio-card border border-studio-border rounded-2xl p-6 flex flex-col items-center">
                <span className="font-display text-[10px] font-bold text-studio-accent tracking-widest uppercase mb-4 self-start">
                  {t.step5.configuredProduct}
                </span>
                
                {/* Mini Canvas Thumbnail */}
                <div className="relative bg-studio-border/20 rounded-xl p-3 border border-white/5 w-36 h-40 flex items-center justify-center shadow-inner overflow-hidden">
                  <canvas ref={thumbCanvasRef} className="w-[120px] h-[144px] pointer-events-none select-none" />
                </div>

                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mt-5">
                  {t.step5.productTitle}
                </h3>
                <p className="font-sans text-[11px] text-studio-text-secondary mt-1">
                  {t.step5.productColor}: <span className="text-white/80 font-semibold">{selectedColorName}</span>
                </p>
              </div>

              {/* Price Breakdown Card */}
              <div className="bg-studio-card border border-studio-border rounded-2xl p-6 space-y-4">
                <span className="font-display text-[10px] font-bold text-white/55 tracking-widest uppercase block">
                  {t.step5.summaryCosts}
                </span>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-studio-text-secondary">{t.step5.summaryQty}</span>
                    <span className="font-mono text-white/90 font-bold">{totalQuantity} pz</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-studio-text-secondary">{t.step5.summaryBasePrice}</span>
                    <span className="font-mono text-white/80">{basePrice.toFixed(2)} €</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-studio-accent font-semibold">
                      <span>{t.step5.summaryDiscount} (-{discount * 100}%)</span>
                      <span className="font-mono">-{ (basePrice * discount).toFixed(2) } €</span>
                    </div>
                  )}

                  <div className="h-px bg-studio-border/50 my-1" />

                  <div className="flex justify-between text-base font-bold">
                    <span className="font-display uppercase tracking-wider text-white">{t.step5.summaryTotal}</span>
                    <span className="font-mono text-studio-accent">{totalPrice.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Delivery details */}
                <div className="bg-studio-bg/60 border border-studio-border/60 rounded-xl p-3.5 mt-5 space-y-3">
                  <div className="flex gap-3 text-[11px]">
                    <Truck className="h-4 w-4 text-studio-accent shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-white/90 uppercase tracking-wide">
                        {t.step5.estDeliveryHeader}
                      </span>
                      <span className="font-sans text-studio-text-secondary mt-0.5 leading-relaxed">
                        {getDeliveryEstimate()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-[11px] border-t border-studio-border/30 pt-3">
                    <Users className="h-4 w-4 text-studio-accent shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-white/90 uppercase tracking-wide">
                        {t.step5.supportHeader}
                      </span>
                      <span className="font-sans text-studio-text-secondary mt-0.5 leading-relaxed">
                        {t.step5.supportDesc}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Post-Submit Success Screen */
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-studio-card border border-studio-border rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="flex items-center justify-center w-20 h-20 rounded-full bg-studio-accent/5 border border-studio-accent/20 text-studio-accent mb-6"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>

            <h2 className="font-display text-2xl font-black tracking-wide text-white uppercase">
              {t.step5.successHeader}
            </h2>
            
            <p className="font-sans text-sm text-studio-text-secondary mt-4 leading-relaxed">
              {t.step5.successBody}
            </p>

            <div className="bg-studio-bg/60 border border-studio-border rounded-xl p-4 w-full mt-6 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/40 uppercase">{t.step5.successConfirmEmail}</span>
                <span className="font-mono text-white/80 font-bold">{email}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40 uppercase">{t.step5.successConfirmPrice}</span>
                <span className="font-mono text-studio-accent font-bold">{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40 uppercase">{t.step5.successConfirmQty}</span>
                <span className="font-mono text-white/80 font-bold">{totalQuantity} {locale === "it" ? "pezzi" : locale === "en" ? "pieces" : "piezas"}</span>
              </div>
            </div>

            <p className="font-sans text-xs text-studio-accent mt-6 leading-normal font-semibold">
              {t.step5.successConfirmTimeline}
            </p>

            <button
              onClick={handleRestart}
              className="mt-8 flex items-center gap-2 bg-studio-accent text-black font-display text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-lg accent-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{t.step5.successReset}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
