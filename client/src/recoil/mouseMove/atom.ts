import { atom } from "recoil";

export type MouseMovePoints = Map<number, [number, number]>;

const mouseMoveAtom = atom<MouseMovePoints>({
  key: "mouseMove",
  // map where keys are timestamps and values are coordinates
  default: new Map<number, [number, number]>(),
});

export default mouseMoveAtom;
