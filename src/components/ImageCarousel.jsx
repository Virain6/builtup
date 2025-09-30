import { useEffect, useRef, useState } from "react";

/**
 * ImageCarousel
 * Props:
 * - images: string[] | string  (accepts a single path or an array)
 * - className: optional wrapper className to control size/layout
 * - imgClassName: optional className applied to the inner <img>
 */
const ImageCarousel = ({
  images,
  className = "",
  imgClassName = "",
  autoPlay = true,
  intervalMs = 4000,
  resumeDelayMs = 6000,
}) => {
  const pics = Array.isArray(images) ? images : [images].filter(Boolean);
  const [idx, setIdx] = useState(0);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const advanceTimer = useRef(null);
  const resumeTimer = useRef(null);
  const [autoEnabled, setAutoEnabled] = useState(true);

  const hasImages = pics.length > 0;

  const next = () => setIdx((i) => (i + 1) % pics.length);
  const prev = () => setIdx((i) => (i - 1 + pics.length) % pics.length);

  const clearTimers = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const registerInteraction = () => {
    // Pause auto-advance and schedule resume
    setAutoEnabled(false);
    // Clear any running timers
    clearTimers();
    // Resume auto after a delay
    resumeTimer.current = setTimeout(() => {
      setAutoEnabled(true);
    }, resumeDelayMs);
  };

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  // Keyboard navigation (focusable with tabIndex)
  useEffect(() => {
    const el = containerRef.current;
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        registerInteraction();
        next();
      }
      if (e.key === "ArrowLeft") {
        registerInteraction();
        prev();
      }
    };
    if (el) el.addEventListener("keydown", onKey);
    return () => el && el.removeEventListener("keydown", onKey);
  }, []);

  // Basic swipe support (mobile)
  const handleTouchStart = (e) => {
    registerInteraction();
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 30; // px
    if (dx < -threshold) next();
    if (dx > threshold) prev();
    touchStartX.current = null;
  };

  const handlePrev = () => {
    registerInteraction();
    prev();
  };
  const handleNext = () => {
    registerInteraction();
    next();
  };
  const handleDot = (i) => {
    registerInteraction();
    setIdx(i);
  };

  // Auto-advance when enabled; pauses on interaction and resumes after resumeDelayMs
  useEffect(() => {
    if (!autoPlay || !hasImages || pics.length <= 1 || !autoEnabled) {
      // Not running auto-advance right now
      if (advanceTimer.current) {
        clearTimeout(advanceTimer.current);
        advanceTimer.current = null;
      }
      return;
    }
    // Schedule next slide
    advanceTimer.current = setTimeout(() => {
      next();
    }, intervalMs);

    return () => {
      if (advanceTimer.current) {
        clearTimeout(advanceTimer.current);
        advanceTimer.current = null;
      }
    };
  }, [autoPlay, hasImages, pics.length, autoEnabled, idx, intervalMs]);

  if (!hasImages) return null;

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Image */}
      <img
        src={pics[idx]}
        alt=""
        className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${imgClassName}`}
      />

      {/* Overlay controls */}
      {pics.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            {/* Left Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path
                fillRule="evenodd"
                d="M15.78 4.22a.75.75 0 0 1 0 1.06L9.06 12l6.72 6.72a.75.75 0 1 1-1.06 1.06l-7.25-7.25a.75.75 0 0 1 0-1.06l7.25-7.25a.75.75 0 0 1 1.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            {/* Right Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path
                fillRule="evenodd"
                d="M8.22 19.78a.75.75 0 0 1 0-1.06L14.94 12 8.22 5.28a.75.75 0 1 1 1.06-1.06l7.25 7.25a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {pics.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 w-4 rounded-full transition-all ${
                  i === idx ? "bg-white/90" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
