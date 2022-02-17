import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import styled from "@emotion/styled";
import theme from "./shared/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import NavBar from "./components/NavBar";
import AddPost from "./pages/AddPost";
import Popular from "./pages/Popular";
import EditPost from "./pages/EditPost";
import New from "./pages/New";
import { actionCreators as loginActions } from "./redux/modules/loginReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (document.cookie) dispatch(loginActions.loginCheckDB());
  }, []);

  return (
    <>
      <ConnectedRouter history={history}>
        {/* <CssBaseline /> */}
        <NavBar />
        <Container maxWidth="xl">
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/popular" exact component={Popular} />
          <Route path="/addpost" exact component={AddPost} />
          <Route path="/editpost/:id" exact component={EditPost} />
          <Route path="/detail/:id" exact component={Detail} />
          <Route path="/new" exact component={New} />
        </Container>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Gongguri
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            항해99 미니프로젝트
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ConnectedRouter>
    </>
  );
}

function Copyright() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/act99/mini_project">
          Frontend
        </Link>

        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}

        <Link
          color="inherit"
          href="https://github.com/hyeonjh/gongguri_backend"
        >
          Back end
        </Link>
        {new Date().getFullYear()}
        {"."}
      </Typography>
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
