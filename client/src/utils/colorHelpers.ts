import { Color } from "~src/recoil/color";

// http://alienryderflex.com/hsp.html
export const getPerceivedBrightness = ({ r, g, b }: Color) =>
  Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);

export const colorToNumber = ({ r, g, b }: Color) =>
  2 ** 16 * r + 2 ** 8 * g + b;
