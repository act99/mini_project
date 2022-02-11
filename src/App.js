import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import styled, { ThemeProvider } from "styled-components";
import theme from "./shared/theme";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Wrap>
            <Route path="/" exact component={Home} />
          </Wrap>
        </ThemeProvider>
      </ConnectedRouter>
    </>
  );
}

const Wrap = styled.div`
  // 태블릿용, 하지만 요즘 모바일은 대부분 테블릿 용으로 맞추어도 된다.
  // flex direction 이 column 이기 때문에 justify content 로 start 해주어야 위로 간다.
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    background: blue;
    width: 100%;
    display: flex;
    justify-items: center;
    justify-content: start;
  }
  // 모바일용 가장 극단적인 상황에서 사용할 것
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    background: red;
    width: 100%;
    display: flex;
    justify-items: center;
    justify-content: start;
  }
  // PC용 웹사이트 용으로 생각하면 된다.
  width: 90%;
  height: 100vh;
  margin: auto;
  background: wheat;
  display: flex;
  align-items: flex-start;
  justify-items: center;
  justify-content: center;
`;

export default App;
