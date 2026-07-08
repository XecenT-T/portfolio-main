import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = nameRef.current.querySelectorAll(".hero-letter");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 80, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-links a",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.6, ease: "power2.out" }
      );

      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2.2, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 1.5rem",
        position: "relative",
      }}
    >
      <div
        ref={nameRef}
        style={{ textAlign: "center", width: "100%", perspective: "1000px" }}
      >
        <h1
          className="font-heading"
          style={{
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
          }}
        >
          <span style={{ display: "block", fontSize: "clamp(3rem, 10vw, 7rem)" }}>
            {"Nischay".split("").map((char, i) => (
              <span key={i} className="hero-letter" style={{ display: "inline-block" }}>
                {char}
              </span>
            ))}
          </span>
          <span style={{ display: "block", fontSize: "clamp(3rem, 10vw, 7rem)", color: "rgba(102,102,102,0.4)" }}>
            {"Bagari".split("").map((char, i) => (
              <span key={i} className="hero-letter" style={{ display: "inline-block" }}>
                {char}
              </span>
            ))}
          </span>
        </h1>
      </div>

      <p className="hero-subtitle" style={{ color: "#666", marginTop: "2rem", fontSize: "1.125rem", maxWidth: "28rem", textAlign: "center" }}>
        I build things that live on the internet.
      </p>

      <div className="hero-links" style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem" }}>
        <a href="https://github.com/XecenT-T" target="_blank" rel="noreferrer" className="hoverable" style={{ color: "#666", fontSize: "0.875rem" }}>
          GitHub →
        </a>
        <a href="https://www.linkedin.com/in/nischay-bagari-a56013324" target="_blank" rel="noreferrer" className="hoverable" style={{ color: "#666", fontSize: "0.875rem" }}>
          LinkedIn →
        </a>
        <a href="https://leetcode.com/u/Nischay_Bagari/" target="_blank" rel="noreferrer" className="hoverable" style={{ color: "#666", fontSize: "0.875rem" }}>
          LeetCode →
        </a>
      </div>

      <div className="scroll-indicator" style={{ position: "absolute", bottom: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "2rem", background: "linear-gradient(to bottom, #666, transparent)" }} />
      </div>
    </section>
  );
}
