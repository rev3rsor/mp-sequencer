import { useSetRecoilState } from "recoil";

import gridPointsAtom from "~src/recoil/gridPoints";

import { Button } from "./styles";

// TODO - implement button to stop all points
// needs refactoring of useGrid hook in order to enable controlling the same state
const ClearGridPointsButton = () => {
  const setGridPoints = useSetRecoilState(gridPointsAtom);

  // const { stopAllPoints } = useGrid();

  const handleClick = () => {
    setGridPoints([]);
    // stopAllPoints();
  };

  return <Button onClick={handleClick}>Clear all points</Button>;
};

export default ClearGridPointsButton;
