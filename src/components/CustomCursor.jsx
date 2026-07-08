import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const moveCursor = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const handleMouseEnter = () => {
      gsap.to(ring, { scale: 2, borderColor: "var(--color-accent)", duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "var(--color-text)", duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const links = document.querySelectorAll("a, button, .hoverable");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-text rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}
