import { join } from "node:path";

const colors = {
  black: "#000000",
  lightBlack: "#13172B",
  blue: "#8392FF",
  lightBlue: "#6CA9FF",
  grey: "#B0B8F7",
  lightGrey: "#C8C8FF",
  lightishGrey: "#B0B8F7",
  green: "#6CD649",
  lightGreen: "#D5DDEB",
  transparentOrange: "#FF640033",
  red: "#F86F65",
  yellow: "#FDC64D",
  lightYellow: "#F8E359",
  transparentYellow: "#FBDE2D33",
  white: "#e0e0e0",
} as const;
const inputPath = join(process.cwd(), "src/themes");
const outputPath = join(process.cwd(), "themes");

export { colors, inputPath, outputPath };
