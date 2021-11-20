import React, { useContext, useState } from "react";
import * as Tone from "tone";

import { ToneContext } from "~/src/components/ToneContext";

import Pause from "./assets/pause.svg";
import Play from "./assets/play.svg";
import { Button } from "../styles";

const PlayPauseButton = (): React.ReactElement => {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const { setHasStarted } = useContext(ToneContext);

  const handleClick = () => {
    if (!hasBeenClicked) {
      setHasBeenClicked(true);

      Tone.start().then(() => {
        Tone.Transport.start(Tone.now());
        setHasStarted(true);
        setIsPlaying(true);
      });
    } else {
      setIsPlaying((wasPlaying) => {
        const isNowPlaying = !wasPlaying;

        if (isNowPlaying) {
          Tone.Transport.start(Tone.now());
        } else {
          Tone.Transport.pause(Tone.now());
        }

        return isNowPlaying;
      });
    }
  };

  return (
    <Button onClick={handleClick}>{isPlaying ? <Pause /> : <Play />}</Button>
  );
};

export default PlayPauseButton;
