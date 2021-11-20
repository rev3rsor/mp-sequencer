import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: gainsboro;
    font-family: Helvetica;
    height: 100%;
    margin: 0;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    height: 100%;
    margin: 0;
    padding: 24px;
    width: 100%;
  }
`;

export default GlobalStyle;
