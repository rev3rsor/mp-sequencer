import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

const canvasStyles = `
  bottom: 0;
  cursor: crosshair;
  display: block;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`;

// separate canvases for different drawing
// use z-index to force on top, for mouse events
// style for top canvas
export const MouseMoveCanvas = styled.canvas`
  border: 1px solid black;
  cursor: crosshair;
  display: block;
  margin: auto;
`;

export const Overlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  cursor: crosshair;
  display: flex;
  justify-content: center;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`;

export const OverlayText = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
`;

export const SequencerCanvas = styled.canvas`
  ${canvasStyles};
`;

interface StaticCanvasProps {
  hasDarkBackground: boolean;
}

// with background
export const StaticCanvas = styled.canvas<StaticCanvasProps>`
  ${canvasStyles};
  background-color: ${(props) =>
    props.hasDarkBackground ? "#020202" : "whitesmoke"};
`;
