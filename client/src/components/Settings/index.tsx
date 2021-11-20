import VolumeSlider from "../Controls/VolumeSlider";
import IsMovementConstrainedToGridCheckbox from "./IsMovementConstrainedToGridCheckbox";
import PitchModeSelector from "./PitchModeSelector";
import ScaleSelector from "./ScaleSelector";
import SensitivitySlider from "./SensitivitySlider";
import { Column, Container, H3, IFrame, VideoText } from "./styles";

const Settings = () => {
  return (
    <Container>
      <Column>
        <h2>Settings</h2>
        <VolumeSlider />
        <IsMovementConstrainedToGridCheckbox />
        <hr />
        <H3>Grid</H3>
        <SensitivitySlider />
        <H3>Pitch</H3>
        <h4>Mode</h4>
        <PitchModeSelector />
        <h4>Scale</h4>
        <ScaleSelector />
        <hr />
        <br />
        <VideoText>
          The live portion has ended, but you can rewatch it here:
        </VideoText>
        <IFrame
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          height="315"
          src="https://www.youtube.com/embed/P8AHGatzSnI"
          title="YouTube video player"
          width="560"
        />
      </Column>
    </Container>
  );
};

export default Settings;
