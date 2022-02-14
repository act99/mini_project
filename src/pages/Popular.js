import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const theme = createTheme();

export default function Popualr() {
  const [rate, setRate] = React.useState("");

  const handleChange = (event) => {
    setRate(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
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
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Card
                  onClick={() => {
                    console.log("인기 카드 클릭!");
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
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent
                    sx={{ flexGrow: 1, minHeight: "186px", paddingLeft: 0.5 }}
                  >
                    <Typography sx={{ fontWeight: "light", fontSize: 11 }}>
                      음악 | (주)뮤직파라디소
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: "bold", fontSize: 14.5, paddingTop: 1 }}
                    >
                      이누야샤 OST 앨범 재발매 프로젝트
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, paddingTop: 1, paddingBottom: 4 }}
                    >
                      그 때 그 시절 그 노래 이누야샤의 음악을 다시 만듭니다.
                    </Typography>
                    <FundingStatus>
                      <span>25%</span>
                      <span>100원</span>
                      <span>100일 남음</span>
                    </FundingStatus>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
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
