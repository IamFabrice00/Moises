"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Decal,
  ContactShadows,
  Environment,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import * as THREE from "three";
import { useDesignStore } from "@/lib/store/designStore";

// Type definitions for useGLTF result
type GLTFResult = {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

// 3D Shirt Mesh Component
function ShirtMesh() {
  const { tshirtColor, logoDataUrl, logoPosition, logoScale, logoRotation } = useDesignStore();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [aspectRatio, setAspectRatio] = useState(1);

  // Load GLTF model
  const { nodes } = useGLTF("/shirt.glb") as unknown as GLTFResult;

  // Dynamically find the primary mesh inside the GLTF nodes
  const shirtMesh = React.useMemo(() => {
    const meshKey = Object.keys(nodes).find((key) => nodes[key].type === "Mesh");
    return meshKey ? (nodes[meshKey] as THREE.Mesh) : null;
  }, [nodes]);

  // Load custom logo base64 texture and compute its aspect ratio
  useEffect(() => {
    if (logoDataUrl) {
      const loader = new THREE.TextureLoader();
      loader.load(
        logoDataUrl,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          // Trigger rendering update
          tex.needsUpdate = true;
          
          const img = tex.image;
          if (img) {
            const width = img.width || 100;
            const height = img.height || 100;
            setAspectRatio(height / width);
          }
          setTexture(tex);
        },
        undefined,
        (err) => {
          console.error("Error loading logo texture:", err);
          setTexture(null);
        }
      );
    } else {
      setTexture(null);
      setAspectRatio(1);
    }
  }, [logoDataUrl]);

  if (!shirtMesh) {
    return null;
  }

  // Map 2D pixel coordinates to 3D space:
  // - 2D print area center matches 3D [0, 0.04, 0.15]
  // - X axis maps directly (x / 550)
  // - Y axis is inverted in 3D (-y / 550)
  const decalX = logoPosition.x / 550;
  const decalY = -logoPosition.y / 550 + 0.04;
  const decalZ = 0.15; // Placed slightly in front of the shirt surface

  // Map logo scale (20 to 100) to 3D unit scale
  // Standard scale factor of 0.15 is ideal for a 50% slider value
  const baseScale = (logoScale / 100) * 0.3;
  const decalScale: [number, number, number] = [
    baseScale,
    baseScale * aspectRatio,
    0.3, // Depth must be deep enough to project through the surface mesh
  ];

  // Map logo rotation (degrees) to radians around the projection axis (Z)
  const decalRotation: [number, number, number] = [
    0,
    0,
    (logoRotation * Math.PI) / 180,
  ];

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={shirtMesh.geometry}
      dispose={null}
      scale={1}
    >
      {/* Premium Studio Fabric Material */}
      <meshStandardMaterial
        color={tshirtColor}
        roughness={0.8} // Satin-matte fabric texture
        metalness={0.15} // Low metalness for typical cotton fibers
        bumpScale={0.005}
      />
      {texture && (
        <Decal
          position={[decalX, decalY, decalZ]}
          rotation={decalRotation}
          scale={decalScale}
          map={texture}
        />
      )}
    </mesh>
  );
}

// 3D Scene Assembly
export default function TshirtCanvas3D() {
  const { currentStep } = useDesignStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-load the GLTF file to avoid popping during step changes
  useEffect(() => {
    useGLTF.preload("/shirt.glb");
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] flex items-center justify-center select-none">
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [0, 0, 2.5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        className="w-full h-full max-h-[450px] lg:max-h-[500px]"
      >
        {/* Ambient base lighting */}
        <ambientLight intensity={0.5} />

        {/* Ambient environment preset for metallic and satin reflections */}
        <Environment preset="city" />

        {/* Dynamic Studio Key Lighting */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.85}
          castShadow
          shadow-mapSize={1024}
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.3}
        />
        <pointLight position={[0, -2, 2]} intensity={0.3} />

        <Suspense fallback={null}>
          <group position={[0, -0.4, 0]}>
            <ShirtMesh />
            
            {/* Ambient Occlusion Soft Contact Ground Shadows */}
            <ContactShadows
              position={[0, -0.4, 0]}
              opacity={0.6}
              scale={2.2}
              blur={2.4}
              far={0.8}
            />
          </group>
        </Suspense>

        {/* Interactive camera rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.6}
          enableDamping
          dampingFactor={0.05}
        />

        {/* Performance adaptation */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
