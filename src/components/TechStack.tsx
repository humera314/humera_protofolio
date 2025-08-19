import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiVuedotjs,
  SiTailwindcss,
  SiSpringboot,
  SiDjango,
  SiExpress,
  SiNodedotjs,
  SiNestjs,
  SiGraphql,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  // SiAmazonaws,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiSelenium,
  SiCircleci,
} from "react-icons/si";

const technologies = [
  { Icon: SiJavascript, color: "#F7DF1E", name: "JavaScript" },
  { Icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { Icon: SiReact, color: "#61DAFB", name: "React.js" },
  { Icon: SiNextdotjs, color: "#47A248", name: "Next.js" },
  { Icon: SiAngular, color: "#DD0031", name: "Angular.js" },
  { Icon: SiVuedotjs, color: "#4FC08D", name: "Vue.js" },
  { Icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind CSS" },
  { Icon: SiSpringboot, color: "#6DB33F", name: "Spring Boot" },
  { Icon: SiDjango, color: "#092E20", name: "Django" },
  { Icon: SiExpress, color: "#47A248", name: "Express.js" },
  { Icon: SiNodedotjs, color: "#339933", name: "Node.js" },
  { Icon: SiNestjs, color: "#E0234E", name: "Nest.js" },
  { Icon: SiGraphql, color: "#E10098", name: "GraphQL" },
  { Icon: SiMysql, color: "#4479A1", name: "MySQL" },
  { Icon: SiPostgresql, color: "#336791", name: "PostgreSQL" },
  { Icon: SiMongodb, color: "#47A248", name: "MongoDB" },
  { Icon: SiGit, color: "#F05032", name: "Git" },
  { Icon: SiGithub, color: "#181717", name: "GitHub" },
  // { Icon: SiAmazonaws, color: "#FF9900", name: "AWS" },
  { Icon: SiDocker, color: "#2496ED", name: "Docker" },
  { Icon: SiKubernetes, color: "#326CE5", name: "Kubernetes" },
  { Icon: SiJenkins, color: "#D24939", name: "Jenkins" },
  { Icon: SiSelenium, color: "#43B02A", name: "Selenium" },
  { Icon: SiCircleci, color: "#343434", name: "CircleCI" },
];

const TechStack = () => (
  <section id="tech-stack" className="py-20 bg-black relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          Tech Stack
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Technologies and tools I work with to build amazing digital
          experiences
        </p>
      </motion.div>

      {/* Top marquee */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-12 py-4"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {technologies.map(({ Icon, color, name }, i) => (
            <motion.div
              key={`tech-icon-${i}`}
              className="flex-shrink-0"
              whileHover={{ scale: 1.2 }}
            >
              <Icon size="3rem" color={color} title={name} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom marquee (reverse) */}
      <div className="relative overflow-hidden mt-8">
        <motion.div
          className="flex gap-12 py-4"
          animate={{ x: ["-100%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...technologies].reverse().map(({ Icon, color, name }, i) => (
            <motion.div
              key={`tech-icon-rev-${i}`}
              className="flex-shrink-0"
              whileHover={{ scale: 1.2 }}
            >
              <Icon size="5rem" color={color} title={name} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default TechStack;
