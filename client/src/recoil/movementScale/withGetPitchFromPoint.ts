import { selector } from "recoil";

import movementScaleAtom from "./atom";

const withGetPitchFromPoint = selector<(point: number) => number>({
  key: "movementScaleWithGetPitchFromPoint",
  get: ({ get }) => {
    const scale = get(movementScaleAtom);
    if (scale.length === 0) {
      return (point: number) => point;
    }

    return (point: number) => point;
  },
});

export default withGetPitchFromPoint;
