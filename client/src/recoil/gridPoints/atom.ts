import { atom } from "recoil";

export type GridPoints = [number, number][];

const gridPointsAtom = atom<GridPoints>({
  key: "gridPoints",
  default: [],
});

export default gridPointsAtom;
