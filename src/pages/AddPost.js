import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Input, makeStyles, TextareaAutosize } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Image from "../elements/Image";
import moment from "moment";
import { actionCreators as postActions } from "../redux/modules/postReducer";
import { apis } from "../shared/api";
import { actionCreators as imageActions } from "../redux/modules/imageReducer";
import axios from "axios";
import { axapis } from "../shared/formApi";

const AddPage = () => {
  const [image, setImage] = React.useState();
  const tokenCheck = document.cookie;
  const token = tokenCheck.split("=")[1];
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

  const [imageFile, setImageFile] = React.useState(null);

  const preview = useSelector((state) => state.imageReducer.preview);
  const [loadingImage, setLoadingImage] = React.useState(false);
  const fileInput = React.useRef();
  const [imageUrlLink, setImageUrlLink] = React.useState();

  const filePreview = (e) => {
    const reader = new FileReader();
    const fileee = fileInput.current.files;
    console.log(fileee);
    const file = fileInput.current.files[0];
    const previewFile = fileInput.current.files[0];
    reader.readAsDataURL(previewFile);

    reader.onloadend = () => {
      // console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
    if (file) {
      console.log("hi");
      setImageFile(file);
    }
  };
  const addImage = () => {
    let formData = new FormData();
    console.log(imageFile);
    formData.append("file", imageFile);
    axapis
      .postImage(formData)
      .then((res) => {
        console.log(res.data);
        setImageUrlLink(res.data);
        setLoadingImage(true);
        console.log("성공");
        alert("파일 업로드에 성공했습니다.");
      })
      .catch((error) => console.log(error));
    // apis
    //   .imageUpload(formData)
    //   .then((res) => setLoadingImage(true))
    //   .catch((error) => console.log(error));

    //*** */
    // console.log(formData.get("file"));
    // const api = axios.create({
    //   baseURL: "http://13.125.206.220:8080",
    //   headers: {
    //     "content-type": "application/json;charset=UTF-8",
    //     accept: "application/json",
    //     token: token,
    //   },
    // });
    // api
    //   .post(`/api/image`, formData)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let contents = {
      title: data.get("title"),
      content: data.get("desc"),
      endAt: date.toISOString().substring(0, 10),
      minimum: data.get("minimum"),
      price: data.get("price"),
      imageUrl: imageUrlLink,
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
    } else if (
      data.get("price") <= 0 ||
      data.get("price") === null ||
      data.get("price") === undefined
    ) {
      alert("금액을 입력해주세요.");
    } else if (
      data.get("minimum") <= 0 ||
      data.get("minimum") === null ||
      data.get("minimum") === undefined
    ) {
      alert("최소 후원자 수를 입력해주세요.");
    } else {
      console.log(contents);
      dispatch(postActions.addPostDB(contents));
    }
  };

  // 이미지 업로드
  // const fileInput = React.useRef(null);
  // const [upload, setUpload] = React.useState(false);
  // const selectFile = (e) => {
  //   const reader = new FileReader();
  //   const file = fileInput.current.files[0];
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     // dispatch(imageActions.setPreview(reader.result));
  //   };
  //   setUpload(true);
  // };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100%" }}
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
          variant="h4"
          sx={{ fontWeight: "bold", ml: 1, my: 6 }}
        >
          🌊 게시글 작성하기 🌊
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
        >
          프로젝트 이름을 적어주세요.
        </Typography>
        {/* <Input
          type="file"
          ref={fileInput}
          onChange={filePreview}
          accept="image/*"
        /> */}
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
          <Image
            src={preview ? preview : "https://via.placeholder.com/400x300"}
          />
        </Box>

        <Button
          variant="contained"
          component="label"
          color="error"
          sx={{ backgroundColor: "#f86453", mt: 5, mb: 10, mr: 2 }}
        >
          사진 선택하기
          <input
            type="file"
            onChange={filePreview}
            ref={fileInput}
            // disabled={is_uploading}
            hidden
            // accept="image/*"
          />
        </Button>
        <Button
          variant="contained"
          component="label"
          color="error"
          onClick={addImage}
          sx={{ backgroundColor: "#f86453", mt: 5, mb: 10 }}
        >
          사진 업로드하기
        </Button>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
        >
          물건 개당 가격을 입력해주세요.
        </Typography>
        <TextField
          type="number"
          required
          id="outlined-required"
          name="price"
          label="가격"
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
          최소 후원자 수를 입력해주세요.
        </Typography>
        <TextField
          type="number"
          required
          id="outlined-required"
          name="minimum"
          label="후원자 수"
          style={{
            width: "50%",
            // margin: "30px auto 0px auto",
            minWidth: "470px",
          }}
        />
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
