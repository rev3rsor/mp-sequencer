import styled from "styled-components";

export const Column = styled.div`
  display: flex;
  flex: 1 0 50%;
  flex-direction: column;
  justify-content: start;

  hr {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  padding: 0 48px;
`;

export const H3 = styled.h3`
  margin: 12px 0;
`;

export const IFrame = styled.iframe`
  margin-top: 12px;
`;

export const VideoText = styled.div`
  margin-top: auto;
`;

export const VolumeWrapper = styled.div`
  display: flex;
`;
