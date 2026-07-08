import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const LOGO_BASE = "https://cdn.simpleicons.org";

const row1 = [
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "C++", slug: "cplusplus", color: "00599C" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Java", slug: "oracle", color: "F80000" },
  { name: "SQL", slug: "mysql", color: "4479A1" },
];

const row2 = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Express", slug: "express", color: "FFFFFF" },
  { name: "Flask", slug: "flask", color: "FFFFFF" },
  { name: "FastAPI", slug: "fastapi", color: "009688" },
];

const row3 = [
  { name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
  { name: "Hugging Face", slug: "huggingface", color: "FFD21E" },
  { name: "Gemini", slug: "google", color: "FFFFFF" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
];

const row4 = [
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Linux", slug: "linux", color: "FCC624" },
  { name: "Prometheus", slug: "prometheus", color: "E6522C" },
  { name: "Grafana", slug: "grafana", color: "F46800" },
  { name: "Postman", slug: "postman", color: "FF6C37" },
  { name: "Socket.IO", slug: "socketdotio", color: "FFFFFF" },
];

function LogoItem({ tech }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1.5rem",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "0.5rem",
        flexShrink: 0,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <img
        src={`${LOGO_BASE}/${tech.slug}/${tech.color}`}
        alt={tech.name}
        width={24}
        height={24}
        style={{ objectFit: "contain", pointerEvents: "none" }}
      />
      <span
        style={{
          fontSize: "0.875rem",
          color: "rgba(232,232,232,0.7)",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-heading)",
          fontWeight: 500,
          letterSpacing: "0.02em",
          pointerEvents: "none",
        }}
      >
        {tech.name}
      </span>
    </div>
  );
}

function DraggableRow({ items, speed }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const stateRef = useRef({
    anim: null,
    isDragging: false,
    startX: 0,
    lastX: 0,
    trackX: 0,
    setWidth: 0,
    raf: null,
  });

  // Measure one set width
  const measureSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    // One set = half the total children count (since we tripled)
    const totalChildren = track.children.length;
    const perSet = totalChildren / 3;
    let w = 0;
    for (let i = 0; i < perSet; i++) {
      w += track.children[i].offsetWidth;
    }
    // Add gaps
    w += (perSet - 1) * 16; // 1rem = 16px gap
    return w;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setWidth = measureSetWidth();
    stateRef.current.setWidth = setWidth;

    // Start at the beginning of set 2 (so we can scroll left through set 2 and 3)
    gsap.set(track, { x: 0 });

    // Auto-scroll using requestAnimationFrame for smooth drag integration
    let lastTime = performance.now();
    let pos = 0;
    const pixelsPerMs = setWidth / (speed * 1000);

    const tick = (now) => {
      if (!stateRef.current.isDragging) {
        const dt = now - lastTime;
        pos -= pixelsPerMs * dt;
        // Reset when we've scrolled one full set
        if (pos <= -setWidth) {
          pos += setWidth;
        }
        gsap.set(track, { x: pos });
        stateRef.current.trackX = pos;
      } else {
        pos = stateRef.current.trackX;
      }
      lastTime = now;
      stateRef.current.raf = requestAnimationFrame(tick);
    };

    stateRef.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
    };
  }, [speed, measureSetWidth]);

  const onPointerDown = (e) => {
    if (e.type === "mousedown" && e.button !== 0) return;
    e.preventDefault();

    const s = stateRef.current;
    s.isDragging = true;
    s.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    s.lastX = s.startX;
    s.trackX = gsap.getProperty(trackRef.current, "x");

    document.addEventListener("mousemove", onPointerMove);
    document.addEventListener("mouseup", onPointerUp);
    document.addEventListener("touchmove", onPointerMove, { passive: false });
    document.addEventListener("touchend", onPointerUp);
  };

  const onPointerMove = (e) => {
    e.preventDefault();
    const s = stateRef.current;
    if (!s.isDragging) return;

    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const delta = clientX - s.lastX;
    s.lastX = clientX;
    s.trackX += delta;

    // Wrap while dragging to keep it infinite
    const sw = s.setWidth;
    if (s.trackX > 0) s.trackX -= sw;
    if (s.trackX <= -sw) s.trackX += sw;

    gsap.set(trackRef.current, { x: s.trackX });
  };

  const onPointerUp = () => {
    stateRef.current.isDragging = false;
    document.removeEventListener("mousemove", onPointerMove);
    document.removeEventListener("mouseup", onPointerUp);
    document.removeEventListener("touchmove", onPointerMove);
    document.removeEventListener("touchend", onPointerUp);
  };

  // Triple the items for seamless loop
  const tripled = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        cursor: "grab",
        userSelect: "none",
      }}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1rem",
          width: "fit-content",
          touchAction: "pan-y",
          willChange: "transform",
        }}
      >
        {tripled.map((tech, i) => (
          <LogoItem key={`${tech.slug}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
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
    <section id="skills" ref={sectionRef} style={{ padding: "8rem 0", overflow: "hidden" }}>
      <div className="section-wrap" style={{ marginBottom: "4rem" }}>
        <span style={{ fontSize: "0.75rem", color: "#2563eb", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>
          Skills
        </span>
        <h2 className="font-heading" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.025em" }}>
          What I work with.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <DraggableRow items={row1} speed={35} />
        <DraggableRow items={row2} speed={40} />
        <DraggableRow items={row3} speed={38} />
        <DraggableRow items={row4} speed={42} />
      </div>
    </section>
  );
}
