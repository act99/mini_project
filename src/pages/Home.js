import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { actionCreators as postActions } from "../redux/modules/postReducer";
import Slider from "../components/Carousel";
import { useHistory } from "react-router-dom";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));
const theme = createTheme();
const cards = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Home() {
  const post = useSelector((state) => state.postReducer.list);
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    dispatch(postActions.getPostDB());
  }, []);
  const _post = useSelector((state) => state.postReducer.list);
  const newCopy = [..._post];

  newCopy.sort(function (a, b) {
    return (
      ((a.buyercount * 1) / a.minimum) * 1 -
      ((b.buyercount * 1) / b.minimum) * 1
    );
  });
  // newCopy.sort((a, b) => a.postId - b.postId);
  let newPost = newCopy.slice(0, 8);
  const popularCopy = [..._post];
  popularCopy.sort(function (a, b) {
    return (
      ((b.buyercount * 1) / b.minimum) * 1 -
      ((a.buyercount * 1) / a.minimum) * 1
    );
  });
  // popularCopy.sort((a, b) => a.postId - b.postId);
  let popularPost = popularCopy.slice(0, 8);
  return (
    <ThemeProvider theme={theme}>
      <Box></Box>
      <CssBaseline />
      <Container sx={{ py: 8, flexGrow: 0 }} maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={6} md={8}>
            {/* <Example /> */}
            {/* <Item
              sx={{ maXwidth: "770px", minWidth: "200px", height: "260px" }}
            >
              슬라이드
            </Item> */}
            {/* ...............................................start신규공동구매........................................ */}
            <Slider props={popularPost} />
            <Item
              sx={{
                maXwidth: "770px",
                minWidth: "200px",
                height: "700px",
                marginTop: "50px",
              }}
            >
              <Box
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: "29px",
                  letterSpacing: "-0.025em",
                  marginBottom: "20px",
                }}
              >
                신규 공동구매
              </Box>
              <Grid container spacing={2}>
                {newPost.map((item, index) => (
                  <Grid
                    item
                    key={item.postId + item.title}
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{
                      minWidth: "180px",

                      cursor: "pointer",
                    }}
                  >
                    <Card
                      sx={{
                        height: "px",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        marginBottom: "25px",
                      }}
                      onClick={() => {
                        history.push({
                          pathname: `/detail/${item.postId}`,
                          state: { item: item },
                        });
                      }}
                    >
                      <CardMedia
                        sx={{ maxHeight: "150px", minHeight: "150px" }}
                        component="img"
                        image={item.imageUrl}
                        alt="random"
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          minHeight: "130px",
                          maxHeight: "100px",
                          paddingLeft: 0.5,
                        }}
                      >
                        <Typography sx={{ fontWeight: "light", fontSize: 11 }}>
                          {item.nickname}
                          {/* {item.username.split("@")[0]} */}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: 14.5,
                            paddingTop: 1,
                          }}
                        >
                          {item.title}
                          <FundingStatus>
                            <span>
                              {Math.ceil(
                                (item.buyercount / item.minimum) * 100
                              )}
                              % 달성
                            </span>
                          </FundingStatus>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Item>
            <Item
              sx={{
                maXwidth: "770px",
                minWidth: "200px",
                height: "700px",
                marginTop: "50px",
              }}
            >
              <Box
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: "29px",
                  letterSpacing: "-0.025em",
                  marginBottom: "20px",
                }}
              >
                인기 공동구매
              </Box>
              <Grid container spacing={2}>
                {popularPost.map((item, index) => (
                  <Grid
                    item
                    key={item.postId + item.title}
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{
                      minWidth: "180px",

                      cursor: "pointer",
                    }}
                  >
                    <Card
                      sx={{
                        height: "px",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        marginBottom: "25px",
                      }}
                      onClick={() => {
                        history.push({
                          pathname: `/detail/${item.postId}`,
                          state: { item: item },
                        });
                      }}
                    >
                      <CardMedia
                        sx={{ maxHeight: "150px", minHeight: "150px" }}
                        component="img"
                        image={item.imageUrl}
                        alt="random"
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          minHeight: "130px",
                          maxHeight: "100px",
                          paddingLeft: 0.5,
                        }}
                      >
                        <Typography sx={{ fontWeight: "light", fontSize: 11 }}>
                          {item.nickname}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: 14.5,
                            paddingTop: 1,
                          }}
                        >
                          {item.title}
                          <FundingStatus>
                            <span>
                              {Math.ceil(
                                (item.buyercount / item.minimum) * 100
                              )}
                              % 달성
                            </span>
                          </FundingStatus>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Item>
          </Grid>
          {/* ...............................................end신규 공동구매.......................................... */}
          {/* ...............................................start인기 공동구매........................................ */}
          <Grid item xs={6} md={4}>
            <Item
              sx={{
                maxWidth: "340px",
                minWidth: "200px",
                height: " 1010px",
              }}
            >
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      lineHeight: "29px",
                      letterSpacing: "-0.025em",
                      marginBottom: "20px",
                    }}
                  >
                    인기 공동구매
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "24px",
                      letterSpacing: "-0.015em",
                      right: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      history.push("/popular");
                    }}
                  >
                    전체보기
                  </span>
                </Box>

                <Grid container spacing={2}>
                  {popularPost.map((item, index) => (
                    <Grid
                      item
                      key={item.postId + item.title}
                      xs={12}
                      sm={6}
                      md={3}
                      sx={{
                        minWidth: "320px",
                        display: "flex",
                        cursor: "pointer",
                      }}
                    >
                      <Card
                        sx={{
                          height: "px",
                          display: "flex",
                          flexDirection: "row",
                          cursor: "pointer",
                          marginBottom: "-1px",
                        }}
                        onClick={() => {
                          history.push({
                            pathname: `/detail/${item.postId}`,
                            state: { item: item },
                          });
                        }}
                      >
                        <CardMedia
                          sx={{ maxWidth: "100px", maxHeight: "100px" }}
                          component="img"
                          image={item.imageUrl}
                          alt="random"
                        />
                        <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            paddingTop: "2px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "red",
                          }}
                        >
                          {index + 1}
                        </CardContent>
                        <CardContent
                          sx={{
                            flexGrow: 1,
                            maxHeight: "100px",
                            paddingLeft: 0.5,
                            paddingTop: "2px",
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: "light", fontSize: 11 }}
                          >
                            {item.nickname}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            sx={{
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                          >
                            {item.title}
                            <FundingStatus>
                              <span>
                                {Math.ceil(
                                  (item.buyercount / item.minimum) * 100
                                )}
                                % 달성
                              </span>
                            </FundingStatus>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Item>
          </Grid>
          {/* ...............................................end인기공동구매........................................ */}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

const FundingStatus = styled.div`
  display: flex;
  height: 35px;
  align-items: flex-end;
  font-size: 14px;
  line-height: 24px;
  span {
    &:nth-of-type(1) {
      color: red;
      font-size: 18px;
      line-height: 27px;
    }
  }
`;

// const Wrap = styled.div`
//   width: 60%;
//   margin-top: 5%;

//   h3 {
//     margin-block-start: 0em;
//     margin-block-end: 0em;
//   }
// `;
