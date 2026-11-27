import NameTag from "./components/NameTag";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import { THEME } from "./theme";
import "./styles/global.css";

export default function Portfolio() {
  return (
    <div
      style={{
        background: THEME.ink,
        color: THEME.paper,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      <NameTag name="tr.mihi" />
      <Hero />
      <AboutMe />
    </div>
  );
}
