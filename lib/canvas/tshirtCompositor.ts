export interface CompositorOptions {
  showPrintArea?: boolean;
  isDragging?: boolean;
  width: number;
  height: number;
}

// Chest safe printing boundaries (relative to canvas 500x600)
export const PRINT_AREA = {
  x: 160,
  y: 160,
  width: 180,
  height: 240,
};

/**
 * Main draw function for the customizer canvas.
 * Draws:
 * 1. Silhouette background fill with fabric base color
 * 2. Crewneck collar band & stitches
 * 3. 3D Volume shading & fabric folds (using linear & radial gradients)
 * 4. Printable chest boundary guide (if active)
 * 5. Logo overlay (with translation, scale, rotation, clipping, and fabric blending)
 */
export function drawTshirt(
  ctx: CanvasRenderingContext2D,
  color: string,
  logoImg: HTMLImageElement | null,
  logoPos: { x: number; y: number },
  logoScale: number, // 20 to 100
  logoRotation: number, // -30 to 30 degrees
  options: CompositorOptions
) {
  const { width, height, showPrintArea, isDragging } = options;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Setup scale factors in case canvas is not exactly 500x600
  const scaleX = width / 500;
  const scaleY = height / 600;

  ctx.save();
  ctx.scale(scaleX, scaleY);

  // Draw Main T-shirt Silhouette path
  const defineTshirtPath = (c: CanvasRenderingContext2D) => {
    c.beginPath();
    // Neck collar left
    c.moveTo(180, 85);
    // Neck collar curve (front collar drop)
    c.quadraticCurveTo(250, 115, 320, 85);
    // Right shoulder
    c.lineTo(410, 115);
    // Right sleeve outer seam
    c.lineTo(455, 195);
    // Right sleeve opening
    c.lineTo(395, 225);
    // Right sleeve inner underarm
    c.lineTo(365, 195);
    // Right side body (smooth curve to waist/hem)
    c.quadraticCurveTo(358, 350, 362, 515);
    // Bottom hem curve
    c.quadraticCurveTo(250, 525, 138, 515);
    // Left side body
    c.quadraticCurveTo(142, 350, 135, 195);
    // Left sleeve inner underarm
    c.lineTo(105, 225);
    // Left sleeve opening
    c.lineTo(45, 195);
    // Left shoulder
    c.lineTo(138, 115);
    c.closePath();
  };

  // 1. BASE FABRIC FILL
  defineTshirtPath(ctx);
  ctx.fillStyle = color;
  ctx.fill();

  // 2. CREWNECK COLLAR BAND
  // Outer neck curve
  ctx.save();
  ctx.lineWidth = 8;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
  ctx.beginPath();
  ctx.moveTo(180, 85);
  ctx.quadraticCurveTo(250, 115, 320, 85);
  ctx.stroke();

  // Collar inside shadow/back neck tape
  ctx.beginPath();
  ctx.moveTo(180, 85);
  ctx.quadraticCurveTo(250, 68, 320, 85);
  ctx.quadraticCurveTo(250, 105, 180, 85);
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fill();
  ctx.restore();

  // 3. 3D SHADING OVERLAYS & FABRIC FOLDS
  // Layer A: Ambient linear gradient (left-to-right studio light source)
  ctx.save();
  defineTshirtPath(ctx);
  ctx.clip();
  const lightGrad = ctx.createLinearGradient(50, 300, 450, 300);
  lightGrad.addColorStop(0, "rgba(255, 255, 255, 0.15)"); // Left side highlight
  lightGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.05)");
  lightGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.1)");
  lightGrad.addColorStop(1, "rgba(0, 0, 0, 0.3)"); // Right side shadow
  ctx.fillStyle = lightGrad;
  ctx.fill();

  // Layer B: Subtle fabric wrinkles/creases (simulate volume & drop shadows)
  // Underarm left wrinkle
  const foldsGradL = ctx.createRadialGradient(100, 230, 10, 100, 230, 120);
  foldsGradL.addColorStop(0, "rgba(0, 0, 0, 0.25)");
  foldsGradL.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = foldsGradL;
  ctx.fill();

  // Underarm right wrinkle
  const foldsGradR = ctx.createRadialGradient(400, 230, 10, 400, 230, 120);
  foldsGradR.addColorStop(0, "rgba(0, 0, 0, 0.25)");
  foldsGradR.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = foldsGradR;
  ctx.fill();

  // Soft vertical center folds (belly and waist volume)
  const centerShadow = ctx.createLinearGradient(130, 0, 370, 0);
  centerShadow.addColorStop(0, "rgba(0, 0, 0, 0)");
  centerShadow.addColorStop(0.25, "rgba(0, 0, 0, 0.05)");
  centerShadow.addColorStop(0.35, "rgba(255, 255, 255, 0.08)"); // Subtle vertical fold highlight
  centerShadow.addColorStop(0.45, "rgba(0, 0, 0, 0.08)"); // Soft vertical fold crease
  centerShadow.addColorStop(0.55, "rgba(255, 255, 255, 0.05)");
  centerShadow.addColorStop(0.7, "rgba(0, 0, 0, 0.08)");
  centerShadow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = centerShadow;
  ctx.fill();

  // Bottom hem edge shadow
  const bottomShadow = ctx.createLinearGradient(250, 480, 250, 525);
  bottomShadow.addColorStop(0, "rgba(0, 0, 0, 0)");
  bottomShadow.addColorStop(1, "rgba(0, 0, 0, 0.25)");
  ctx.fillStyle = bottomShadow;
  ctx.fill();
  ctx.restore();

  // 4. PRINT AREA GUIDELINE
  if (showPrintArea) {
    ctx.save();
    ctx.strokeStyle = isDragging ? "#E8FF47" : "rgba(232, 255, 71, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(PRINT_AREA.x, PRINT_AREA.y, PRINT_AREA.width, PRINT_AREA.height);

    // Dynamic snapping center guideline (shows if aligned/dragged close to center)
    const isCloseToCenter = Math.abs(logoPos.x) < 5;
    if (isDragging && isCloseToCenter) {
      ctx.strokeStyle = "#E8FF47";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      // Draw vertical snap axis
      ctx.moveTo(250, PRINT_AREA.y);
      ctx.lineTo(250, PRINT_AREA.y + PRINT_AREA.height);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 5. LOGO RENDERING & FABRIC COMPOSITING
  if (logoImg) {
    ctx.save();

    // Clip to Print Area (strict constraint)
    ctx.beginPath();
    ctx.rect(PRINT_AREA.x, PRINT_AREA.y, PRINT_AREA.width, PRINT_AREA.height);
    ctx.clip();

    // Center coordinate of the chest print area is the reference (250, 280)
    const centerX = PRINT_AREA.x + PRINT_AREA.width / 2; // 250
    const centerY = PRINT_AREA.y + PRINT_AREA.height / 2; // 280

    // Set origin to the active logo position
    ctx.translate(centerX + logoPos.x, centerY + logoPos.y);

    // Apply rotation
    ctx.rotate((logoRotation * Math.PI) / 180);

    // Calculate dimensions based on the slider scale factor
    // Logo width matches the percentage of the print area width (180px)
    const targetWidth = PRINT_AREA.width * (logoScale / 100);
    const scaleFactor = targetWidth / logoImg.width;
    const targetHeight = logoImg.height * scaleFactor;

    // Draw the Logo image centered on the local origin
    ctx.drawImage(logoImg, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);

    // FABRIC INTERLOCK SHADING OVER MOUNTED LOGO
    // This replicates photoshop mockups by drawing a shading mask over the logo
    // using "multiply" blend mode so folds dynamically texture the logo itself.
    ctx.globalCompositeOperation = "multiply";

    // Setup absolute shading gradient matching the canvas layout space
    // and draw it restricted to the logo's bounding box
    const logoLeft = -targetWidth / 2;
    const logoTop = -targetHeight / 2;

    const overlayLinear = ctx.createLinearGradient(logoLeft, 0, targetWidth / 2, 0);
    // Draw a replica highlight/shadow gradient matching the background lighting angle
    overlayLinear.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    overlayLinear.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
    overlayLinear.addColorStop(0.8, "rgba(235, 235, 235, 1.0)");
    overlayLinear.addColorStop(1, "rgba(180, 180, 180, 1.0)"); // Soft dark multiplier
    ctx.fillStyle = overlayLinear;
    ctx.fillRect(logoLeft, logoTop, targetWidth, targetHeight);

    // Apply soft fold creasing multiplier on top of the logo
    const overlayRadial = ctx.createRadialGradient(
      0,
      0,
      targetWidth * 0.2,
      0,
      0,
      targetWidth * 0.8
    );
    overlayRadial.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    overlayRadial.addColorStop(1, "rgba(230, 230, 230, 0.9)");
    ctx.fillStyle = overlayRadial;
    ctx.fillRect(logoLeft, logoTop, targetWidth, targetHeight);

    ctx.restore();
  }

  // Restore main transformations
  ctx.restore();
}

/**
 * Handles high-DPI sizing adjustments for clear graphics on high resolution screens
 */
export function setupRetinaCanvas(
  canvas: HTMLCanvasElement,
  displayWidth: number,
  displayHeight: number
): CanvasRenderingContext2D {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;
  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;

  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  return ctx;
}

/**
 * Exports the canvas as a high-quality PNG.
 */
export function exportCanvas(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png", 1.0);
}
