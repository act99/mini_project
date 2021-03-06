import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as loginActions } from "../redux/modules/loginReducer";

const pages = ["π ν", "π₯μΈκΈ°", "πμ κ·"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLogin = useSelector((state) => state.loginReducer.token);
  const history = useHistory();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const user = useSelector((state) => state.loginReducer.userinfo);
  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  React.useEffect(() => {}, [isLogin]);

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    if (e.target.id === "π ν") {
      history.push("/");
    } else if (e.target.id === "π₯μΈκΈ°") {
      history.push("/popular");
    } else if (e.target.id === "πμ κ·") {
      history.push("/new");
    } else {
    }
  };
  const logoutHandler = () => {
    dispatch(loginActions.logOutDB());
    // setIsLogin(false);
    history.push("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#ffffff", mb: 5 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ bgcolor: "#ffffff" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              fontFamily="-apple-system"
              variant="h6"
              fontWeight="800"
              noWrap
              component="div"
              sx={{
                mr: 1,
                color: "#000000",
                display: { xs: "flex", md: "flex" },
              }}
            >
              <div>GongGuRi</div> {/* κ³΅κ΅¬λ¦¬ */}
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
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
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
            {isLogin ? (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    mr: 3,
                    fontWeight: "bold",
                    border: "solid 2px #ff444b",
                    color: "#ff444b",
                  }}
                  onClick={() => history.push("/addpost")}
                >
                  κ²μκΈ μμ±β
                </Button>
              </>
            ) : null}

            {/* <Link href="/" color="#000000" sx={{ mr: 10 }}>
              νλ‘μ νΈ μ¬λ¦¬κΈ°
            </Link> */}
            {isLogin ? (
              <Button
                variant="outlined"
                onClick={logoutHandler}
                color="error"
                sx={{
                  mr: 3,
                  fontWeight: "bold",
                  border: "solid 2px #ff444b",
                  color: "#ff444b",
                }}
              >
                λ‘κ·Έμμ
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => history.push("/signin")}
                color="error"
                sx={{
                  mr: 3,
                  fontWeight: "bold",
                  border: "solid 2px #ff444b",
                  color: "#ff444b",
                }}
              >
                λ‘κ·ΈμΈ / νμκ°μ
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
