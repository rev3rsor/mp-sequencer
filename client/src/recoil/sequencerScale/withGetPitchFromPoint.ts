import { selector } from "recoil";

import { getIndexOfGridPoint } from "~src/utils/gridHelpers";
import { getScaleNoteFromGridPoint } from "~src/utils/scaleHelpers";

import movementScaleAtom from "./atom";

const withGetNoteFromPoint = selector<(point: number) => number | string>({
  key: "movementScaleWithGetNoteFromPoint",
  get: ({ get }) => {
    const scale = get(movementScaleAtom);
    if (scale.length === 0) {
      return (point: number) => point;
    }

    return (point: number) =>
      getScaleNoteFromGridPoint(getIndexOfGridPoint(point), scale);
  },
});

export default withGetNoteFromPoint;
