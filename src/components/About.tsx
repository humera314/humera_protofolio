"use client";

import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const About = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ----- 3D camera tilt based on mouse -----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // [-0.5, 0.5]
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  // ----- parallax on scroll (subtle) -----
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxYBack = useTransform(scrollYProgress, [0, 1], [0, 60]);      // far background
  const parallaxYMid  = useTransform(scrollYProgress, [0, 1], [0, 30]);      // mid
  const parallaxYFront= useTransform(scrollYProgress, [0, 1], [0, 10]);      // foreground (ship)

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-black text-white"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      {/* Scene container with perspective */}
      <div
        className="relative mx-auto max-w-6xl px-4"
        style={{
          perspective: 1000,
        }}
      >
        <motion.div
          className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-[0_0_60px_rgba(0,0,0,0.35)]"
          style={{
            transformStyle: "preserve-3d",
            rotateX: rotX,
            rotateY: rotY,
          }}
        >
          {/* BACKGROUND LAYERS (deep space) */}
          {/* Nebula sheet (far) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              translateZ: "-300px", // far
              y: parallaxYBack,
              filter: "blur(8px)",
              transformStyle: "preserve-3d",
              background:
                "radial-gradient(1200px 600px at 20% 30%, rgba(64,112,255,0.25), transparent 60%), radial-gradient(900px 700px at 80% 10%, rgba(214,85,255,0.18), transparent 55%), radial-gradient(1000px 800px at 60% 70%, rgba(255,105,180,0.12), transparent 60%)",
            }}
          />

          {/* Star dust (mid) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              translateZ: "-150px",
              y: parallaxYMid,
              backgroundImage:
                "radial-gradient(2px 2px at 10% 20%, rgba(255,255,255,0.7) 50%, transparent 60%), radial-gradient(1.5px 1.5px at 60% 30%, rgba(255,255,255,0.5) 50%, transparent 60%), radial-gradient(1.5px 1.5px at 80% 70%, rgba(255,255,255,0.4) 50%, transparent 60%), radial-gradient(2px 2px at 30% 80%, rgba(255,255,255,0.6) 50%, transparent 60%)",
              filter: "blur(0.5px)",
              opacity: 0.7,
            }}
          />

          {/* Glow vignette */}
          <div className="pointer-events-none absolute inset-0 mix-blend-screen"
               style={{ background: "radial-gradient(80% 60% at 50% 40%, rgba(255,255,255,0.08), transparent 70%)" }} />

          {/* FOREGROUND: floating spaceship */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              top: "6%",
              right: "6%",
              translateZ: "180px", // closer to camera
              y: parallaxYFront,
            }}
            initial={{ opacity: 0, y: -12, rotate: -4, scale: 0.94 }}
            animate={
              isInView
                ? { opacity: 0.9, y: [-12, 8, -12], x: [0, -8, 0], rotate: [-4, 3, -4] }
                : { opacity: 0, y: -12 }
            }
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          >
            <div
              className="absolute -inset-8 blur-3xl opacity-40 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(120,200,255,0.25), rgba(0,0,0,0))",
              }}
            />
            <img
              src="/spaceship.png"
              alt=""
              width={200}
              height={200}
              draggable={false}
              className="relative drop-shadow-[0_10px_30px_rgba(160,200,255,0.45)]"
              style={{ transform: "translateZ(10px)" }}
            />
          </motion.div>

          {/* CONTENT */}
          <div className="relative z-10 px-6 md:px-14 pt-20 pb-24">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-10"
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              style={{ transform: "translateZ(60px)" }}
            >
              About Me
            </motion.h2>

            <motion.p
              className="max-w-3xl text-lg md:text-xl leading-relaxed text-white/90"
              initial={{ opacity: 0, y: 30, rotateX: -6 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transform: "translateZ(50px)" }}
            >
              Experienced Software Engineer with 3+ years building modern enterprise apps using
              JavaScript, TypeScript, React, Angular, Vue, Node.js, NestJS &amp; Java. Skilled in
              UI/UX, responsive design, microservices, databases, AWS, Docker, Kubernetes &amp; CI/CD.
              Collaborative team player passionate about high-quality, scalable systems.
            </motion.p>

            {/* Floating tech chips in Z-layers */}
            <div className="mt-16 relative h-40">
              {[
                { label: "React", z: 140, x: "12%", y: 10, delay: 0.0 },
                { label: "TypeScript", z: 90, x: "32%", y: 30, delay: 0.15 },
                { label: "AWS", z: 40, x: "58%", y: 20, delay: 0.3 },
                { label: "Node.js", z: 110, x: "76%", y: 35, delay: 0.45 },
              ].map(({ label, z, x, y, delay }) => (
                <motion.div
                  key={label}
                  className="absolute bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                  style={{
                    left: x,
                    top: y,
                    translateZ: `${z}px`,
                    transformStyle: "preserve-3d",
                    filter: z < 60 ? "blur(0.6px)" : "none", // far = slightly blurred
                  }}
                  initial={{ opacity: 0, scale: 0.85, y: 10, rotateX: -6 }}
                  whileInView={{ opacity: 1, scale: 1, y: [10, -10, 10], rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 4.5, repeat: Infinity, delay, ease: "easeInOut" }}
                  whileHover={{
                    scale: 1.06,
                    rotateX: -4,
                    rotateY: 6,
                    translateZ: z + 12,
                    transition: { type: "spring", stiffness: 250, damping: 20 },
                  }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Base shadow to anchor the 3D card into the page */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[70%] h-24 blur-2xl"
            style={{ background: "radial-gradient(50% 70% at 50% 50%, rgba(0,0,0,0.6), transparent 70%)" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
