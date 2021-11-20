import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import colorAtom from "~src/recoil/color";
import gridPointsAtom from "~/src/recoil/gridPoints";
import movementAtom from "~/src/recoil/movement";
import sensitivityAtom from "~/src/recoil/sensitivity";
import { POINT_RADIUS } from "~/src/utils/constants";
import { getInfluence } from "~/src/utils/gridHelpers";

const useSequencerRender = (sequencerCanvasEl: HTMLCanvasElement | null) => {
  const gridPoints = useRecoilValue(gridPointsAtom);
  const movementPoints = useRecoilValue(movementAtom);

  const color = useRecoilValue(colorAtom);
  const sensitivity = useRecoilValue(sensitivityAtom);

  useEffect(() => {
    if (!sequencerCanvasEl) return;

    const ctx = sequencerCanvasEl?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, sequencerCanvasEl.width, sequencerCanvasEl.height);

    ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;

    // draw points
    gridPoints.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, POINT_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
    });

    // draw proximity circle around point
    gridPoints.forEach(([x, y]) => {
      // amount that the mouse move trail is influencing the current point
      const influence = [...movementPoints].reduce(
        (total, [, [moveX, moveY]], idx, arr) =>
          total +
          getInfluence(x, y, moveX, moveY, sensitivity) *
            // more recent points weighted more
            (1 / (arr.length - idx)),
        0
      );

      ctx.beginPath();
      ctx.arc(x, y, influence, 0, 2 * Math.PI);
      ctx.stroke();
    });
  }, [color, gridPoints, movementPoints, sequencerCanvasEl]);
};

export default useSequencerRender;
