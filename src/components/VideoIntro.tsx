import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward } from "lucide-react";
import { Button } from "./ui/button";
import VideoIntroFallback from "./VideoIntroFallback";

interface VideoIntroProps {
  onVideoEnd: () => void;
  videoSrc?: string;
}

const VideoIntro: React.FC<VideoIntroProps> = ({
  onVideoEnd,
  videoSrc = "/intro-video.mp4",
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [usesFallback, setUsesFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show skip button after 3 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 3000);

    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setIsPlaying(false);
      setTimeout(onVideoEnd, 500); // Small delay for smooth transition
    };

    const handleVideoError = (error: any) => {
      // If video fails to load, show fallback
      console.log("Video failed to load:", error);
      console.log("Video src:", videoSrc);
      setUsesFallback(true);
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);

    // Auto-play the video
    console.log("Attempting to play video:", videoSrc);
    video.play().catch((error) => {
      console.log("Auto-play failed:", error);
      console.log("Video src:", videoSrc);
      setUsesFallback(true); // Show fallback if auto-play is blocked
    });

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
    };
  }, [onVideoEnd]);

  const handleSkip = () => {
    setIsPlaying(false);
    setTimeout(onVideoEnd, 300);
  };

  // Show fallback if video fails or is not available
  if (usesFallback) {
    return <VideoIntroFallback onVideoEnd={onVideoEnd} />;
  }

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {/* Video Container */}
          <div className="relative w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
            >
              <source src={videoSrc} type="video/mp4" />
              {/* Fallback content */}
              <div className="flex items-center justify-center h-full text-white">
                <p>Your browser doesn't support video playback.</p>
              </div>
            </video>

            {/* Video Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Skip Button */}
            <AnimatePresence>
              {showSkip && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-8 right-8 z-10"
                >
                  <Button
                    onClick={handleSkip}
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm transition-all duration-300 group"
                  >
                    <SkipForward className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    Skip Intro
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading indicator for when video is loading */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <div className="text-white text-center">
                <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg">Loading...</p>
              </div>
            </motion.div>

            {/* Video Title/Branding (optional) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-24 left-8 text-white z-10"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome to Kushal's Cosmic Canvas
              </h1>
              <p className="text-lg text-white/80">
                Exploring the universe of possibilities
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoIntro;
