import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/postReducer";
import moment from "moment";
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function New() {
  const [rate, setRate] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setRate(event.target.value);
  };
  const history = useHistory();
  React.useEffect(() => {
    dispatch(postActions.getPostDB());
  }, []);
  const _post = useSelector((state) => state.postReducer.list);
  const copy = [..._post];

  copy.sort(function (a, b) {
    return (
      ((a.buyercount * 1) / a.minimum) * 1 -
      ((b.buyercount * 1) / b.minimum) * 1
    );
  });
  // copy.sort((a, b) => a.postId - b.postId);
  let post = copy.slice();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", ml: 1, mb: 6, mt: 1 }}
          >
            👋 신규 프로젝트 👋
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120, paddingBottom: 5 }}>
            <Select
              value={rate}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>달성률</em>
              </MenuItem>
              <MenuItem value={10}>25%</MenuItem>
              <MenuItem value={20}>50%</MenuItem>
              <MenuItem value={30}>100%</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={4}>
            {post.map((item) => (
              <Grid item key={item.postId + item.title} xs={12} sm={6} md={3}>
                <Card
                  onClick={() => {
                    history.push({
                      pathname: `/detail/${item.postId}`,
                      state: { item: item },
                    });
                  }}
                  sx={{
                    height: "422px",
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: "3px solid red",
                  }}
                >
                  <CardMedia
                    sx={{ maxHeight: "50%", minHeight: "234.86px" }}
                    component="img"
                    image={item.imageUrl}
                    alt="random"
                  />
                  <CardContent
                    sx={{ flexGrow: 1, minHeight: "186px", paddingLeft: 0.5 }}
                  >
                    <Typography sx={{ fontWeight: "light", fontSize: 11 }}>
                      {item.nickname}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: "bold", fontSize: 14.5, paddingTop: 1 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, paddingTop: 1, paddingBottom: 4 }}
                    >
                      {item.content.length > 30
                        ? item.content.slice(0, 30) + "..."
                        : item.content}
                    </Typography>
                    <FundingStatus>
                      <span>
                        {" "}
                        {Math.ceil((item.buyercount / item.minimum) * 100)}%
                      </span>
                      <span>
                        {" "}
                        {(item.price * item.buyercount)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>
                      <span>
                        {moment(item.endAt).diff(item.startAt, "days")} 일
                      </span>
                    </FundingStatus>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
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
    &:nth-child(1) {
      color: red;
      font-size: 18px;
      line-height: 27px;
    }
    &:nth-child(2) {
      margin-left: 6px;
    }
    &:nth-child(3) {
      margin-left: auto;
      color: #9e9e9e;
      font-weight: bold;
    }
  }
`;
