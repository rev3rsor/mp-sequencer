// scales starting from index 0
export const chromatic = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const major = [0, 2, 4, 5, 7, 9, 11];

export const naturalMinor = [0, 2, 3, 5, 7, 8, 10];
export const harmonicMinor = [0, 2, 3, 5, 7, 8, 11];

export const majorPentatonic = [0, 2, 4, 7, 9];
export const minorPentatonic = [0, 3, 5, 7, 10];

// chords
export const majorTriad = [0, 4, 7];
export const minorTriad = [0, 3, 7];
export const diminishedTriad = [0, 3, 6];
export const augmentedTriad = [0, 4, 8];

export const majorSeventh = [0, 4, 7, 11];
export const dominantSeventh = [0, 4, 7, 10];
export const minorSeventh = [0, 3, 7, 10];
export const minorMajor = [0, 3, 7, 11];
export const halfDiminished = [0, 3, 6, 10];
export const diminishedSeventh = [0, 3, 6, 9];

export default {
  scales: {
    chromatic,
    harmonicMinor,
    major,
    majorPentatonic,
    minorPentatonic,
    naturalMinor,
  },
  chords: {
    majorTriad,
    minorTriad,
    diminishedTriad,
    augmentedTriad,
    majorSeventh,
    dominantSeventh,
    minorSeventh,
    minorMajor,
    halfDiminished,
    diminishedSeventh,
  },
};
