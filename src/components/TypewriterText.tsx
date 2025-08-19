import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 100,
  delay = 0,
  className = "",
  showCursor = true,
  cursorChar = "|",
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true);

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Typing complete
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, isTyping, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;

    const blinkInterval = setInterval(() => {
      setShowBlinkingCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, [showCursor]);

  return (
    <motion.span
      className={`typewriter-text ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span>{displayedText}</span>
      {showCursor && (
        <span
          className={`typewriter-cursor inline-block ml-1 ${
            showBlinkingCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{
            color: "currentColor",
            fontSize: "1em",
            lineHeight: "1",
            transition: "opacity 0.1s ease-in-out",
          }}
        >
          {cursorChar}
        </span>
      )}
    </motion.span>
  );
};

export default TypewriterText;
