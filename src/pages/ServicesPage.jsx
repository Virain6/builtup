import { useEffect, useRef, useState } from "react";
import content from "../data/content";
import AccordionSection from "../components/AccordionSection";
import ImageCarousel from "../components/ImageCarousel";

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

          {/* Image on the right (carousel) */}
          <div className="w-full md:w-100 h-48 md:h-100 flex-shrink-0 rounded overflow-hidden shadow-md bg-gray-200">
            <ImageCarousel
              images={
                content[activeIndex]?.images || content[activeIndex]?.image
              }
              className="w-full h-full"
              imgClassName="opacity-100"
            />
          </div>

          <div className="flex-1">
            {content.map((item, index) => (
              <AccordionSection
                key={index}
                title={item.title}
                description={item.description}
                isOpen={index === activeIndex}
                onClickTitle={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesScroller;
