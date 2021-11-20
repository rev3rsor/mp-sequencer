import { atom } from "recoil";

import { major } from "~src/utils/scales";

export const DEFAULT_SCALE = { name: "major" as const, value: major };

const sequencerScaleAtom = atom<number[]>({
  key: "sequencerScale",
  default: DEFAULT_SCALE.value,
});

export default sequencerScaleAtom;
