import { atom } from "recoil";

// map has timestamps as keys and coordinates as values
export type MovementPoints = Map<number, [number, number]>;

const movementAtom = atom<MovementPoints>({
  key: "movement",
  // map where keys are timestamps and values are coordinates
  default: new Map<number, [number, number]>(),
});

export default movementAtom;
