import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector("h2");
      if (heading) {
        gsap.fromTo(heading, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      }

      const paragraphs = textRef.current?.querySelectorAll("p");
      if (paragraphs) {
        gsap.fromTo(paragraphs, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }

      const statEls = statsRef.current?.querySelectorAll(".stat-item");
      if (statEls) {
        gsap.fromTo(statEls, { opacity: 0, scale: 0.8 }, {
          opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: "8rem 0" }}>
      <div className="section-wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }}>
          <div ref={textRef}>
            <span style={{ fontSize: "0.75rem", color: "#2563eb", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>About</span>
            <h2 className="font-heading" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.025em" }}>
              A developer who cares about the details.
            </h2>
            <p style={{ color: "#666", lineHeight: 1.625, marginBottom: "1rem" }}>
              I'm Nischay, a B.Tech student at Netaji Subhash University of Technology, Delhi,
              specializing in Network Security. I spend most of my time building full-stack
              applications, experimenting with AI/ML, and contributing to open source.
            </p>
            <p style={{ color: "#666", lineHeight: 1.625 }}>
              When I'm not coding, you'll find me grinding LeetCode problems, mentoring peers
              at GDSC NSUT, or building tools that solve real problems for communities around me.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <span className="font-heading" style={{ fontSize: "clamp(6rem, 14vw, 10rem)", fontWeight: 800, color: "rgba(255,255,255,0.03)", lineHeight: 1, position: "absolute", top: "-4rem", right: "-1rem", userSelect: "none", pointerEvents: "none" }}>
              01
            </span>
            <div ref={statsRef} style={{ position: "relative", zIndex: 10, marginTop: "5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div className="stat-item">
                <span className="font-heading" style={{ fontSize: "3rem", fontWeight: 700, color: "#e8e8e8" }}>2028</span>
                <span style={{ fontSize: "0.875rem", color: "#666", display: "block", marginTop: "0.25rem" }}>Graduation Year</span>
              </div>
              <div className="stat-item">
                <span className="font-heading" style={{ fontSize: "3rem", fontWeight: 700, color: "#e8e8e8" }}>500+</span>
                <span style={{ fontSize: "0.875rem", color: "#666", display: "block", marginTop: "0.25rem" }}>Alumni Served via Nalum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
