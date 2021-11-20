import styled from "styled-components";

export const CloseButtonWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 24px;
  top: 24px;
`;

export const ModalBackground = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const ModalContent = styled.div`
  background-color: darkgray;
  box-shadow: 4px 4px 24px #404040;
  height: 80%;
  margin: auto;
  max-width: 1200px;
  position: relative;
  width: 90%;
`;
