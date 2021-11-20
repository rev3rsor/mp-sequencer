import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import colorAtom from "~src/recoil/color";
import movementAtom from "~/src/recoil/movement";

const useMouseMoveRender = (canvasEl: HTMLCanvasElement | null) => {
  const movementPoints = useRecoilValue(movementAtom);
  const color = useRecoilValue(colorAtom);

  useEffect(() => {
    if (!canvasEl) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    if (movementPoints.size > 1) {
      [...movementPoints].forEach(([, [x, y]], idx, points) => {
        if (idx === 0) return;

        const [, [prevX, prevY]] = points[idx - 1];

        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${
          idx / movementPoints.size
        })`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(prevX, prevY);
        ctx.stroke();
      });
    }
  }, [canvasEl, color, movementPoints]);
};

export default useMouseMoveRender;
