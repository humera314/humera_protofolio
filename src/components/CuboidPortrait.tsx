"use client";

import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

type CuboidPortraitProps = {
  front: string;
  back?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  size?: number;              // cube width/height
  depth?: number;             // cube depth
  gap?: number;               // spacing for frame
  frameOpacity?: number;      // 0–1 opacity for frame
  rotateDurationSec?: number; // how long one full spin takes
  resumeDelayMs?: number;     // delay before resuming after hover
};

export default function CuboidPortrait({
  front,
  back,
  left,
  right,
  top,
  bottom,
  size = 240,
  depth = 240,
  gap = 10,
  frameOpacity = 0.15,
  rotateDurationSec = 24,
  resumeDelayMs = 0,
}: CuboidPortraitProps) {
  const half = depth / 2;

  // Drive rotation via motion value (so we can read current value and continue cleanly)
  const ry = useMotionValue(0);
  const spinRef = useRef<ReturnType<typeof animate> | null>(null);
  const resumeTimer = useRef<number | null>(null);

  // Helper: start an infinite spin from the CURRENT angle
  const startSpin = () => {
    // Always stop any previous animation first
    spinRef.current?.stop();

    // distance for one full rotation from current angle
    const from = ry.get();
    const to = from + 360;

    spinRef.current = animate(ry, to, {
      duration: rotateDurationSec,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      // Repeat by +360 each time to avoid snapping back
      onRepeat: () => {
        const cur = ry.get();
        // normalize a bit to prevent float growth (optional)
        if (cur > 1e6) ry.set(cur % 360);
        // advance the target another 360
        spinRef.current?.stop();
        spinRef.current = animate(ry, ry.get() + 360, {
          duration: rotateDurationSec,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        });
      },
    });
  };

  // Helper: stop the spin immediately
  const stopSpin = () => {
    spinRef.current?.stop();
    spinRef.current = null;
    // clear any pending resume timer
    if (resumeTimer.current) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  // Kick off initial spin on mount
  useEffect(() => {
    startSpin();
    return () => {
      stopSpin();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotateDurationSec]);

  // Hover handlers: pause on enter, resume after delay on leave
  const handleMouseEnter = () => {
    stopSpin();
  };

  const handleMouseLeave = () => {
    if (resumeDelayMs > 0) {
      resumeTimer.current = window.setTimeout(() => {
        startSpin();
      }, resumeDelayMs) as unknown as number;
    } else {
      startSpin();
    }
  };

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    backfaceVisibility: "hidden",
    borderRadius: 16,
  };

  const innerWH = size - gap * 2;
  const imgClass = "w-full h-full object-cover rounded-[12px]";

  return (
    <div className="relative inline-block" style={{ perspective: 1000 }}>
      {/* Glass frame (pointer-events none so it doesn't block hover) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px]"
        style={{
          width: size,
          height: size,
          border: `1px solid rgba(255,255,255,${frameOpacity})`,
          boxShadow: `inset 0 0 40px rgba(255,255,255,${frameOpacity * 0.4})`,
        }}
      />

      <motion.div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          rotateY: ry, // bind rotation to motion value
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* FRONT */}
        <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }}>
          <div
            className="absolute"
            style={{ width: innerWH, height: innerWH, left: gap, top: gap }}
          >
            <img src={front} alt="front" className={imgClass} />
          </div>
        </div>

        {/* BACK */}
        {back && (
          <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }}>
            <div className="absolute" style={{ width: innerWH, height: innerWH, left: gap, top: gap }}>
              <img src={back} alt="back" className={imgClass} />
            </div>
          </div>
        )}

        {/* RIGHT */}
        {right && (
          <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }}>
            <div className="absolute" style={{ width: innerWH, height: innerWH, left: gap, top: gap }}>
              <img src={right} alt="right" className={imgClass} />
            </div>
          </div>
        )}

        {/* LEFT */}
        {left && (
          <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }}>
            <div className="absolute" style={{ width: innerWH, height: innerWH, left: gap, top: gap }}>
              <img src={left} alt="left" className={imgClass} />
            </div>
          </div>
        )}

        {/* TOP */}
        {top && (
          <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }}>
            <div className="absolute" style={{ width: innerWH, height: innerWH, left: gap, top: gap }}>
              <img src={top} alt="top" className={imgClass} />
            </div>
          </div>
        )}

        {/* BOTTOM */}
        {bottom && (
          <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }}>
            <div className="absolute" style={{ width: innerWH, height: innerWH, left: gap, top: gap }}>
              <img src={bottom} alt="bottom" className={imgClass} />
            </div>
          </div>
        )}
      </motion.div>

      {/* Base shadow */}
      <div
        aria-hidden
        className="mx-auto"
        style={{
          width: size * 0.8,
          height: 28,
          marginTop: 14,
          filter: "blur(16px)",
          background: "radial-gradient(60% 70% at 50% 50%, rgba(0,0,0,0.7), transparent 70%)",
        }}
      />
    </div>
  );
}
