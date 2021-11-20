import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import isMovementConstrainedToGridAtom from "~src/recoil/isMovementConstrainedToGrid";
import camelCaseToSentence from "~src/utils/camelCaseToSentence";

import { Input, Label, Wrapper } from "./styles";

const IsMovementConstrainedToGridCheckbox = () => {
  const [isMovementConstrainedToGrid, setIsMovementConstrainedToGrid] =
    useRecoilState(isMovementConstrainedToGridAtom);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIsMovementConstrainedToGrid(evt.target.checked);
  };

  return (
    <Wrapper>
      <Label>
        <Input
          checked={isMovementConstrainedToGrid}
          name="pitchMode"
          onChange={handleChange}
          type="checkbox"
        />
        Stop notes when mouse leaves grid
      </Label>
    </Wrapper>
  );
};

export default IsMovementConstrainedToGridCheckbox;
