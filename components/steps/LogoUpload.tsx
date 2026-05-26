"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDesignStore } from "@/lib/store/designStore";
import { translations } from "@/lib/i18n/translations";
import { useDropzone } from "react-dropzone";
import { Upload, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoUpload() {
  const { locale, logoFile, logoDataUrl, setLogo, setStep } = useDesignStore();
  const [mounted, setMounted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = translations[locale];

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setErrorMsg(null);

      if (rejectedFiles.length > 0) {
        const firstReject = rejectedFiles[0];
        if (firstReject.file.size > 10 * 1024 * 1024) {
          setErrorMsg(t.step2.sizeError);
        } else {
          setErrorMsg(t.step2.formatError);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setLogo(file, dataUrl);
        };
        reader.onerror = () => {
          setErrorMsg(t.step2.readError);
        };
        reader.readAsDataURL(file);
      }
    },
    [setLogo, t]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/svg+xml": [".svg"],
      "image/webp": [".webp"],
    },
  });

  const handleRemove = () => {
    setLogo(null, null);
    setErrorMsg(null);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-bold text-studio-accent tracking-widest uppercase">
            {t.step2.step}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="font-sans text-xs text-studio-text-secondary">{t.step2.sub}</span>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-white mt-2 tracking-wide uppercase">
          {t.step2.title}
        </h2>
        <p className="font-sans text-sm text-studio-text-secondary mt-1.5 leading-relaxed">
          {t.step2.desc}
        </p>

        {/* Dropzone Area */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {!logoDataUrl ? (
              <div {...getRootProps()} className="outline-none">
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`relative flex flex-col items-center justify-center p-8 h-64 border-2 border-dashed rounded-xl cursor-pointer select-none transition-all duration-300 ${
                    isDragActive
                      ? "border-studio-accent bg-studio-accent/5 accent-glow"
                      : "border-studio-border bg-studio-card/20 hover:border-white/20 hover:bg-studio-card/30"
                  }`}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    animate={{ y: isDragActive ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border mb-4 transition-colors duration-300 ${
                      isDragActive ? "border-studio-accent text-studio-accent bg-studio-accent/5" : "border-studio-border text-white/50"
                    }`}
                  >
                    <Upload className="h-5.5 w-5.5" />
                  </motion.div>
                  <p className="font-display text-xs font-bold tracking-wide text-white/90 text-center uppercase">
                    {isDragActive ? t.step2.dropzoneActive : t.step2.dropzoneIdle}
                  </p>
                  <p className="font-sans text-xs text-studio-text-secondary mt-1 text-center">
                    {t.step2.dropzoneBrowse}
                  </p>
                  <div className="flex gap-3 mt-6 text-[10px] text-white/30 font-mono tracking-wide uppercase">
                    <span>{t.step2.formats}</span>
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-col items-center justify-center p-6 h-64 border border-studio-border bg-studio-card/40 rounded-xl"
              >
                {/* Remove button */}
                <button
                  onClick={handleRemove}
                  className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-studio-border/60 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-white/60 hover:text-red-400 cursor-pointer transition-colors duration-200"
                  title={t.step2.remove}
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Thumbnail Display */}
                <div className="relative w-28 h-28 flex items-center justify-center bg-studio-border/40 rounded-lg p-2 overflow-hidden border border-white/5 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoDataUrl}
                    alt="Logo caricato"
                    className="max-w-full max-h-full object-contain filter drop-shadow-md select-none pointer-events-none"
                  />
                </div>

                <div className="mt-4 text-center">
                  <p className="font-display text-xs font-bold text-white truncate max-w-64 uppercase tracking-wider">
                    {logoFile?.name || "Logo caricato"}
                  </p>
                  <p className="font-sans text-[10px] text-studio-text-secondary mt-0.5">
                    {((logoFile?.size || 0) / 1024 / 1024).toFixed(2)} MB • {t.step2.ready}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error Feedback */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 font-sans text-xs text-center leading-relaxed"
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 pt-6 border-t border-studio-border/60">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setStep(1)}
            className="font-sans text-xs text-white/50 hover:text-white uppercase tracking-wider cursor-pointer text-left"
          >
            {t.step2.btnBack}
          </button>

          <button
            onClick={() => logoDataUrl && setStep(3)}
            disabled={!logoDataUrl}
            className={`flex items-center gap-2 font-display text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              logoDataUrl
                ? "bg-studio-accent text-black cursor-pointer accent-glow"
                : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
            }`}
          >
            <span>{t.step2.btnNext}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
