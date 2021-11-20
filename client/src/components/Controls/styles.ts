import styled from "styled-components";

import { CANVAS_WIDTH, GRID_WIDTH } from "~/src/utils/constants";

export const Container = styled.div`
  display: flex;
  height: fit-content;
  margin: 0 auto;
  width: ${CANVAS_WIDTH + 2}px; // 1px border on both sides
`;

export const Button = styled.button`
  background-color: whitesmoke;
  border: 1px solid black;
  border-bottom: none;
  display: flex;
  height: ${GRID_WIDTH}px;
  outline: 0;
  padding: 0;
  width: ${GRID_WIDTH}px;

  :hover {
    background-color: silver;
  }

  svg {
    margin: auto;
  }
`;
