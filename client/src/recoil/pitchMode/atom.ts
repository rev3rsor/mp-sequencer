import { atom } from "recoil";

export const enum PitchMode {
  FREQUENCY = "frequency",
  HARMONICS = "harmonics",
  SCALE = "scale",
}

export const pitchModes = [
  PitchMode.FREQUENCY,
  PitchMode.HARMONICS,
  PitchMode.SCALE,
];

const pitchModeAtom = atom<PitchMode>({
  key: "pitchMode",
  default: PitchMode.SCALE,
});

export default pitchModeAtom;
