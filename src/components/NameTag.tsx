export default function NameTag({ name = "Placeholder Name" }: { name?: string }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "clamp(16px, 4vw, 32px)",
        left: "clamp(16px, 4vw, 32px)",
        zIndex: 20,
        fontFamily: "'Fraunces', serif",
        fontWeight: 500,
        fontSize: "clamp(20px, 2.4vw, 28px)",
        letterSpacing: "0.01em",
        color: "#000000",
      }}
    >
      {name}
    </div>
  );
}
