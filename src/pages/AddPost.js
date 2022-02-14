import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { makeStyles, TextareaAutosize } from "@mui/material";
const AddPage = () => {
  const dispatch = useDispatch();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  //"2014-08-18T21:11:54" = > 현재꼴로 변경
  const todayDate = today
    .toISOString()
    .slice(0, today.toISOString().length - 5);
  // setState = > 현재날짜
  const [date, setDate] = React.useState(new Date(todayDate));

  // 날짜 핸들링
  const handleDate = (event) => {
    console.log(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("title"), data.get("desc"));
    // eslint-disable-next-line no-console
    // if (data.get("email") === "") {
    //   alert("아이디가 공란입니다.");
    // } else if (data.get("password") === "") {
    //   alert("비밀번호가 공란입니다.");
    // } else if (data.get("nickname") === "") {
    //   alert("닉네임이 공란입니다.");
    // } else if (data.get("password") !== data.get("checkPassword")) {
    //   alert("비밀번호가 일치하지 않습니다.");
    // } else {
    //   console.log({
    //     email: data.get("email"),
    //     nickname: data.get("nickname"),
    //     password: data.get("password"),
    //     checkPassword: data.get("checkPassword"),
    //   });
    // }
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "92.7vh" }}
      justifyContent="center"
    >
      <CssBaseline />
      {/* 폼 형식으로 진행할 예정 */}
      <Box
        component="form"
        sx={{ width: "100%", maxWidth: 500 }}
        onSubmit={handleSubmit}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
        >
          프로젝트 이름을 적어주세요.
        </Typography>
        <TextField
          required
          id="outlined-required"
          name="title"
          label="프로젝트 이름"
          style={{
            width: "50%",
            // margin: "30px auto 0px auto",
            minWidth: "470px",
          }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
        >
          날짜를 선택해주세요.
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, mt: 3, mb: 1 }}
        >
          프로젝트를 간단하게 소개해주세요.
        </Typography>
        <Typography variant="subtitle2" sx={{ ml: 1 }}>
          나중에 수정 가능하니 편하게 적어주세요.
        </Typography>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          name="desc"
          placeholder="공동구매 프로젝트 요약을 입력해주세요."
          style={{
            border: "solid 1px",
            borderRadius: "5px",
            width: "50%",
            resize: "none",
            margin: "30px auto 0px auto",
            minWidth: "470px",
            padding: "10px",
            height: "150px",
          }}
        />
        <Box sx={{ width: "100%", height: "1px" }}></Box>
        <Typography variant="caption" sx={{ ml: 1 }}>
          최소 10자 이상 입력해주세요.
        </Typography>
        <Button
          type="submit"
          fullWidth
          color="error"
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "#f86453", py: 1.5 }}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{ fontWeight: "bold", ml: 1 }}
          >
            작성하기
          </Typography>
        </Button>
      </Box>
    </Grid>
  );
};

export default AddPage;
