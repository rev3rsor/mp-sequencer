import React, { useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { ToneContext } from "~src/components/ToneContext";
import colorAtom, { Color } from "~src/recoil/color";
import isMovementConstrainedToGridAtom from "~src/recoil/isMovementConstrainedToGrid";
import { CANVAS_WIDTH } from "~/src/utils/constants";

import {
  Container,
  MouseMoveCanvas,
  Overlay,
  OverlayText,
  SequencerCanvas,
  StaticCanvas,
} from "./styles";
import useGrid from "./useGrid";
import useMouseMoveRender from "./useMouseMoveRender";
import useSequencerRender from "./useSequencerRender";
import useStaticRender from "./useStaticRender";
import { withIsLight } from "~src/recoil/color";

const getRelativePoint = (
  evt: React.MouseEvent | MouseEvent | Touch,
  rect: DOMRect
): [number, number] => [evt.clientX - rect.left, evt.clientY - rect.top];

const Sequencer = (): React.ReactElement => {
  const { hasStarted } = useContext(ToneContext);

  // master canvas - captures event listeners
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  // other canvas elements
  const [sequencerCanvasEl, setSequencerCanvasEl] =
    useState<HTMLCanvasElement | null>(null);
  const [staticCanvasEl, setStaticCanvasEl] =
    useState<HTMLCanvasElement | null>(null);

  const isMovementConstrainedToGrid = useRecoilValue(
    isMovementConstrainedToGridAtom
  );

  const hasDarkBackground = useRecoilValue(withIsLight);

  // update client rect when canvas ref updated
  useEffect(() => {
    if (!canvasEl) return undefined;

    const resetCanvasRect = () =>
      setCanvasRect(canvasEl.getBoundingClientRect());

    // automatically set whenever canvasEl is recognised
    resetCanvasRect();

    document.addEventListener("scroll", resetCanvasRect);

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(resetCanvasRect);
    });

    const rootElement = document.getElementById("root") as HTMLElement;
    resizeObserver.observe(rootElement);

    return () => {
      document.removeEventListener("scroll", resetCanvasRect);
      resizeObserver.unobserve(rootElement);
    };
  }, [canvasEl]);

  // hooks
  const {
    addMovementPoint,
    addOrRemoveGridPoint,
    startAllPoints,
    stopAllPoints,
  } = useGrid();

  useMouseMoveRender(canvasEl);
  useSequencerRender(sequencerCanvasEl);
  useStaticRender(staticCanvasEl);

  const handleClick = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasEl || !canvasRect) return;
    addOrRemoveGridPoint(...getRelativePoint(evt, canvasRect));
  };

  const handleMouseMove = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasEl || !canvasRect) return;
    addMovementPoint(...getRelativePoint(evt, canvasRect));
  };

  useEffect(() => {
    if (isMovementConstrainedToGrid) {
      stopAllPoints();
      return undefined;
    }

    startAllPoints();

    const handleWindowMouseMove = (evt: MouseEvent) => {
      if (!canvasEl || !canvasRect) return;
      addMovementPoint(...getRelativePoint(evt, canvasRect));
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [canvasEl, canvasRect, isMovementConstrainedToGrid]);

  return (
    <Container>
      <StaticCanvas
        hasDarkBackground={hasDarkBackground}
        height={CANVAS_WIDTH}
        ref={setStaticCanvasEl}
        width={CANVAS_WIDTH}
      />
      <SequencerCanvas
        height={CANVAS_WIDTH}
        ref={setSequencerCanvasEl}
        width={CANVAS_WIDTH}
      />
      <MouseMoveCanvas
        height={CANVAS_WIDTH}
        onClick={handleClick}
        onMouseEnter={isMovementConstrainedToGrid ? startAllPoints : undefined}
        onMouseMove={isMovementConstrainedToGrid ? handleMouseMove : undefined}
        onMouseLeave={isMovementConstrainedToGrid ? stopAllPoints : undefined}
        ref={setCanvasEl}
        width={CANVAS_WIDTH}
      />
      {hasStarted ? null : (
        <Overlay>
          <OverlayText>
            Click anywhere to begin!
            <br />
            Headphones/speakers recommended.
            <br />
            <br />
            Unfortunately, no touch support yet.
          </OverlayText>
        </Overlay>
      )}
    </Container>
  );
};

export default Sequencer;
