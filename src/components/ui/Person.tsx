import React, { CSSProperties } from "react";
import "./Person.css";

export interface PersonColors {
  black?: string;
  white?: string;
  blue?: string;
  skin?: string;
  darkSkin?: string;
  lightSkin?: string;
  hair?: string;
  darkHair?: string;
}

export interface PersonProps {
  /** Override any of the illustration colors */
  colors?: PersonColors;
  /** Background color of the stage */
  background?: string;
  /** Size multiplier for the illustration (1 = original size, 2 = twice as big) */
  scale?: number;
  /** Rotation in degrees (positive = clockwise, negative = counter-clockwise) */
  rotate?: number;
  /** Height of the stage (defaults to full viewport height) */
  height?: CSSProperties["height"];
  className?: string;
  style?: CSSProperties;
}

const defaultColors: Required<PersonColors> = {
  black: "#00202a",
  white: "#f8f8f8",
  blue: "#2348cd",
  skin: "#f77676",
  darkSkin: "#cc3c40",
  lightSkin: "#f3af9f",
  hair: "#6b4226", // front hair: brown
  darkHair: "#2b1a12", // back hair: black-brown
};

type CSSVars = CSSProperties & Record<`--${string}`, string | number | undefined>;

const Person: React.FC<PersonProps> = ({
  colors,
  background = "#fcf8db",
  scale = 1,
  rotate = 0,
  height = "100vh",
  className = "",
  style,
}) => {
  const c = { ...defaultColors, ...colors };

  const stageStyle: CSSVars = {
    "--black": c.black,
    "--white": c.white,
    "--blue": c.blue,
    "--skin": c.skin,
    "--dark-skin": c.darkSkin,
    "--light-skin": c.lightSkin,
    "--hair": c.hair,
    "--dark-hair": c.darkHair,
    "--person-scale": scale,
    "--person-rotate": `${rotate}deg`,
    backgroundColor: background,
    height,
    ...style,
  };

  return (
    <div
      className={`person-stage ${className}`.trim()}
      style={stageStyle}
      role="img"
      aria-label="Illustration of a smiling person with brown hair and blue glasses"
    >
      <div className="person">
        <div className="person__head">
          <div className="person__face" />
        </div>
      </div>
    </div>
  );
};

export default Person;
