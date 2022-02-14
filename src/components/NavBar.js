import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useHistory } from "react-router-dom";
import { getCookie } from "../shared/Cookie";
import { set } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as loginActions } from "../redux/modules/loginReducer";

const pages = ["홈", "인기", "신규"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const [isLogin, setIsLogin] = React.useState(false);
  const handleOpenNavMenu = (event) => {
    console.log(event);
    setAnchorElNav(event.currentTarget);
  };
  const user = useSelector((state) => state.loginReducer.userinfo);
  const dispatch = useDispatch();
  console.log(user);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log(event);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    if (e.target.id === "홈") {
      history.push("/");
    } else if (e.target.id === "인기") {
      history.push("/popular");
    } else if (e.target.id === "신규") {
      history.push("/new");
    } else {
      console.log(e.target.id);
    }
  };
  const logoutHandler = () => {
    dispatch(loginActions.logOutDB());
    history.push("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  React.useEffect(() => {
    if (getCookie("token")) {
      setIsLogin(true);
    }
    console.log(isLogin);
  }, []);

  return (
    <AppBar position="static" sx={{ bgcolor: "#ffffff", mb: 5 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ bgcolor: "#ffffff" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              fontFamily="-apple-system"
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 1,
                color: "#000000",
                display: { xs: "none", md: "flex" },
              }}
            >
              <div>GongGuRi</div> {/* 공구리 */}
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} id={page} onClick={handleCloseNavMenu}>
                  {" "}
                  {/* 홈 인기 신규 */}
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <div>GongGuRi</div>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                id={page}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  fontweignt: "bold",
                  fontsize: "10px",
                  my: 2,
                  color: "black",
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogin === true ? (
              <Link to="/addpost">프로젝트 올리기</Link>
            ) : null}

            {/* <Link href="/" color="#000000" sx={{ mr: 10 }}>
              프로젝트 올리기
            </Link> */}
            {isLogin === true ? (
              <Button variant="outlined" onClick={logoutHandler}>
                로그아웃
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => history.push("/signin")}
              >
                로그인 / 회원가입
              </Button>
            )}

            <Menu open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center"></Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
