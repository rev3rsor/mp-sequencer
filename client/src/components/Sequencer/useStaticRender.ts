import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { withIsLight } from "~src/recoil/color";
import sequencerPositionAtom from "~/src/recoil/sequencerPosition";
import { CANVAS_WIDTH, GRID_POINTS, GRID_WIDTH } from "~/src/utils/constants";

const useStaticRender = (staticCanvasEl: HTMLCanvasElement | null) => {
  const sequencerPosition = useRecoilValue(sequencerPositionAtom);

  const isLight = useRecoilValue(withIsLight);

  useEffect(() => {
    if (!staticCanvasEl) return;

    const ctx = staticCanvasEl.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, staticCanvasEl.width, staticCanvasEl.height);

    [...Array(GRID_POINTS)].forEach((useless, idx) => {
      const position = (idx + 1 / 2) * GRID_WIDTH;

      ctx.strokeStyle = isLight
        ? `rgba(255, 255, 255, 0.2)`
        : `rgba(0, 0, 0, 0.1)`;

      // horizontal grid line
      ctx.beginPath();
      ctx.moveTo(0, position);
      ctx.lineTo(CANVAS_WIDTH, position);
      ctx.stroke();

      // vertical grid line
      ctx.beginPath();
      ctx.moveTo(position, 0);
      ctx.lineTo(position, CANVAS_WIDTH);
      ctx.stroke();
    });
  }, [isLight, sequencerPosition, staticCanvasEl]);
};

export default useStaticRender;
