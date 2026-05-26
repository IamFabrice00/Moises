"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDesignStore } from "@/lib/store/designStore";
import { translations } from "@/lib/i18n/translations";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, MoveHorizontal, Play, Pause } from "lucide-react";

export default function StudioShowcase() {
  const { locale } = useDesignStore();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const dragStartRef = useRef<{ x: number; frame: number }>({ x: 0, frame: 0 });
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalFrames = 192;
  const frameDelay = 41; // 0.041s * 1000ms

  // Preload all 192 frames to ensure smooth scrubbing
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const formatNumber = (num: number) => String(num).padStart(3, "0");

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/magliette/frame_${formatNumber(i)}_delay-0.041s.jpg`;
      img.onload = () => {
        loadedCount++;
        setPreloadProgress(Math.floor((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsPreloaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsPreloaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, []);

  // Auto-rotation player loop
  useEffect(() => {
    if (isPlaying && isPreloaded && !isDragging) {
      playIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, frameDelay);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, isPreloaded, isDragging]);

  // Drag Gesture Handlers (Mouse & Touch)
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setIsPlaying(false);
    dragStartRef.current = { x: clientX, frame: currentFrame };
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartRef.current.x;
    const sensitivity = 4;
    const frameShift = Math.floor(deltaX / sensitivity);
    
    let nextFrame = (dragStartRef.current.frame - frameShift) % totalFrames;
    if (nextFrame < 0) nextFrame += totalFrames;

    setCurrentFrame(nextFrame);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) handleDragEnd();
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  const padIndex = (num: number) => String(num).padStart(3, "0");
  const rotationAngle = Math.round((currentFrame / totalFrames) * 360);

  const t = translations[locale];

  return (
    <div className="relative flex flex-col items-center justify-center bg-studio-card/30 border border-studio-border rounded-2xl p-6 overflow-hidden h-[450px] lg:h-[600px] w-full group select-none">
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isPreloaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-studio-bg"
          >
            <div className="w-16 h-16 border-2 border-studio-border border-t-studio-accent rounded-full animate-spin mb-4" />
            <span className="font-display text-sm font-semibold tracking-widest text-white/90">
              ATELIER SHOWROOM
            </span>
            <span className="font-sans text-xs text-studio-text-secondary mt-1.5">
              {locale === "it"
                ? `Caricamento modello 3D: ${preloadProgress}%`
                : locale === "en"
                ? `Loading 3D Model: ${preloadProgress}%`
                : `Cargando modelo 3D: ${preloadProgress}%`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-studio-accent/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Flagship Couture Title */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-studio-accent animate-pulse" />
          <span className="font-display text-xs font-bold tracking-widest text-studio-accent uppercase">
            {t.showroom.badge}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-white mt-1 uppercase tracking-wider">
          {t.showroom.title}
        </h3>
        <p className="font-sans text-xs text-studio-text-secondary mt-0.5">
          {t.showroom.desc}
        </p>
      </div>

      {/* Interactive Frame Viewer Container */}
      <div
        className={`relative flex items-center justify-center w-full h-full cursor-grab active:cursor-grabbing ${
          isDragging ? "scale-[0.98]" : "scale-100"
        } transition-transform duration-300`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleDragEnd}
      >
        {isPreloaded && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/magliette/frame_${padIndex(currentFrame)}_delay-0.041s.jpg`}
            alt="Atelier T-shirt Showroom 3D"
            className="max-h-[340px] lg:max-h-[480px] w-auto object-contain pointer-events-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-xl"
          />
        )}
      </div>

      {/* HUD Info Panel (Bottom overlay) */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-studio-border/60 hover:bg-studio-border border border-white/5 text-white transition-colors duration-200"
            title={isPlaying ? "Pausa" : "Riproduci"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-studio-accent" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          <div className="flex flex-col">
            <span className="font-sans text-[10px] tracking-wider text-studio-text-secondary uppercase">
              {t.showroom.angle}
            </span>
            <span className="font-display text-sm font-bold text-white/90">
              {rotationAngle}°
            </span>
          </div>
        </div>

        {/* Drag Hint indicator */}
        <div className="flex items-center gap-2 bg-studio-border/40 backdrop-blur-sm border border-white/5 py-1.5 px-3 rounded-full text-white/50 text-[11px]">
          <MoveHorizontal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline font-sans">{t.showroom.hint}</span>
        </div>
      </div>
    </div>
  );
}
