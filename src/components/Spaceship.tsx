"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const SpaceShip = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    const loop = async () => {
      await controls.start({
        x: ["5vw", "80vw", "70vw", "15vw", "5vw"],
        y: ["10vh", "20vh", "80vh", "60vh", "10vh"],
        rotate: [0, 20, -15, 10, 0],
        scaleX: [1, 1, -1, -1, 1],
        transition: {
          duration: 16,
          ease: "easeInOut",
          times: [0, 0.25, 0.6, 0.85, 1],
        },
      });
      await controls.start({
        y: ["10vh", "8vh", "10vh"],
        rotate: [0, -5, 0],
        transition: { duration: 2.2, ease: "easeInOut" },
      });
      loop();
    };
    loop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[6]"
      aria-hidden
    >
      <motion.div
        initial={{ x: "5vw", y: "10vh", rotate: 0, scaleX: 1, opacity: 0.95 }}
        animate={controls}
        transition={{ ease: "easeInOut" }}
        className="w-[50px] h-[50px]"
      >
        <motion.div
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full blur-md"
          style={{ background: "rgba(255,255,255,0.5)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Use a normal <img> in non-Next setups */}
        <img
          src="/spaceship.png" /* or "/images/spaceship.png" based on your folder */
          alt="Spaceship"
          width={100}
          height={100}
          style={{ filter: "drop-shadow(0 4px 12px rgba(255,255,255,0.45))" }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
};

export default SpaceShip;
