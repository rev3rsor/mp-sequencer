import { selector } from "recoil";

import { calculateDistance, calculateSpeed } from "~/src/utils/gridHelpers";

import mouseMoveAtom from "./atom";

const MS_IN_SECOND = 1000;

const withLastVelocity = selector({
  key: "mouseMoveWithLastVelocity",
  get: ({ get }) => {
    const movePoints = get(mouseMoveAtom);
    if (movePoints.size < 2) return 0;

    const pointsArray = [...movePoints];
    const [lastTime, [lastX, lastY]] = pointsArray[pointsArray.length - 1];
    const [secondLastTime, [secondLastX, secondLastY]] =
      pointsArray[pointsArray.length - 2];

    // TODO - velocity and direction somehow
    // use vectors?
    // idea - vector/matrix into Max for visuals
    return calculateSpeed(
      calculateDistance(lastX, lastY, secondLastX, secondLastY),
      (lastTime - secondLastTime) / MS_IN_SECOND
    );
  },
});

export default withLastVelocity;
