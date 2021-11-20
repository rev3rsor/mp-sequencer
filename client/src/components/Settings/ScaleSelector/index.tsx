import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import pitchModeAtom, { PitchMode } from "~src/recoil/pitchMode";
import sequencerScaleAtom from "~src/recoil/sequencerScale";
import sequencerScaleNameAtom, {
  CUSTOM_SCALE_VALUE,
} from "~src/recoil/sequencerScaleName";
import camelCaseToSentence from "~src/utils/camelCaseToSentence";
import scales from "~src/utils/scales";

import {
  ScaleButton,
  ScaleContainer,
  ScaleRow,
  ScaleSpacer,
  Select,
} from "./styles";

const ScaleSelector = (): React.ReactElement => {
  const pitchMode = useRecoilValue(pitchModeAtom);

  const [scale, setScale] = useRecoilState(sequencerScaleAtom);
  const [selectedScale, setSelectedScale] = useRecoilState(
    sequencerScaleNameAtom
  );

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const scaleName = evt.target.value as
      | keyof typeof scales.scales
      | keyof typeof scales.chords;

    setSelectedScale(scaleName);

    if (evt.target.value !== CUSTOM_SCALE_VALUE) {
      setScale(
        scales.scales[scaleName as keyof typeof scales.scales] ??
          scales.chords[scaleName as keyof typeof scales.chords]
      );
    }
  };

  const handleScaleButtonClick = (scaleIndex: number) => {
    setSelectedScale(CUSTOM_SCALE_VALUE);

    setScale((prevScale) => {
      const foundIndex = prevScale.findIndex((val) => val === scaleIndex);
      return foundIndex > -1
        ? [
            ...prevScale.slice(0, foundIndex),
            ...prevScale.slice(foundIndex + 1),
          ]
        : [...prevScale, scaleIndex].sort((a, b) => a - b);
    });
  };

  const createScaleButton = (scaleIndex: number) => {
    return (
      <ScaleButton
        disabled={pitchMode !== PitchMode.SCALE}
        key={scaleIndex}
        name={String(scaleIndex)}
        onClick={() => handleScaleButtonClick(scaleIndex)}
        selected={scale.includes(scaleIndex)}
      />
    );
  };

  return (
    <div>
      <Select
        disabled={pitchMode !== PitchMode.SCALE}
        name="sequencerScale"
        onChange={handleChange}
        value={selectedScale}
      >
        {Object.entries(scales).map(([groupName, scalesInGroup]) => (
          <optgroup key={groupName} label={camelCaseToSentence(groupName)}>
            {Object.keys(scalesInGroup).map((scaleName) => (
              <option key={scaleName} value={`${scaleName}`}>
                {camelCaseToSentence(scaleName)}
              </option>
            ))}
          </optgroup>
        ))}
        <optgroup label="Custom">
          <option value={CUSTOM_SCALE_VALUE}>Custom</option>
        </optgroup>
      </Select>
      <ScaleContainer>
        <ScaleRow>
          {/* Black keys with space between */}
          {[1, 3].map(createScaleButton)}
          <ScaleSpacer />
          {[6, 8, 10].map(createScaleButton)}
        </ScaleRow>
        <ScaleRow>
          {/* White keys */}
          {[0, 2, 4, 5, 7, 9, 11].map(createScaleButton)}
        </ScaleRow>
      </ScaleContainer>
    </div>
  );
};

export default ScaleSelector;
