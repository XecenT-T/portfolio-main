import { useEffect, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".nav-link",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        transition: "all 0.5s",
        backgroundColor: scrolled ? "rgba(12,12,12,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}
    >
      <div className="section-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", paddingBottom: "1rem" }}>
        <a href="#" className="font-heading hoverable" style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
          n<span style={{ color: "#2563eb" }}>.</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link hoverable"
              style={{ fontSize: "0.875rem", color: "#666", textDecoration: "none", position: "relative" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
