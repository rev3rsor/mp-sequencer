import { atom } from "recoil";

import { chromatic } from "~src/utils/scales";

const movementScaleAtom = atom<number[]>({
  key: "movementScale",
  default: chromatic,
});

export default movementScaleAtom;
