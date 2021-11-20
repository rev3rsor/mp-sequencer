import { selector } from "recoil";

import { getPerceivedBrightness } from "~src/utils/colorHelpers";

import colorAtom from "./atom";

const withIsLight = selector({
  key: "colorWithIsLight",
  get: ({ get }) => {
    const color = get(colorAtom);

    return getPerceivedBrightness(color) > 127.5;
  },
});

export default withIsLight;
