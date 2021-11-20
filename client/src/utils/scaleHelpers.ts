const noteMap = [
  "C",
  "C#",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

/**
 * Gets the note name of a scale index
 * @param scaleIndex Index between 0 and 11 inclusive
 * @returns Note name without octave number
 */
export const getNoteName = (scaleIndex: number): string => noteMap[scaleIndex];

/**
 * Gets the note name with octave, from a given grid point and scale. Automatically selects the octave.
 * @param point Grid point index
 * @param scale Array of scale indices
 * @returns Note name with octave
 */
export const getScaleNoteFromGridPoint = (
  point: number,
  scale: number[]
): string => {
  const startingOctave = 5 - Math.ceil(18 / scale.length);

  const octave = Math.floor(point / scale.length);
  const scaleIndex = scale[point % scale.length];

  return `${noteMap[scaleIndex]}${octave + startingOctave}`;
};
