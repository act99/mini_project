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
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Image from "../elements/Image";
import moment from "moment";
import { actionCreators as postActions } from "../redux/modules/postReducer";
const AddPage = () => {
  const dispatch = useDispatch();
  // 이미지 업로드
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
    setDate(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(date.toISOString().substring(0, 10).slice(8, 10) * 1);
    console.log(data.get("title"), data.get("desc"));
    let contents = {
      title: data.get("title"),
      content: data.get("desc"),
      endAt: date.toISOString().substring(0, 10),
    };
    if (data.get("title").length < 1) {
      alert("프로젝트 이름을 적어주세요");
    } else if (data.get("desc").length < 11) {
      alert("소개글을 최소 10자 이상 적어주세요.");
    } else if (
      date.toISOString().substring(0, 10).slice(0, 4) * 1 <
        moment().format("YYYY-MM-DD").slice(0, 4) * 1 ||
      date.toISOString().substring(0, 10).slice(5, 7) * 1 <
        moment().format("YYYY-MM-DD").slice(5, 7) * 1 ||
      date.toISOString().substring(0, 10).slice(8, 10) * 1 <=
        moment().format("YYYY-MM-DD").slice(8, 10) * 1
    ) {
      alert("현재 날짜보다 미래의 날짜를 정해주세요.");
    } else {
      console.log("Okay!");
      dispatch(postActions.addPostDB(contents));
    }
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

  // 이미지 업로드
  const fileInput = React.useRef(null);
  const [upload, setUpload] = React.useState(false);
  const selectFile = (e) => {
    console.log(e.target.files);
    console.log(fileInput.current.files[0]);
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      // dispatch(imageActions.setPreview(reader.result));
    };
    setUpload(true);
  };

  console.log(date);
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
          모금을 종료하실 날짜를 선택해주세요.
        </Typography>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <MobileDatePicker
            label="종료 날짜"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
        >
          이미지를 선택해주세요.
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 500, minHeight: 375 }}>
          <Image />
        </Box>

        <Button
          variant="contained"
          component="label"
          color="error"
          sx={{ backgroundColor: "#f86453", mt: 5, mb: 10 }}
        >
          Upload File
          <input
            type="file"
            onChange={selectFile}
            ref={fileInput}
            // disabled={is_uploading}
            hidden
          />
        </Button>
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
