import { calculateDistance, calculateSpeed } from "~/src/utils/gridHelpers";
import { selector } from "recoil";

import mouseMoveAtom from "./atom";

const MS_IN_SECOND = 1000;

const withAverageVelocity = selector({
  key: "mouseMoveWithAverageVelocity",
  get: ({ get }) => {
    const movePoints = get(mouseMoveAtom);
    if (movePoints.size < 2) return 0;

    const velocities = [...movePoints].flatMap(
      ([thisTime, [thisX, thisY]], idx, arr) => {
        if (idx === 0) return [];

        const [prevTime, [prevX, prevY]] = arr[idx - 1];

        return calculateSpeed(
          calculateDistance(thisX, thisY, prevX, prevY),
          (thisTime - prevTime) / MS_IN_SECOND
        );
      }
    );

    return velocities.reduce((sum, vel) => sum + vel, 0) / velocities.length;
  },
});

export default withAverageVelocity;
