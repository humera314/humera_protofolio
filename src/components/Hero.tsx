"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Download, Bot } from "lucide-react";
import { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";

import { Button } from "./ui/button";
import MilkyWayShootingStars from "./MilkyWayShootingStars";
import SpaceShip from "./Spaceship";

const Hero = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);

  // Initialize VAPI
  useEffect(() => {
    const vapiInstance = new Vapi(import.meta.env.VITE_VAPI_API_KEY || "YOUR_VAPI_API_KEY");
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setIsCallActive(true);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setIsCallActive(false);
    });

    vapiInstance.on("error", (error) => {
      console.error("VAPI Error:", error);
      setIsCallActive(false);
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/KushalKongara_Resume.pdf";
    link.download = "KushalKongara_Resume.pdf";
    link.click();
  };

  const handleTalkWithAI = () => {
    if (!vapi) {
      console.error("VAPI not initialized");
      return;
    }

    if (isCallActive) {
      // End the call
      vapi.stop();
    } else {
      // Start the call
      vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID || "YOUR_ASSISTANT_ID");
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/kushalkongara/",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/Kushal-Kongara",
      label: "GitHub",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/kushal_kongara/",
      label: "Instagram",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* LAYER 0: Space image (put your file in /public or /public/images) */}
      {/* If you saved it as /public/background.jpg -> src="/background.jpg" */}
      {/* If you saved it as /public/images/background.jpg -> src="/images/background.jpg" */}
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
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Speaking orb effect */}
            {isCallActive && (
              <div className="absolute inset-0 -m-4">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                {/* Pulsing center dot */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
            <img
              src="/images/01.jpg"
              alt="Kushal Kongara"
              className={`w-48 h-48 rounded-full object-cover mx-auto border-2 transition-all duration-300 ${
                isCallActive 
                  ? "border-cyan-400/60 shadow-lg shadow-cyan-400/20" 
                  : "border-white/20"
              }`}
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-white"
        >
          Hi, I'm Kushal Kongara
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto"
        >
          Full-Stack Developer | Frontend Engineer | Exploring AI Agents
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
          <Button
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
          </Button>
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
