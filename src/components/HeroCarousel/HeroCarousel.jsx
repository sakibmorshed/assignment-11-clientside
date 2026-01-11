import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/hero.jpeg", "/hero2.jpeg", "/hero3.jpg"];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[80vh] lg:h-[98vh] overflow-hidden">
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.6, 0.01, 0.05, 0.95],
            }}
          >
            <img
              src={src}
              alt="Vietnamese Street Food"
              className="w-full h-full object-cover select-none"
              draggable={false}
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative h-full flex items-center justify-center text-center px-6">
        <motion.h1
          key={currentIndex}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-none"
        >
          BANGLADESHI
          <br />
          FOOD ZONE
        </motion.h1>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === currentIndex ? "bg-white w-10" : "bg-white/40 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
