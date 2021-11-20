import { atom } from "recoil";
import * as Tone from "tone";

const gridFiltersAtom = atom<Tone.Filter[][]>({
  key: "gridFilters",
  default: [],
});

export default gridFiltersAtom;
