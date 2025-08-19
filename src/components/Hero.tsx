"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Download } from "lucide-react";

import { Button } from "./ui/button";
import MilkyWayShootingStars from "./MilkyWayShootingStars";
import SpaceShip from "./Spaceship";

const Hero = () => {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/KushalKongara_Resume.pdf";
    link.download = "KushalKongara_Resume.pdf";
    link.click();
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
            <img
              src="/images/01.jpg"
              alt="Kushal Kongara"
              className="w-48 h-48 rounded-full object-cover mx-auto border-2 border-white/20"
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
          Full-Stack Developer & Cloud-Native Architect
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
