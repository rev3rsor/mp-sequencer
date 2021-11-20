import React from "react";
import { useRecoilState } from "recoil";

import pitchModeAtom, { PitchMode, pitchModes } from "~src/recoil/pitchMode";
import camelCaseToSentence from "~src/utils/camelCaseToSentence";

import { Select } from "./styles";

const PitchModeSelector = () => {
  const [pitchMode, setPitchMode] = useRecoilState(pitchModeAtom);

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setPitchMode(evt.target.value as PitchMode);
  };

  return (
    <div>
      <Select name="pitchMode" onChange={handleChange} value={pitchMode}>
        {pitchModes.map((pitchModeName) => (
          <option key={pitchModeName} value={pitchModeName}>
            {camelCaseToSentence(pitchModeName)}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default PitchModeSelector;
