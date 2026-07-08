import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Core Tech Team Member",
    org: "Alumni Cell, NSUT",
    date: "February 2025 — Present",
    points: ["Led backend development of the Nalum alumni portal, building authentication, search, and placement modules used by 500+ students and alumni across NSUT."],
  },
  {
    role: "Machine Learning Member",
    org: "Google Developer Student Club, NSUT",
    date: "October 2024 — Present",
    points: ["Contributed to ML workshops and hackathon events, mentoring peers on PyTorch fundamentals and coordinating logistics for 3+ technical events with 200+ attendees."],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector("h2");
      if (heading) {
        gsap.fromTo(heading, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      }

      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (items) {
        gsap.fromTo(items, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "8rem 0" }}>
      <div className="section-wrap">
        <span style={{ fontSize: "0.75rem", color: "#2563eb", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>Experience</span>
        <h2 className="font-heading" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "4rem", letterSpacing: "-0.025em" }}>
          Where I've contributed.
        </h2>

        <div ref={timelineRef} style={{ position: "relative", borderLeft: "1px solid rgba(255,255,255,0.1)", marginLeft: "1rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item" style={{ position: "relative", paddingLeft: "2rem" }}>
              <div style={{ position: "absolute", left: "-5px", top: "4px", width: "10px", height: "10px", backgroundColor: "#2563eb", borderRadius: "50%" }} />
              <span style={{ fontSize: "0.75rem", color: "#666", display: "block", marginBottom: "0.25rem" }}>{exp.date}</span>
              <h3 className="font-heading" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{exp.role}</h3>
              <p style={{ color: "#2563eb", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{exp.org}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {exp.points.map((point, j) => (
                  <li key={j} style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.625, paddingLeft: "1.5rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: "0.45rem", width: "0.65rem", height: "0.65rem", backgroundColor: "#2563eb", borderRadius: "50%" }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
