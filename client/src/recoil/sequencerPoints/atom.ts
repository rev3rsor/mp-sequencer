import { atom } from "recoil";

export type SequencerPoints = [number, number][];

export const SEQUENCER_POINTS_SESSION_KEY = "sequencerPoints";

const sequencerPointsAtom = atom<SequencerPoints>({
  key: "sequencerPoints",
  default: JSON.parse(
    sessionStorage.getItem(SEQUENCER_POINTS_SESSION_KEY) || "[]"
  ),
});

export default sequencerPointsAtom;
