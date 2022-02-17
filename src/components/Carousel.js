import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

function Slider(props) {
  const history = useHistory();
  let items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];
  const sliceArray = props.props.slice(0, 4);
  console.log(sliceArray);
  return (
    <Carousel>
      {sliceArray.map((item, index) => (
        <Grid
          item
          key={item.postId + item.title}
          xs={12}
          sm={6}
          md={3}
          sx={{
            width: "100%",
            minWidth: "700px",
            height: "250px",
            // display: "flex",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
              marginBottom: "-1px",
              height: "250px",
            }}
            onClick={() => {
              history.push({
                pathname: `/detail/${item.postId}`,
                state: { item: item },
              });
            }}
          >
            <CardMedia
              sx={{ maxWidth: "400px", maxHeight: "400px" }}
              component="img"
              image={item.imageUrl}
              alt="random"
            />
            <CardContent
              sx={{
                flexGrow: 1,
                maxHeight: "100px",
                paddingLeft: 0.5,
                paddingTop: "2px",
              }}
            >
              <Typography sx={{ fontWeight: "light", fontSize: 11 }}>
                {item.nickname} 님의 프로젝트
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  fontSize: 14,
                  my: 3,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  fontSize: 10,
                  my: 3,
                }}
              >
                {item.content.length > 20
                  ? item.content.slice(0, 15) + "..."
                  : item.content}
              </Typography>
              <FundingStatus>
                <span>
                  {Math.ceil((item.buyercount / item.minimum) * 100)}% 달성
                </span>
              </FundingStatus>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Carousel>
  );
}

const FundingStatus = styled.div`
  /* display: flex; */
  height: 35px;
  /* align-items: center; */
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  span {
    &:nth-of-type(1) {
      color: red;
      font-size: 18px;
      line-height: 27px;
    }
  }
`;

export default Slider;
