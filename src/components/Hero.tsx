"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Download, Bot } from "lucide-react";
import { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";

import { Button } from "./ui/button";
import MilkyWayShootingStars from "./MilkyWayShootingStars";
import SpaceShip from "./Spaceship";
import CuboidPortrait from "./CuboidPortrait";

/* ---------- Unique, still 3D portrait ---------- */
function HoloPortrait({
  src,
  alt,
  size = 192, // avatar size
}: {
  src: string;
  alt?: string;
  size?: number;
}) {
  return (
    <div className="relative inline-block" style={{ perspective: 1000 }}>
      <motion.div
        className="relative rounded-full overflow-hidden border border-white/15 bg-white/5"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
        }}
        /* Gentle autonomous “orbit” to imply 3D (no mouse needed) */
        animate={{
          rotateX: [0, 6, 0, -6, 0],
          rotateY: [0, -8, 0, 8, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Far blue cloud that fades out (disappears) */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: 10, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
          style={{
            transform: "translateZ(-100px)",
            background:
              "radial-gradient(60% 50% at 40% 40%, rgba(90,150,255,0.22), rgba(0,0,0,0) 60%)," +
              "radial-gradient(55% 45% at 70% 30%, rgba(120,170,255,0.14), rgba(0,0,0,0) 60%)",
            filter: "blur(16px)",
            mixBlendMode: "screen",
          }}
          aria-hidden
        />

        {/* Depth layer (back) */}
        <div className="absolute inset-0 rounded-full" style={{ transform: "translateZ(-20px)" }}>
          <img src={src} alt={alt} className="w-full h-full object-cover opacity-65" />
        </div>

        {/* Main image (front) */}
        <div className="absolute inset-0 rounded-full" style={{ transform: "translateZ(0px)" }}>
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>

        {/* Soft inner vignette to add depth */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            transform: "translateZ(8px)",
            background:
              "radial-gradient(120% 120% at 50% 35%, rgba(255,255,255,0.06), rgba(0,0,0,0) 50%), " +
              "radial-gradient(100% 100% at 50% 80%, rgba(0,0,0,0.25), rgba(0,0,0,0) 60%)",
          }}
          aria-hidden
        />

        {/* Shine sweep */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.0, 0.5, 0.0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 4 }}
          style={{
            transform: "translateZ(10px)",
            background:
              "linear-gradient(70deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 60%)",
            maskImage:
              "radial-gradient(120% 120% at 10% 50%, black 35%, transparent 60%)",
            mixBlendMode: "screen",
          }}
          aria-hidden
        />

        {/* Subtle scanlines (hologram feel) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-30"
          style={{
            transform: "translateZ(6px)",
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(200,240,255,0.08) 0px, rgba(200,240,255,0.08) 1px, transparent 2px, transparent 4px)",
            mixBlendMode: "screen",
          }}
          aria-hidden
        />

        {/* Base shadow */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-[70%] h-8 blur-xl rounded-full"
          style={{
            transform: "translateZ(-30px)",
            background:
              "radial-gradient(50% 70% at 50% 50%, rgba(0,0,0,0.7), transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}
/* ---------- end HoloPortrait ---------- */

const Hero = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);

  // Initialize VAPI
  useEffect(() => {
    const vapiInstance = new Vapi(import.meta.env.VITE_VAPI_API_KEY || "YOUR_VAPI_API_KEY");
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on("call-start", () => setIsCallActive(true));
    vapiInstance.on("call-end", () => setIsCallActive(false));
    vapiInstance.on("error", () => setIsCallActive(false));

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Humera_Naaz_FullStack.pdf";
    link.download = "Humera.pdf";
    link.click();
  };

  // const handleTalkWithAI = () => {
  //   if (!vapi) return;
  //   if (isCallActive) vapi.stop();
  //   else vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID || "YOUR_ASSISTANT_ID");
  // };

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/humera-naaz14/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/humera314", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* LAYER 0: Space image */}
      <img
        src="/background.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-70 z-0 pointer-events-none"
        aria-hidden
        loading="eager"
      />

      {/* LAYER 1: Soft dark gradient for readability */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/20 to-black/80 pointer-events-none"
      />

      {/* LAYER 2: Milky Way shooting stars (canvas) */}
      <MilkyWayShootingStars />

      {/* LAYER 3: Foreground content */}
      <div className="container mx-auto px-4 text-center relative z-[3]">
        {/* Avatar (Holographic 3D Portrait) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
        
        {/* Avatar (Cuboid portrait inside a glass box) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
         <CuboidPortrait
            front="/images/01.jpg"
            back="/images/pic1.png"
            left="/images/pic3.jpg"
            right="/images/pic2.png"
            top="/images/pic4.png"
            bottom="/images/06.jpg"
            size={260}
            depth={260}
            gap={12}
            frameOpacity={0.18}
            rotateDurationSec={30}   // slower spin
            resumeDelayMs={500}      // half-second delay after mouse leaves
          />


        </motion.div>


        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-white"
        >
          Hi, I'm Humera Naaz
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto"
        >
          Full-Stack Developer || Exploring AI Agents
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          <Button
            onClick={handleDownloadResume}
            variant="default"
            size="lg"
            className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </Button>
          {/* <Button
            onClick={handleTalkWithAI}
            variant="outline"
            size="lg"
            className={`bg-transparent border-2 font-semibold px-8 py-3 transition-all duration-300 ${
              isCallActive
                ? "border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
                : "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            }`}
          >
            <Bot className="w-5 h-5 mr-2" />
            {isCallActive ? "End Call" : "Talk with AI"}
          </Button> */}
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* LAYER 4: Spaceship */}
      <SpaceShip />
    </section>
  );
};

export default Hero;
