import { atom } from "recoil";

const settingsModalAtom = atom({
  key: "settingsModal",
  default: false,
});

export default settingsModalAtom;
