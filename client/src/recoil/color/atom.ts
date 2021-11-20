import { atom } from "recoil";

export type Color = {
  r: number;
  g: number;
  b: number;
};

const colorAtom = atom({
  key: "color",
  default: {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  },
});

export default colorAtom;
