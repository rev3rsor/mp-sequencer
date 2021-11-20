import { useSetRecoilState } from "recoil";

import settingsModalAtom from "~src/recoil/settingsModal";

import { Button } from "../styles";
import Settings from "./assets/settings.svg";

const SettingsButton = () => {
  const setIsSettingsModalOpen = useSetRecoilState(settingsModalAtom);

  const handleClick = () => setIsSettingsModalOpen((wasOpen) => !wasOpen);

  return (
    <Button onClick={handleClick}>
      <Settings />
    </Button>
  );
};

export default SettingsButton;
