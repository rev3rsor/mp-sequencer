import { useContext, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as Tone from "tone";

import { ToneContext } from "~src/components/ToneContext";
import colorAtom from "~src/recoil/color";
import gridFiltersAtom from "~src/recoil/gridFilters";
import gridPointsAtom from "~src/recoil/gridPoints";
import gridSynthsAtom from "~src/recoil/gridSynths";
import movementAtom from "~src/recoil/movement";
import { withGetPitchFromPoint } from "~src/recoil/pitchMode";
import sensitivityAtom from "~/src/recoil/sensitivity";
import {
  CANVAS_WIDTH,
  GRID_POINTS,
  MAX_SEGMENTS,
  SEGMENT_TIMEOUT,
} from "~src/utils/constants";
import {
  getIndexOfGridPoint,
  getInfluence,
  getNearestGridPoint,
} from "~src/utils/gridHelpers";
import { linearToExponential, scaleVolume } from "~src/utils/volumeHelpers";
import { colorToNumber } from "~src/utils/colorHelpers";

const useGrid = () => {
  const { hasStarted, setHasStarted } = useContext(ToneContext);

  const [gridPoints, setGridPoints] = useRecoilState(gridPointsAtom);
  const [movementPoints, setMovementPoints] = useRecoilState(movementAtom);

  const sensitivity = useRecoilValue(sensitivityAtom);
  // this function is recreated on change in pitch mode, use this as a dependency
  const getPitchFromPoint = useRecoilValue(withGetPitchFromPoint);

  const color = useRecoilValue(colorAtom);

  // TODO - better way to manage shared mutable state? mutating the state directly is bad :(
  // used to enable multiple components accessing the useGrid hook - ref would break when used by a different component
  // both components need to have access to the same state, not a copy of the logic
  // const gridSynths = useRecoilValue(gridSynthsAtom);
  // const gridFilters = useRecoilValue(gridFiltersAtom);

  const gridSynths = useRef<Tone.FMSynth[][]>([]);
  const gridFilters = useRef<Tone.Filter[][]>([]);

  const addPoint = (x: number, y: number) => {
    if (typeof gridSynths.current[x] === "undefined") {
      gridSynths.current[x] = [];
      gridFilters.current[x] = [];
    }

    if (gridSynths.current[x][y] instanceof Tone.FMSynth) {
      gridSynths.current[x][y].set({
        onsilence: (instrument: Tone.FMSynth) => {
          instrument.dispose();
          delete gridSynths.current[x][y];
        },
      });

      gridSynths.current[x][y].triggerRelease();
    }

    const createSynth = () => {
      const filter = new Tone.Filter(20000, "lowpass").toDestination();

      gridFilters.current[x][y] = filter;

      gridSynths.current[x][y] = new Tone.FMSynth({
        envelope: new Tone.AmplitudeEnvelope({ release: 3 }),
        modulationIndex: (CANVAS_WIDTH - y) / GRID_POINTS,
      })
        .connect(filter)
        .triggerAttack(getPitchFromPoint(x));
    };

    if (!hasStarted) {
      Tone.start().then(() => {
        setHasStarted(true);
        createSynth();
        setGridPoints((prevPoints) => [...prevPoints, [x, y]]);
      });
    } else {
      createSynth();
      setGridPoints((prevPoints) => [...prevPoints, [x, y]]);
    }

    // fetch("./sequencer", {
    //   body: JSON.stringify({
    //     action: "add",
    //     x: getIndexOfGridPoint(x),
    //     y: getIndexOfGridPoint(y),
    //     color: colorToNumber(color),
    //   }),
    //   headers: { "Content-Type": "application/json" },
    //   method: "POST",
    // });
  };

  const removePoint = (
    x: number,
    y: number,
    matchingGridPointIndex: number
  ) => {
    gridSynths.current[x][y]?.set({
      onsilence: (instrument: Tone.FMSynth) => {
        instrument.dispose();
        delete gridSynths.current[x][y];
      },
    });

    gridSynths.current[x][y]?.triggerRelease();

    setGridPoints((prevPoints) => [
      ...prevPoints.slice(0, matchingGridPointIndex),
      ...prevPoints.slice(matchingGridPointIndex + 1),
    ]);

    // fetch("./sequencer", {
    //   body: JSON.stringify({
    //     action: "remove",
    //     x: getIndexOfGridPoint(x),
    //     y: getIndexOfGridPoint(y),
    //     color: colorToNumber(color),
    //   }),
    //   headers: { "Content-Type": "application/json" },
    //   method: "POST",
    // });
  };

  const startAllPoints = () => {
    if (!hasStarted) return;

    gridPoints.forEach(([x, y]) => {
      gridSynths.current[x][y]?.triggerAttack(getPitchFromPoint(x));
    });
  };

  const stopAllPoints = () => {
    if (!hasStarted) return;

    gridPoints.forEach(([x, y]) => {
      gridSynths.current[x][y]?.triggerRelease();
    });
  };

  /**
   * Handle mouse move near each point
   * Changes:
   * - volume
   * - filter cutoff
   */
  useEffect(() => {
    gridPoints.forEach(([x, y]) => {
      // amount that the mouse move trail is influencing the current point
      // ranges from roughly 0 to 500
      const influence = [...movementPoints].reduce(
        (total, [, [moveX, moveY]], idx, arr) =>
          total +
          getInfluence(x, y, moveX, moveY, sensitivity) *
            // more recent points weighted more
            (1 / (arr.length - idx)),
        0
      );

      gridSynths.current[x][y]?.volume.rampTo(
        scaleVolume(
          linearToExponential((influence * (sensitivity / 2 + 1)) / 500)
        )
      );

      gridFilters.current[x][y].frequency.rampTo(influence * 50, "16n");
      gridFilters.current[x][y].Q.value = (influence / 2) ** 0.25;
    });
  }, [gridPoints, movementPoints, sensitivity]);

  // update pitch of current points on pitch mode change
  useEffect(() => {
    gridPoints.forEach(([x, y]) => {
      gridSynths.current[x][y].setNote(getPitchFromPoint(x));
    });
  }, [getPitchFromPoint]);

  // returned handlers
  const addOrRemoveGridPoint = (canvasX: number, canvasY: number) => {
    const gridX = getNearestGridPoint(canvasX);
    const gridY = getNearestGridPoint(canvasY);

    const matchingGridPointIndex = gridPoints.findIndex(
      ([x, y]) => x === gridX && y === gridY
    );

    matchingGridPointIndex > -1
      ? removePoint(gridX, gridY, matchingGridPointIndex)
      : addPoint(gridX, gridY);
  };

  const addMovementPoint = (x: number, y: number) => {
    const now = Date.now();

    setMovementPoints((prevPoints) =>
      new Map(
        prevPoints.size >= MAX_SEGMENTS
          ? [...prevPoints].slice(prevPoints.size - MAX_SEGMENTS + 1)
          : prevPoints
      ).set(now, [x, y])
    );

    // remove point after segment timeout
    // only push new state if there was a point to delete
    setTimeout(() => {
      setMovementPoints((prevPoints) => {
        const newPoints = new Map(prevPoints);
        const hadPoint = newPoints.delete(now);
        return hadPoint ? newPoints : prevPoints;
      });
    }, SEGMENT_TIMEOUT);
  };

  return {
    addOrRemoveGridPoint,
    addMovementPoint,
    startAllPoints,
    stopAllPoints,
  };
};

export default useGrid;
