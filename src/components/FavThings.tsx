import Cassette from "./ui/Cassette";
import "./FavThings.css";

/** Favourite things section. For now: a pure-CSS drawing of a mixtape. */
export default function FavThings() {
  return (
    <section id="fav-things" className="fav">
      <Cassette />

      {/* credit: the cassette drawing is adapted from this artist's CSS art */}
      <a
        className="fav__credit"
        href="https://youtube.com/playlist?list=PLG1C98Uca2a4&si=8cyrtDCY7SUFtFoL"
        target="_blank"
        rel="noopener noreferrer"
      >
      </a>
    </section>
  );
}
