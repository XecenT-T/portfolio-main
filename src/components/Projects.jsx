import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01", title: "Nalum", subtitle: "NSUT Alumni Portal",
    tech: ["Node.js", "Express.js", "MongoDB", "React.js", "JWT"],
    description: [
      "Engineered secure OTP-based authentication and JWT session management serving 500+ alumni, reducing unauthorized access attempts by 90%.",
      "Built MongoDB aggregation pipelines with compound indexes for full-text search, achieving sub-200ms query response times on 10K+ records.",
      "Developed RESTful APIs with role-based access control for admin, alumni, and student user types.",
    ],
    live: "https://alumni.nsut.ac.in/",
    source: "https://github.com/nalumnsut/nalum",
  },
  {
    num: "02", title: "MCD Dashboard", subtitle: "Smart Civic Workforce Portal",
    tech: ["React.js", "Node.js", "MongoDB", "Gemini API", "Leaflet", "Face-API.js"],
    description: [
      "Engineered a MERN-stack municipal workforce portal with face-api.js biometric verification and geo-fencing, reducing attendance fraud by 95%.",
      "Integrated a 24/7 multilingual Google Gemini AI Chatbot for workers to query payroll, file complaints, and get help in native languages.",
      "Built real-time tracking and deployment density maps using Leaflet, matching active workforce against reported civic issues.",
    ],
    live: "https://mcd-dashboard-kappa.vercel.app/",
    source: "https://github.com/XecenT-T/MCD_Dashboard",
  },
  {
    num: "03", title: "Wellness-Companion", subtitle: "AI Mental Health Platform",
    tech: ["React.js", "Tailwind CSS", "MongoDB", "Gemini API", "Hugging Face"],
    description: [
      "Developed an AI-driven mental health platform using LLM-based conversational agents delivering context-aware emotional support to 100+ beta users.",
      "Engineered NLP prompt pipelines with mood-aware context injection, improving response relevance by 35%.",
      "Built end-to-end with React, Tailwind CSS, MongoDB, and REST APIs with real-time chat.",
    ],
    source: "https://github.com/XecenT-T/wellness-companion",
  },
  {
    num: "04", title: "PingDome", subtitle: "Gaming Latency Dashboard",
    tech: ["Next.js", "Express.js", "Socket.IO", "Docker", "Prometheus"],
    description: [
      "Architected a full-stack monorepo streaming real-time ICMP/TCP latency at 1 Hz over WebSockets with sliding-window statistical aggregation.",
      "Built a production observability pipeline with Prometheus and Grafana auto-provisioned dashboards for live regional latency monitoring.",
      "Deployed distributed probe servers on AWS EC2 and Render across multiple gaming regions.",
    ],
    source: "https://github.com/XecenT-T/game-pings",
  },
];

function ProjectItem({ project, index }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: itemRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div ref={itemRef} style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr", gap: "2rem", alignItems: "start" }}>
      <span className="font-heading" style={{ fontSize: "clamp(5rem, 12vw, 8rem)", fontWeight: 800, color: "rgba(255,255,255,0.03)", lineHeight: 1, position: "absolute", top: "-2.5rem", [isEven ? "left" : "right"]: "-1rem", userSelect: "none", pointerEvents: "none", zIndex: 0 }}>
        {project.num}
      </span>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 className="font-heading" style={{ fontSize: "clamp(1.875rem, 4vw, 2.25rem)", fontWeight: 700, marginBottom: "0.25rem", letterSpacing: "-0.025em" }}>
          {project.title}
        </h3>
        <p style={{ color: "#666", fontSize: "0.875rem", marginBottom: "1.5rem" }}>{project.subtitle}</p>

        <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {project.description.map((desc, i) => (
            <li key={i} style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.625, paddingLeft: "1.5rem", position: "relative" }}>
              <span style={{ position: "absolute", left: 0, top: "0.45rem", width: "0.65rem", height: "0.65rem", backgroundColor: "#2563eb", borderRadius: "50%" }} />
              {desc}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="hoverable" style={{ fontSize: "0.875rem", color: "#2563eb" }}>
              Live →
            </a>
          )}
          <a href={project.source} target="_blank" rel="noreferrer" className="hoverable" style={{ fontSize: "0.875rem", color: "#2563eb" }}>
            Source →
          </a>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative", zIndex: 1 }}>
        {project.tech.map((t) => (
          <span key={t} className="font-heading" style={{ fontSize: "1.125rem", letterSpacing: "0.15em", color: "rgba(102,102,102,0.3)", textTransform: "uppercase" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector("h2");
      if (heading) {
        gsap.fromTo(heading, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ padding: "8rem 0" }}>
      <div className="section-wrap">
        <span style={{ fontSize: "0.75rem", color: "#2563eb", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>Projects</span>
        <h2 className="font-heading" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "5rem", letterSpacing: "-0.025em" }}>
          Things I've built.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {projects.map((project, i) => (
            <ProjectItem key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
