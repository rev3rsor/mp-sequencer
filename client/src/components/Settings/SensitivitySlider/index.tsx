import { useEffect } from "react";
import { useRecoilState } from "recoil";

import sensitivityAtom, { DEFAULT_SENSITIVITY } from "~src/recoil/sensitivity";

import { Button, Input, Wrapper } from "./styles";

const SensitivitySlider = () => {
  const [sensitivity, setSensitivity] = useRecoilState(sensitivityAtom);

  useEffect(() => {
    setSensitivity(sensitivity);
  }, [sensitivity]);

  return (
    <Wrapper>
      <label onDoubleClick={() => setSensitivity(DEFAULT_SENSITIVITY)}>
        Sensitivity
        <Input
          max={4}
          min={1}
          onChange={(evt) => setSensitivity(parseFloat(evt.target.value))}
          step={0.1}
          type="range"
          value={sensitivity}
        />
      </label>
      <Button onClick={() => setSensitivity(DEFAULT_SENSITIVITY)}>Reset</Button>
    </Wrapper>
  );
};

export default SensitivitySlider;
