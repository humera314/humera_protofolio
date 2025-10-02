"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Cyber Infrastructure ",
    period: "Sept 2025 – Present",
    location: "San Jose, CA, USA",
    description:
      "Designed and optimized multi-turn conversational AI workflows using LLMs  with RAG and vector databases to improve context retention and automation.",
    achievements: [
   "Engineered scalable full-stack solutions (MERN) including a collaboration platform (+30% integration) and an AI workflow tool, earning recognition as Most Innovative Project.",

    "Optimized financial systems by automating Stripe subscriptions, improving payment success (+5%), and saving $5K/month.",
"Boosted backend efficiency with C++ extensions (+20% performance), SAP/API integrations, and LLM-powered chatbots that cut support resolution time by 25%."
],  
  },
  
  
  {
    title: "Master's in Computer science",
    company: "San Francisco Bay university",
    period: "May 2023 – Aug 2024",
    location: "Fremont, CA, USA",
    description:
      "I've obtained my Master's degree in computer science from San Francisco Bay university",
    achievements: [
    "Developed an AI-powered fitness application with personalized chat-based recommendations",
    "Implemented gamification features such as streaks, badges, and challenges to enhance user retention",
    "Delivered a full-stack prototype with modern UI/UX and integrated AI capabilities"
  ],
  },

  {
    title: "Software Developer Engineer",
    company: "Infosys",
    period: "April 2021 – April 2023",
    location: "Hyderabad, India",
    description:
      "Developed and maintained enterprise-grade applications with Java, Spring Boot, AngularJS, and relational databases, delivering scalable APIs and improving release efficiency.",
    achievements: [
    "Automated IT workflows & monitoring with AIOps, ML-driven anomaly detection, and Prometheus alerts, achieving 95% SLA compliance and preventing 95%+ outages.",

    "Built scalable microservices with REST APIs, Docker, and Kubernetes, reducing infra costs by 25% and improving system reliability.",

    "Accelerated delivery pipelines by integrating GitLab, Jenkins, and Terraform, cutting deployment time by 60% and boosting release frequency 5x."
  ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden py-24 bg-black"
    >
      {/* Starfield background */}
      <Stars />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Experience Log
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mt-4">
            My journey through building scalable applications and leading
            development teams
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Warp tunnel timeline line */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7dd3fc]/40 to-transparent animate-pulse" />
          </div>

          {/* Moving spaceship on the timeline */}
          <TimelineShip count={experiences.length} inView={isInView} />

          {/* Timeline nodes + cards */}
          <div className="space-y-20">
            {experiences.map((exp, i) => {
              const leftSide = i % 2 === 0;
              return (
                <motion.div
                  key={exp.title + i}
                  initial={{
                    opacity: 0,
                    x: leftSide ? -60 : 60,
                    rotate: leftSide ? -1.5 : 1.5,
                  }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0, rotate: 0 }
                      : { opacity: 0, x: leftSide ? -60 : 60 }
                  }
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className={`relative flex ${
                    leftSide ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Node (planet) */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-8"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  >
                    <Planet i={i} />
                  </motion.div>

                  {/* Card */}
                  <article
                    className={`w-full md:w-[calc(50%-60px)] ${
                      leftSide ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_0_30px_rgba(124,58,237,0.15)]"
                    >
                      {/* neon edge */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 [mask-image:linear-gradient(transparent,black,transparent)]" />

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <h4 className="text-lg font-semibold text-cyan-300">
                            {exp.company}
                          </h4>
                        </div>

                        <div className="text-sm text-white/70 space-y-1 md:text-right">
                          <div className="flex items-center gap-2 md:justify-end">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2 md:justify-end">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white/80 mt-4">{exp.description}</p>

                      <ul className="mt-4 space-y-2">
                        {exp.achievements.map((a, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -14 }}
                            animate={
                              isInView ? { opacity: 1, x: 0 } : { x: -14 }
                            }
                            transition={{
                              duration: 0.5,
                              delay: i * 0.15 + j * 0.08 + 0.2,
                            }}
                            className="flex gap-3 text-sm text-white/75"
                          >
                            <span className="mt-2 inline-block h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_10px_#22d3ee]" />
                            <span>{a}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

/* ---------- Decorative subcomponents ---------- */

function Stars() {
  // A few twinkling stars using motion for subtle flicker + parallax drift
  const star = (delay = 0, size = 2) => (
    <motion.span
      key={Math.random()}
      className="absolute rounded-full bg-white"
      style={{
        width: size,
        height: size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: 0.6,
      }}
      initial={{ opacity: 0.2, y: 0 }}
      animate={{ opacity: [0.2, 1, 0.2], y: [-2, 2, -2] }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  return (
    <div className="absolute inset-0">
      {[...Array(40)].map((_, i) =>
        star(i * 0.1, Math.random() > 0.85 ? 3 : 2)
      )}
      {/* soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </div>
  );
}

function Planet({ i }: { i: number }) {
  // Alternating planet colors
  const colors = [
    "bg-cyan-300",
    "bg-fuchsia-300",
    "bg-emerald-300",
    "bg-amber-300",
  ];
  const glow = [
    "shadow-[0_0_20px_#67e8f9]",
    "shadow-[0_0_20px_#f0abfc]",
    "shadow-[0_0_20px_#6ee7b7]",
    "shadow-[0_0_20px_#fcd34d]",
  ];
  const c = colors[i % colors.length];
  const g = glow[i % glow.length];

  return (
    <div className="relative">
      <div className={`h-4 w-4 rounded-full ${c} ${g}`} />
      <div className="absolute -inset-4 rounded-full blur-lg opacity-40 bg-white/20" />
      {/* orbit ring */}
      <div className="absolute -inset-6 rounded-full border border-white/10" />
    </div>
  );
}

function TimelineShip({ count, inView }: { count: number; inView: boolean }) {
  // Ship moves from the first to the last node along the center line
  // We distribute positions along the vertical space based on item count.
  const segments = count + 1;
  const yStops = Array.from(
    { length: segments },
    (_, k) => `${(k / (segments - 1)) * 100}%`
  );

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-8 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden
    >
      {/* <motion.img
        src="/spaceship.png"
        alt=""
        width={40}
        height={40}
        className="mx-auto drop-shadow-[0_6px_16px_rgba(255,255,255,0.35)]"
        initial={{ y: 0, rotate: -90, scale: 0.95 }}
        animate={{
          y: yStops,
          rotate: [-90, -90, -90, -90, -90],
        }}
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        draggable={false}
      /> */}
      {/* subtle engine glow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 rounded-full blur-md"
        style={{ background: "rgba(125,211,252,0.6)" }}
        animate={{ opacity: [0.2, 0.9, 0.2] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
