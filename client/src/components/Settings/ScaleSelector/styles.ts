import styled from "styled-components";
import { GRID_WIDTH } from "~src/utils/constants";

const BUTTON_WIDTH = GRID_WIDTH;
const GAP = 5;

const BUTTONS_IN_ROW = 7;

interface ButtonProps {
  selected: boolean;
}

export const ScaleButton = styled.button<ButtonProps>`
  background-color: ${({ selected }) => (selected ? "salmon" : "lightgrey")};
  border: 1px solid black;
  height: ${BUTTON_WIDTH}px;
  padding: 0;
  width: ${BUTTON_WIDTH}px;

  &[disabled] {
    background-color: transparent;
  }

  :hover:not([disabled]) {
    background-color: ${({ selected }) =>
      selected ? "lightsalmon" : "gainsboro"};
  }
`;

export const ScaleContainer = styled.div`
  width: min-content;
`;

export const ScaleSpacer = styled.div`
  height: ${BUTTON_WIDTH}px;
  width: ${BUTTON_WIDTH}px;
`;

export const ScaleRow = styled.div`
  display: flex;
  gap: ${GAP}px;
  justify-content: center;
  margin-bottom: ${GAP}px;
  min-width: ${BUTTON_WIDTH * BUTTONS_IN_ROW + GAP * (BUTTONS_IN_ROW - 1)}px;
`;

export const Select = styled.select`
  display: block;
  font-size: 16px;
  margin-bottom: 24px;
  padding: 6px;
`;
