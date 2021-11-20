import { atom } from "recoil";

const sequencerPositionAtom = atom({
  key: "sequencerPosition",
  default: 0,
});

export default sequencerPositionAtom;
