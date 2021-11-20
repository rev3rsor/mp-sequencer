import { selector } from "recoil";
import { getIndexOfGridPoint } from "~src/utils/gridHelpers";
import { PitchMode } from ".";

import { withGetPitchFromPoint as sequencerScaleWithGetPitchFromPoint } from "../sequencerScale";
import pitchModeAtom from "./atom";

const FIRST_HARMONIC = 110;

const withGetPitchFromPoint = selector<(point: number) => number | string>({
  key: "pitchModeWithGetPitchFromPoint",
  get: ({ get }) => {
    const pitchMode = get(pitchModeAtom);

    if (pitchMode === PitchMode.SCALE) {
      return get(sequencerScaleWithGetPitchFromPoint);
    }

    if (pitchMode === PitchMode.HARMONICS) {
      return (point: number) =>
        (getIndexOfGridPoint(point) + 1) * FIRST_HARMONIC;
    }

    // same function as pitch mode frequency
    return (point: number) => point;
  },
});

export default withGetPitchFromPoint;
