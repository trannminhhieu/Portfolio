import HiCycle from "./ui/HiCycle";
import Person from "./ui/Person";

export default function Hero({
  tagline = "Placeholder greeting — swap for your own line",
}: {
  tagline?: string;
}) {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 24px",
        background: "#FFFFFF",
        color: "#000000",
      }}
    >
      <Person
        background="#FFFFFF"
        height="100%"
        scale={2}
        style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.3 }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: "clamp(40px, 8vw, 96px)",
            lineHeight: 1.05,
            maxWidth: "16ch",
            margin: "0 auto",
            color: "#000000",
          }}
        >
          <HiCycle /> Hieu.
        </h1>
        <p
          style={{
            marginTop: 22,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
            color: "rgba(0,0,0,0.55)",
          }}
        >
          {tagline}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          color: "rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span>Scroll</span>
        <span
          style={{
            width: 1,
            height: 32,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
