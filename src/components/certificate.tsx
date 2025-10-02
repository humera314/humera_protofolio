"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Certificates = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mouse-driven camera tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const chips = [
    { label: "Databricks", left: "20%", topPx: 8 },
    { label: "Microsoft",  left: "35%", topPx: 28 },
    { label: "LinkedIn",   left: "50%", topPx: 16 },
    { label: "AWS",        left: "65%", topPx: 36 },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-black relative overflow-hidden"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4 relative z-10" style={{ perspective: 1000 }}>
        {/* SCENE (rotates with mouse) */}
        <motion.div
          className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
          style={{ transformStyle: "preserve-3d", rotateX: rotX, rotateY: rotY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Blue cloud background that fades out */}
          <motion.div
            aria-hidden
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: 14, times: [0, 0.15, 0.7, 1], ease: "easeInOut" }}
            style={{
              transform: "translateZ(-250px)",
              background:
                "radial-gradient(60% 50% at 25% 35%, rgba(70,130,255,0.22), rgba(0,0,0,0) 60%)," +
                "radial-gradient(50% 40% at 75% 25%, rgba(120,170,255,0.16), rgba(0,0,0,0) 60%)," +
                "radial-gradient(70% 55% at 55% 75%, rgba(40,100,220,0.12), rgba(0,0,0,0) 70%)",
              filter: "blur(22px)",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 z-0 pointer-events-none"
            animate={{ x: ["-1.5%", "1.5%", "-1.5%"], y: ["-1%", "1%", "-1%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            style={{
              transform: "translateZ(-200px)",
              mixBlendMode: "screen",
              opacity: 0.35,
              filter: "blur(18px)",
            }}
          />

          {/* Foreground badge/ship (wrapped to get translateZ without transformTemplate) */}
          <div
            className="pointer-events-none select-none absolute z-10"
            style={{ top: "8%", right: "6%", transform: "translateZ(120px)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10, rotate: -5, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 0.9, y: [-10, 10, -10], x: [0, -6, 0], rotate: [-5, 3, -5] }
                  : { opacity: 0, y: -10 }
              }
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              <div
                className="absolute -inset-6 blur-2xl opacity-35 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(170,210,255,0.28), rgba(0,0,0,0))" }}
              />
              <img
                src="/certify.png"
                alt=""
                width={180}
                height={180}
                draggable={false}
                className="relative drop-shadow-[0_6px_16px_rgba(170,210,255,0.35)]"
                style={{ transform: "translateZ(10px)" }}
              />
            </motion.div>
          </div>

          {/* Content (on its own Z layer) */}
          <div className="relative z-10 px-6 md:px-10 pt-16 pb-20" style={{ transform: "translateZ(60px)" }}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-white"
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              Certifications
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -6 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
              style={{ transform: "translateZ(50px)" }}
            >
              <a
                href="https://credentials.databricks.com/e4824f24-23b6-4e26-a8ca-eee8566f5010#acc.Sb7MY3Aw"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="/images/certification.png"
                  width={200}
                  height={300}
                  alt="Azure AI Engineer Certification Badge"
                  className="w-full h-48 object-contain p-4 cursor-pointer hover:scale-105 transition-transform duration-200"
                  draggable={false}
                />
              </a>
            </motion.div>

            {/* Floating tech chips with fixed positions + depth */}
            <div className="mt-16 relative h-40" style={{ transformStyle: "preserve-3d" }}>
              {chips.map((chip, index) => (
                <motion.div
                  key={chip.label}
                  className="absolute bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white backdrop-blur-[1px] shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
                  style={{
                    left: chip.left,
                    top: chip.topPx,
                    transform: `translateZ(${80 + index * 20}px)`,
                  }}
                  animate={{ y: [0, -16, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.06,
                    rotateX: -4,
                    rotateY: 6,
                    transition: { type: "spring", stiffness: 240, damping: 18 },
                  }}
                >
                  {chip.label}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Base shadow */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[72%] h-20 blur-2xl"
            style={{
              transform: "translateZ(-30px)",
              background: "radial-gradient(50% 70% at 50% 50%, rgba(0,0,0,0.65), transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
