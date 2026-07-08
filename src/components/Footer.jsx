export default function Footer() {
  return (
    <footer style={{ padding: "2rem 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="section-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.75rem", color: "#666" }}>
          © 2026 Nischay Bagari
        </span>
        <a href="#" className="hoverable" style={{ fontSize: "0.75rem", color: "#666" }}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
