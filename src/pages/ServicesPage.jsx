import { useEffect, useRef, useState } from "react";
import content from "../data/content";
import AccordionSection from "../components/AccordionSection";

const ServicesScroller = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollLock, setScrollLock] = useState(false);
  const scrollTimeout = useRef(null);
  const scrollUnlockTriggered = useRef(false);
  const containerRef = useRef(null);
  const servicesRef = useRef(null);
  const exitReady = useRef(false);

  // Track last scroll position and direction
  const lastScrollY = useRef(window.scrollY);
  const scrollDirection = useRef(null);

  // Scroll listener to lock when Services section is centered in viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!servicesRef.current) return;

      // Track scroll direction
      const currentScrollY = window.scrollY;
      scrollDirection.current =
        currentScrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = currentScrollY;

      const rect = servicesRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const topSpace = rect.top;
      const bottomSpace = viewportHeight - rect.bottom;

      const marginTolerance = 200;
      const isCentered = Math.abs(topSpace - bottomSpace) < marginTolerance;

      if (
        isCentered &&
        !(
          (scrollDirection.current === "down" &&
            activeIndex === content.length - 1) ||
          (scrollDirection.current === "up" && activeIndex === 0)
        )
      ) {
        exitReady.current = false;
        setScrollLock(true);
      } else {
        if (!exitReady.current) {
          exitReady.current = true;
          // Give the scroll lock a little grace period before unlocking
          setTimeout(() => {
            setScrollLock(false);
            scrollUnlockTriggered.current = false;
          }, 300);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);
  // Scroll handling for locking/unlocking accordion
  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrollLock) return;

      e.preventDefault();

      if (scrollTimeout.current) return;

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 600);

      const dir = e.deltaY > 0 ? 1 : -1;

      if (dir === 1 && activeIndex < content.length - 1) {
        setActiveIndex((prev) => prev + 1);
        scrollUnlockTriggered.current = false;
      } else if (dir === -1 && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
        scrollUnlockTriggered.current = false;
      } else if (dir === -1 && activeIndex === 0) {
        setScrollLock(false); // unlock before first
        scrollUnlockTriggered.current = false;
      }

      if (dir === 1 && activeIndex === content.length - 1) {
        if (!scrollUnlockTriggered.current) {
          scrollUnlockTriggered.current = true;
        } else {
          setScrollLock(false);
          scrollUnlockTriggered.current = false;
        }
      }
    };

    // ✅ Attach to window instead of containerRef
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [scrollLock, activeIndex]);

  return (
    <section ref={servicesRef} className="relative h-auto" id="services">
      <div
        ref={containerRef}
        className={`h-full w-full bg-gray-100 px-4 py-8 ${
          scrollLock ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        <h2 className="text-4xl font-extrabold text-black text-left ml-8 mb-10 border-l-4 border-black pl-4">
          Services
        </h2>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          {/* Accordion list on the left */}
          <div className="flex-1">
            {content.map((item, index) => (
              <AccordionSection
                key={index}
                title={item.title}
                description={item.description}
                isOpen={index === activeIndex}
              />
            ))}
          </div>

          {/* Image on the right */}
          <div className="w-100 h-100 hidden md:block flex-shrink-0 rounded overflow-hidden shadow-md bg-gray-200">
            <img
              key={content[activeIndex]?.image}
              src={content[activeIndex]?.image}
              alt={content[activeIndex]?.title}
              className="object-cover w-full h-full transition-opacity duration-500 ease-in-out opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesScroller;
