import React, { useRef, useEffect } from "react";

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

const STAR_COUNT = 80;
const SHOOTING_STAR_COUNT = 3;

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const MilkyWayShootingStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const stars = useRef<{ x: number; y: number; r: number; opacity: number }[]>(
    []
  );
  const shootingStars = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate static stars
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: random(0, canvas.width),
      y: random(0, canvas.height * 0.7),
      r: random(0.5, 1.5),
      opacity: random(0.3, 1),
    }));

    // Shooting stars
    shootingStars.current = Array.from({ length: SHOOTING_STAR_COUNT }, () => ({
      x: random(0, canvas.width),
      y: random(0, canvas.height * 0.5),
      length: random(80, 160),
      speed: random(8, 14),
      angle: random(Math.PI / 6, Math.PI / 3),
      opacity: random(0.5, 1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw static stars
      for (const star of stars.current) {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
      // Draw shooting stars
      for (const s of shootingStars.current) {
        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.strokeStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 16;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        ctx.stroke();
        ctx.restore();
      }
    };

    const update = () => {
      for (const s of shootingStars.current) {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.008;
        if (
          s.x > canvas.width + 100 ||
          s.y > canvas.height + 100 ||
          s.opacity <= 0
        ) {
          // Reset shooting star
          s.x = random(-200, canvas.width * 0.7);
          s.y = random(0, canvas.height * 0.5);
          s.length = random(80, 160);
          s.speed = random(2, 4);
          s.angle = random(Math.PI / 6, Math.PI / 3);
          s.opacity = random(0.5, 1);
        }
      }
    };

    const animate = () => {
      update();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
};

export default MilkyWayShootingStars;
