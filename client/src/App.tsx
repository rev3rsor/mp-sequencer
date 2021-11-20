import { RecoilRoot } from "recoil";
import styled from "styled-components";

import Controls from "~/src/components/Controls";
import GlobalStyle from "~/src/components/GlobalStyle";
import Sequencer from "~/src/components/Sequencer";
import ToneProvider from "~/src/components/ToneContext";
import Settings from "./components/Settings";

const Column = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 24px;
`;

const App = () => {
  return (
    <RecoilRoot>
      <ToneProvider>
        <GlobalStyle />
        <Wrapper>
          <H1>Multiplayer Sequencer</H1>
          <Container>
            <Column>
              <Sequencer />
            </Column>
            <Column>
              <Settings />
            </Column>
          </Container>
        </Wrapper>
      </ToneProvider>
    </RecoilRoot>
  );
};

export default App;
