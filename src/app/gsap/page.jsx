'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const Page = () => {
  // Track the current panel index
  const currentIndex = useRef(0);
  const scrollTween = useRef(null);

  useEffect(() => {
    // Register the ScrollToPlugin (we're not using ScrollTrigger in this setup)
    gsap.registerPlugin(ScrollToPlugin);

    const panels = gsap.utils.toArray(".panel");
    
    // Prevent touch scrolling from interrupting an in-progress tween
    const handleTouchStart = (e) => {
      if (scrollTween.current) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    document.addEventListener("touchstart", handleTouchStart, { capture: true, passive: false });

    // Function to scroll exactly to the panel indexed by `i`
    function goToSection(i) {
      // Clamp the index in case we reach the top or bottom edge
      i = Math.max(0, Math.min(i, panels.length - 1));
      currentIndex.current = i;
      scrollTween.current = gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          scrollTween.current = null;
        },
        overwrite: true
      });
    }

    // Wheel event handler: detect scroll direction and scroll one panel per event
    const handleWheel = (e) => {
      // If there's already a tween running, ignore further events
      if (scrollTween.current) return;
      
      // Prevent default wheel scrolling behavior
      e.preventDefault();

      // Get scroll direction based on deltaY
      const deltaY = e.deltaY;
      if (deltaY > 0) {
        // Scroll down if not on the last panel
        if (currentIndex.current < panels.length - 1) {
          goToSection(currentIndex.current + 1);
        }
      } else if (deltaY < 0) {
        // Scroll up if not on the first panel
        if (currentIndex.current > 0) {
          goToSection(currentIndex.current - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <section className="description panel blue">
        <div>
          <h1>Snap to Sections</h1>
          <div className="scroll-down">
            Scroll down
            <div className="arrow"></div>
          </div>
        </div>
      </section>
      <section className="panel red">ONE</section>
      <section className="panel orange">TWO</section>
      <section className="panel purple">THREE</section>
      <section className="panel green">FOUR</section>
    </>
  );
};

export default Page;
