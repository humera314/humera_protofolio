"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-20 bg-black relative overflow-hidden"
      ref={ref}
    >
      {/* Floating Spaceship (background, non-interactive) */}
      <motion.div
        aria-hidden
        className="pointer-events-none select-none absolute z-0"
        // position it near the top-right; tweak as you like
        style={{ top: "8%", right: "6%" }}
        initial={{ opacity: 0, y: -10, rotate: -5, scale: 0.9 }}
        animate={
          isInView
            ? {
                opacity: 0.9,
                y: [-10, 10, -10],
                x: [0, -6, 0],
                rotate: [-5, 3, -5],
              }
            : { opacity: 0, y: -10 }
        }
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {/* soft glow behind the ship */}
        <div
          className="absolute -inset-6 blur-2xl opacity-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.25), rgba(0,0,0,0))",
          }}
        />
        <img
          src="/spaceship.png"
          alt=""
          width={180}
          height={180}
          draggable={false}
          className="relative drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]"
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">
            About Me
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl leading-relaxed text-white">
              Experienced Software Engineer with 3+ years building modern
              enterprise apps using JavaScript, TypeScript, React, Angular, Vue,
              Node.js, NestJS &amp; Java. Skilled in UI/UX, responsive design,
              microservices, databases, AWS, Docker, Kubernetes &amp; CI/CD.
              Collaborative team player passionate about high-quality, scalable
              systems.
            </p>
          </motion.div>

          {/* Floating tech chips */}
          <div className="mt-16 relative">
            {["React", "TypeScript", "AWS", "Node.js"].map((tech, index) => (
              <motion.div
                key={tech}
                className="absolute bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${Math.random() * 100}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
