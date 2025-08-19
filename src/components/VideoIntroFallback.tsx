import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward, Video } from "lucide-react";
import { Button } from "./ui/button";

interface VideoIntroFallbackProps {
  onVideoEnd: () => void;
}

const VideoIntroFallback: React.FC<VideoIntroFallbackProps> = ({
  onVideoEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [progress, setProgress] = useState(0);

  // Demo video duration (in seconds)
  const DEMO_DURATION = 8;

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          setTimeout(onVideoEnd, 500);
          return 100;
        }
        return prev + 100 / (DEMO_DURATION * 10); // Update every 100ms
      });
    }, 100);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(progressInterval);
    };
  }, [onVideoEnd]);

  const handleSkip = () => {
    setIsPlaying(false);
    setTimeout(onVideoEnd, 300);
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Cosmic background similar to Hero */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/50 to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-800/20 to-pink-900/30"></div>

            {/* Animated stars */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${
                    2 + Math.random() * 3
                  }s ease-in-out infinite ${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center text-white px-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.6 }}
              className="mb-8"
            >
              <Video className="w-24 h-24 mx-auto mb-6 text-white opacity-80" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Kushal's Cosmic Canvas
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 text-white/80"
            >
              Exploring the Universe of Possibilities
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                ></motion.div>
              </div>
              <p className="text-sm text-white/60 mt-2">
                Loading experience...
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-white/60"
            >
              <p className="text-lg">
                Full-Stack Developer & Cloud-Native Architect
              </p>
            </motion.div>
          </div>

          {/* Skip Button */}
          <AnimatePresence>
            {showSkip && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-8 right-8 z-20"
              >
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm transition-all duration-300 group skip-button-glow"
                >
                  <SkipForward className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  Skip Intro
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner decoration */}
          <div className="absolute top-8 left-8 text-white/40">
            <div className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border border-white/30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoIntroFallback;
