import { atom } from "recoil";

export const DEFAULT_SENSITIVITY = 2;

/** Sensitivity of moving the mouse to grid points. Range from 1 to 4, defaults to 2. */
const sensitivityAtom = atom({
  key: "sensitivity",
  default: DEFAULT_SENSITIVITY,
});

export default sensitivityAtom;
