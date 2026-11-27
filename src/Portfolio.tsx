import NameTag from "./components/NameTag";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import FavThings from "./components/FavThings";
import Frisbee from "./components/Frisbee";
import Quotes from "./components/Quotes";
import { THEME } from "./theme";
import "./styles/global.css";

export default function Portfolio() {
  return (
    <div
      style={{
        background: THEME.ink,
        color: THEME.paper,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100svh",
      }}
    >
      <NameTag name="tr.mihi" />
      <Hero />
      <AboutMe />
      <FavThings />
      <Frisbee />
      <Quotes />
    </div>
  );
}
