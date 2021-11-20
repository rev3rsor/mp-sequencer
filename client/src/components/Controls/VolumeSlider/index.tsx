import React, { useEffect, useState } from "react";
import * as Tone from "tone";

import { linearToExponential, scaleVolume } from "~src/utils/volumeHelpers";

import VolumeDown from "./assets/volume-down.svg";
import VolumeOff from "./assets/volume-off.svg";
import VolumeUp from "./assets/volume-up.svg";
import { Wrapper } from "./styles";

const VolumeSlider = () => {
  const [volume, setVolume] = useState(1);
  const [prevValue, setPrevValue] = useState(volume);
  const [, setIsMuted] = useState(false);

  useEffect(() => {
    Tone.Destination.volume.rampTo(scaleVolume(linearToExponential(volume)));
  }, [volume]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const floatValue = parseFloat(evt.target.value);
    setVolume(floatValue);
    setPrevValue(floatValue);
    setIsMuted(false);
  };

  const handleIconClick = () => {
    setIsMuted((wasMuted) => {
      const nowMuted = !wasMuted;

      setVolume(nowMuted ? 0 : prevValue);

      return !wasMuted;
    });
  };

  return (
    <Wrapper>
      <div onClick={handleIconClick}>
        {volume === 0 ? (
          <VolumeOff />
        ) : volume <= 0.5 ? (
          <VolumeDown />
        ) : (
          <VolumeUp />
        )}
      </div>
      <input
        max={1}
        min={0}
        onChange={handleChange}
        step={0.04}
        type="range"
        value={volume}
      />
    </Wrapper>
  );
};

export default VolumeSlider;
