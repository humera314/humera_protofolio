import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Story = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="story"
      className="py-20 bg-black relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            My Journey
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="relative">
                <motion.img
                  src="/images/02.jpg"
                  alt="Humera - Journey"
                  className="w-full h-64 object-cover rounded-xl border-2 border-white/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              </div>

              <div className="relative">
                <motion.img
                  src="/images/03.jpg"
                  alt="Humera - Adventures"
                  className="w-full h-64 object-cover rounded-xl border-2 border-white/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              </div>
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="card-minimal">
                <p className="text-lg leading-relaxed text-white">
                   Hi, I’m Humera — a curious builder with a Master’s in Computer Science.
I’ve gone from spinning up WordPress blogs to architecting full-stack apps with React, Django, and Java Spring Boot.
Along the way I’ve picked up the craft of UI/UX design, front-end and back-end engineering, databases, and deployments.
What excites me most? Taking an idea from scratch and turning it into something people actually use and enjoy. 
                </p>
              </div>

              <div className="card-minimal">
                <p className="text-lg leading-relaxed text-white">
                  A Hollywood movie buff dreaming of SF & NY, I'm now crafting
                  world-class web experiences in the US. 
                  Why be a programmer? Because I get to boss computers around 
                  until they listen. It’s part puzzle-solving, part wizardry, 
                  and part caffeine ritual. And honestly, nothing beats the 
                  thrill of seeing “it finally runs” at 2 a.m.
                </p>
              </div>

              {/* Journey highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: "Years Experience", value: "3+" },
                  { label: "Projects Completed", value: "50+" },
                  { label: "Technologies Mastered", value: "25+" },
                  { label: "Countries Worked", value: "2" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                  >
                    <div className="text-2xl font-bold text-accent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
