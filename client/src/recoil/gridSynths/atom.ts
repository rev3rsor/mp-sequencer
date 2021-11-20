import { atom } from "recoil";
import * as Tone from "tone";

const gridSynthsAtom = atom<Tone.FMSynth[][]>({
  key: "gridSynths",
  default: [],
});

export default gridSynthsAtom;
