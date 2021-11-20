import React from "react";

import PlayPauseButton from "./PlayPauseButton";
import SettingsButton from "./SettingsButton";
import { Container } from "./styles";
import VolumeSlider from "./VolumeSlider";

const Controls = (): React.ReactElement => {
  return (
    <Container>
      <SettingsButton />
      {/* <PlayPauseButton /> */}
      <VolumeSlider />
    </Container>
  );
};

export default Controls;
