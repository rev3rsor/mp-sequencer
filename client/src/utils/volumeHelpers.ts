import { DYNAMIC_RANGE } from "./constants";

// ref: https://www.dr-lex.be/info-stuff/volumecontrols.html
/**
 * Scales a linear volume (0 to 1) to a logarithmic volume (0 to 1)
 * @param linearVolume Volume from linear scale between 0 and 1
 * @returns Volume on logarithmic scale between 0 and 1. Returns -Infinity for input 0.
 */
export const linearToExponential = (linearVolume: number) =>
  Math.log(linearVolume * 1000) / 6.908;

/**
 * Scales a number from range `[0, 1]` to `[-DYNAMIC_RANGE, 0]`
 * @param zeroToOne
 * @returns Scaled number
 */
export const scaleVolume = (zeroToOne: number) =>
  (zeroToOne - 1) * DYNAMIC_RANGE;
