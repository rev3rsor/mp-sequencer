import React from "react";
import { useRecoilState } from "recoil";

import settingsModalAtom from "~src/recoil/settingsModal";

import Close from "./assets/close.svg";
import { CloseButtonWrapper, ModalBackground, ModalContent } from "./styles";
import Settings from "../Settings";

const SettingsModal = (): React.ReactElement | null => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useRecoilState(settingsModalAtom);

  const handleClose = () => setIsSettingsModalOpen(false);

  const handleContentClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };

  return isSettingsModalOpen ? (
    <ModalBackground onClick={handleClose}>
      <ModalContent onClick={handleContentClick}>
        <CloseButtonWrapper onClick={handleClose}>
          <Close />
        </CloseButtonWrapper>
        <Settings />
      </ModalContent>
    </ModalBackground>
  ) : null;
};

export default SettingsModal;
