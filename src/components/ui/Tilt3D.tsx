"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
  scale?: number;
  maxTilt?: number;
  speed?: number;
  axis?: "both" | "x" | "y";
  glare?: boolean;
  glareColor?: string;
  glareOpacity?: number;
  shadow?: boolean;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowBlur?: number;
  shadowOffset?: { x: number; y: number };
  borderRadius?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function Tilt3D({
  children,
  className = "",
  intensity = 1,
  perspective = 1000,
  scale = 1.02,
  maxTilt = 15,
  speed = 0.3,
  axis = "both",
  glare = false,
  glareColor = "#ffffff",
  glareOpacity = 0.1,
  shadow = true,
  shadowColor = "#000000",
  shadowOpacity = 0.2,
  shadowBlur = 20,
  shadowOffset = { x: 0, y: 10 },
  borderRadius = "0.75rem",
  onMouseEnter,
  onMouseLeave,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-1, 1], axis === "x" || axis === "both" ? [maxTilt, -maxTilt] : [0, 0]);
  const rotateY = useTransform(mouseX, [-1, 1], axis === "y" || axis === "both" ? [-maxTilt, maxTilt] : [0, 0]);
  
  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 30 });
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (event.clientX - centerX) / (rect.width / 2);
    const distanceY = (event.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(distanceX * intensity);
    mouseY.set(distanceY * intensity);
  };
  
  const handleMouseEnter = () => {
    scaleSpring.set(scale);
    onMouseEnter?.();
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scaleSpring.set(1);
    onMouseLeave?.();
  };

  const shadowStyle = shadow ? {
    boxShadow: `${shadowOffset.x}px ${shadowOffset.y}px ${shadowBlur}px ${shadowOpacity}px ${shadowColor}`,
  } : {};

  const glareStyle = glare ? {
    background: `linear-gradient(135deg, transparent 30%, ${glareColor}${Math.floor(glareOpacity * 255).toString(16).padStart(2, '0')} 50%, transparent 70%)`,
  } : {};

  return (
    <div
      ref={ref}
      className={className}
      style={{ 
        perspective: `${perspective}px`,
        borderRadius,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          scale: scaleSpring,
          transformStyle: "preserve-3d",
          borderRadius,
          ...shadowStyle,
        }}
        transition={{ duration: speed }}
      >
        <div className="relative" style={{ borderRadius }}>
          {children}
          {glare && (
            <div
              className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                borderRadius,
                ...glareStyle,
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

