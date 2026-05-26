"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDesignStore } from "@/lib/store/designStore";
import { drawTshirt, setupRetinaCanvas, PRINT_AREA } from "@/lib/canvas/tshirtCompositor";
import { motion } from "framer-motion";

export default function TshirtCanvas() {
  const {
    tshirtColor,
    logoDataUrl,
    logoPosition,
    logoScale,
    logoRotation,
    currentStep,
    setLogoPosition,
  } = useDesignStore();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const displayWidth = 500;
  const displayHeight = 600;

  // Load logo image in memory when base64 URL changes
  useEffect(() => {
    if (logoDataUrl) {
      const img = new Image();
      img.src = logoDataUrl;
      img.onload = () => {
        setLogoImg(img);
      };
    } else {
      setLogoImg(null);
    }
  }, [logoDataUrl]);

  // Frame rendering trigger
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Retina sizing context
    const ctx = setupRetinaCanvas(canvas, displayWidth, displayHeight);

    // Call dynamic draw engine
    drawTshirt(ctx, tshirtColor, logoImg, logoPosition, logoScale, logoRotation, {
      showPrintArea: currentStep === 3,
      isDragging,
      width: displayWidth,
      height: displayHeight,
    });
  }, [tshirtColor, logoImg, logoPosition, logoScale, logoRotation, currentStep, isDragging]);

  // Get localized cursor coords inside the 500x600 reference space
  const getCanvasCoords = (clientX: number, clientY: number): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    // Translate real screen coordinates into 500x600 virtual units
    const x = (clientX - rect.left) * (displayWidth / rect.width);
    const y = (clientY - rect.top) * (displayHeight / rect.height);
    return { x, y };
  };

  // Check if click coordinates hit the logo's active transform boundaries
  const isLogoHit = (canvasX: number, canvasY: number): boolean => {
    if (!logoImg) return false;

    // References to absolute center & active offset coordinates
    const centerX = PRINT_AREA.x + PRINT_AREA.width / 2; // 250
    const centerY = PRINT_AREA.y + PRINT_AREA.height / 2; // 280
    const logoX = centerX + logoPosition.x;
    const logoY = centerY + logoPosition.y;

    // Dimensions derived from size percentage slider
    const targetWidth = PRINT_AREA.width * (logoScale / 100);
    const aspect = logoImg.height / logoImg.width;
    const targetHeight = targetWidth * aspect;

    // Test box coverage hit (inclusive boundary checks)
    return (
      canvasX >= logoX - targetWidth / 2 &&
      canvasX <= logoX + targetWidth / 2 &&
      canvasY >= logoY - targetHeight / 2 &&
      canvasY <= logoY + targetHeight / 2
    );
  };

  // Drag Gesture Listeners
  const handleStart = (clientX: number, clientY: number) => {
    if (currentStep !== 3 || !logoImg) return;

    const coords = getCanvasCoords(clientX, clientY);
    if (!coords) return;

    if (isLogoHit(coords.x, coords.y)) {
      setIsDragging(true);
      // Store current cursor offset relative to the logo's center position
      const centerX = PRINT_AREA.x + PRINT_AREA.width / 2;
      const centerY = PRINT_AREA.y + PRINT_AREA.height / 2;
      const logoX = centerX + logoPosition.x;
      const logoY = centerY + logoPosition.y;

      dragOffsetRef.current = {
        x: coords.x - logoX,
        y: coords.y - logoY,
      };
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || currentStep !== 3 || !logoImg) return;

    const coords = getCanvasCoords(clientX, clientY);
    if (!coords) return;

    // Target logo center in canvas space
    const targetLogoX = coords.x - dragOffsetRef.current.x;
    const targetLogoY = coords.y - dragOffsetRef.current.y;

    const centerX = PRINT_AREA.x + PRINT_AREA.width / 2;
    const centerY = PRINT_AREA.y + PRINT_AREA.height / 2;

    // Convert back to relative offsets
    let relativeX = targetLogoX - centerX;
    let relativeY = targetLogoY - centerY;

    // Apply strict printable boundary constraints
    const targetWidth = PRINT_AREA.width * (logoScale / 100);
    const aspect = logoImg.height / logoImg.width;
    const targetHeight = targetWidth * aspect;

    const halfW = targetWidth / 2;
    const halfH = targetHeight / 2;

    // Clamp coordinates relative to boundaries
    const minX = PRINT_AREA.x + halfW - centerX;
    const maxX = PRINT_AREA.x + PRINT_AREA.width - halfW - centerX;
    const minY = PRINT_AREA.y + halfH - centerY;
    const maxY = PRINT_AREA.y + PRINT_AREA.height - halfH - centerY;

    relativeX = Math.max(minX, Math.min(maxX, relativeX));
    relativeY = Math.max(minY, Math.min(maxY, relativeY));

    // Horizontal snapping guide: snaps exactly to center when within 5 pixels
    if (Math.abs(relativeX) < 5) {
      relativeX = 0;
    }

    setLogoPosition({ x: relativeX, y: relativeY });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse bindings
  const onMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  // Touch bindings
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Safe window-wide release handler
  useEffect(() => {
    const handleGlobalRelease = () => {
      if (isDragging) handleEnd();
    };
    window.addEventListener("mouseup", handleGlobalRelease);
    return () => {
      window.removeEventListener("mouseup", handleGlobalRelease);
    };
  }, [isDragging]);

  // Entrance zoom-in animation at Step 4
  const isFinalPreview = currentStep === 4;

  return (
    <motion.div
      animate={{
        scale: isFinalPreview ? [0.95, 1] : 1,
        opacity: [0.9, 1],
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative flex items-center justify-center bg-studio-card/30 border border-studio-border rounded-2xl p-6 overflow-hidden h-[450px] lg:h-[600px] w-full"
    >
      {/* Grid Blueprint Texture Background (only visible when compositing) */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.015)_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none transition-opacity duration-500 ${
          currentStep === 3 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Floating Blueprint Label */}
      {currentStep === 3 && (
        <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-studio-accent/5 border border-studio-accent/20 text-studio-accent text-[10px] font-mono tracking-widest uppercase py-1 px-2.5 rounded-md select-none pointer-events-none">
          <span>Composer Active</span>
        </div>
      )}

      {/* Primary interactive Canvas tag */}
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleEnd}
        className={`max-w-full max-h-[360px] lg:max-h-[500px] aspect-[5/6] select-none touch-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] ${
          currentStep === 3 && logoImg ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      />
    </motion.div>
  );
}
