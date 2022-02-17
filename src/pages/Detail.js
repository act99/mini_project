import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import Image from "../elements/Image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../shared/api";
// import { actionCreators as userActions } from "../redux/modules/loginReducer";
import Comment from "../components/Comment";
import { textAlign } from "@mui/system";
export default function Detail() {
  const location = useLocation();
  const item = location.state.item;
  const user_info = useSelector((state) => state.loginReducer.userinfo);
  const user = user_info ? user_info.email : null;
  // const timeRemaining =
  const leftDays = moment(item.endAt).diff(item.startAt, "days");
  const history = useHistory();
  const onClickBuy = () => {
    apis
      .buyCount(item.postId)
      .then((res) => {
        alert("후원 처리가 완료되었습니다.");
        history.replace("/");
      })
      .catch((error) => alert("로그인 후 사용해주세요."));
  };
  React.useEffect(() => {}, []);

  //comment
  return (
    <>
      <Container>
        <br />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" component="div" sx={{ fontweight: "bold" }}>
            {item.title}
          </Typography>
          <br />
          <Typography variant="h6" component="span">
            {item.nickname}
          </Typography>
          <br />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ m: "auto" }}>
              <Image
                src={item.imageUrl}
                // style={{ maxWidth: 500, maxHeight: 375 }}
              />
              <Card sx={{ minWidth: 500, mt: 2, border: "solid 1px #C3C3C3" }}>
                <CardContent sx={{ maxWidth: 500, textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ mb: 3, textAlign: "center" }}
                  >
                    프로젝트 소개
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 10,
                textAlign: "start",
              }}
            >
              <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                🔥 펀드 진행중 🔥
              </Typography>
              <Card
                sx={{
                  minWidth: 275,
                  width: 360,
                  // border: "solid 1px #C3C3C3",
                  textAlign: "start",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    모인금액
                  </Typography>
                  {/* 바이어 리스트가 생기면 고쳐야하는 것 */}
                  <Typography variant="h4" component="div">
                    {(item.price * item.buyercount)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                    <Typography variant="h6" component="span" sx={{ ml: 1 }}>
                      {Math.ceil((item.buyercount / item.minimum) * 100)}%
                    </Typography>
                  </Typography>
                  <br />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    단가
                  </Typography>
                  {/* 바이어 리스트가 생기면 고쳐야하는 것 */}
                  <Typography variant="h4" component="div">
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </Typography>
                  <br />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    남은시간
                  </Typography>
                  <Typography variant="h4" component="div">
                    {leftDays}
                    <Typography variant="h6" component="span" sx={{ ml: 1 }}>
                      일
                    </Typography>
                  </Typography>
                  <br />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    후원자
                  </Typography>
                  <Typography variant="h4" component="div">
                    {item.buyercount}
                    <Typography variant="h6" component="span" sx={{ ml: 1 }}>
                      명
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{ minWidth: 275, width: 360, mt: 5, bgcolor: "#F1F1F5" }}
              >
                <CardContent>
                  <Typography
                    sx={{ mb: 1.5, fontweight: "20" }}
                    color="text.first"
                  >
                    펀드진행중
                  </Typography>
                  <Typography variant="body2">
                    목표 금액인{" "}
                    {(item.price * item.minimum)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원이 모여야만 결제됩니다
                    <br />
                    결제는 {item.endAt.split("-")[0]}년{" "}
                    {item.endAt.split("-")[1]}월 {item.endAt.split("-")[2]}일에
                    다함께 진행됩니다
                  </Typography>
                </CardContent>
              </Card>
              {item.username === user && user !== null ? (
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{
                    mt: 5,
                    py: 3,
                    fontSize: 20,
                    backgroundColor: "#F86453",
                  }}
                  onClick={() => {
                    history.push({
                      pathname: `/editpost/${item.postId}`,
                      state: { item: item },
                    });
                  }}
                >
                  프로젝트 수정 / 삭제하기 ✍
                </Button>
              ) : (
                <>
                  {user !== null ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={onClickBuy}
                      color="error"
                      sx={{
                        mt: 5,
                        py: 3,
                        fontSize: 20,
                        backgroundColor: "#f86453",
                      }}
                    >
                      이 프로젝트 후원하기
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      disabled
                      color="error"
                      sx={{
                        mt: 5,
                        py: 3,
                        fontSize: 20,
                        backgroundColor: "#f86453",
                      }}
                    >
                      로그인 후 사용해주십시오
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Comment postId={item.postId} />
      </Container>
    </>
  );
}
