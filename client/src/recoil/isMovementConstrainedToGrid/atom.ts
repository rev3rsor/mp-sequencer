import { atom } from "recoil";

const isMovementConstrainedToGridAtom = atom({
  key: "isMovementConstrainedToGrid",
  default: true,
});

export default isMovementConstrainedToGridAtom;
