import { atom } from "recoil";

import scales from "~src/utils/scales";

import { DEFAULT_SCALE } from "../sequencerScale";

export const CUSTOM_SCALE_VALUE = "custom";

const sequencerScaleNameAtom = atom<
  | keyof typeof scales.scales
  | keyof typeof scales.chords
  | typeof CUSTOM_SCALE_VALUE
>({
  key: "sequencerScaleName",
  default: DEFAULT_SCALE.name,
});

export default sequencerScaleNameAtom;
