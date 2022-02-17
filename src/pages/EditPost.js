import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const EditPost = () => {
  //** 삭제를 위한 컨트롤러 */
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //** 삭제를 위한 컨트롤러 */

  const dispatch = useDispatch();
  const location = useLocation();
  const item = location.state.item;
  // 이미지 업로드
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  //"2014-08-18T21:11:54" = > 현재꼴로 변경
  const todayDate = today
    .toISOString()
    .slice(0, today.toISOString().length - 5);
  // setState = > 현재날짜
  const [date, setDate] = React.useState(new Date(item.endAt));

  // 날짜 핸들링
  const handleDate = (event) => {
    setDate(event);
  };
  const handleDelete = () => {
    dispatch(postActions.deletePostDB(item.postId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let contents = {
      title: data.get("title"),
      content: data.get("desc"),
    };
    if (data.get("title").length < 1) {
      alert("프로젝트 이름을 적어주세요");
    } else if (data.get("desc").length < 11) {
      alert("소개글을 최소 10자 이상 적어주세요.");
    } else {
      dispatch(postActions.editPostDB(location.state.item.postId, contents));
    }
  };

  // 이미지 업로드
  const fileInput = React.useRef(null);
  const [upload, setUpload] = React.useState(false);
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // dispatch(imageActions.setPreview(reader.result));
    };
    setUpload(true);
  };

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
          ✍ 게시글 수정하기 ✍
        </Typography>
        <Box sx={{ border: "solid 1px red" }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: "bold",
              // ml: 1,
              my: 1,

              display: "block",
              mx: "auto",
            }}
          >
            ⛔경고 게시물 삭제⛔
          </Typography>
          <Typography variant="subtitle2" sx={{}}>
            한 번 삭제된 게시물은 더 이상 확인하실 수 없습니다.
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            color="error"
            sx={{
              color: "white",
              border: "solid 1px red",
              borderRadius: "10px",
              backgroundColor: "#ff444b",
              width: "80%",
              // minWidth: "300px",
              padding: "10px",
              my: 2,
              display: "block",
              mx: "auto",
            }}
          >
            ⛔게시물 삭제하기⛔
          </Button>
        </Box>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" sx={{ color: "red" }}>
            ⛔게시물 삭제⛔
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              삭제한 게시물은 더 이상 보실 수 없습니다.
            </DialogContentText>
            <DialogContentText>정말 삭제하시겠습니까?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              취소
            </Button>
            <Button onClick={handleDelete} autoFocus sx={{ color: "red" }}>
              삭제
            </Button>
          </DialogActions>
        </Dialog>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
        >
          프로젝트 이름을 적어주세요.
        </Typography>
        <TextField
          defaultValue={item.title}
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
          선택하신 날짜
        </Typography>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <MobileDatePicker
            label="종료 날짜"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handleDate}
            disabled
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
        >
          선택하신 사진
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 500, minHeight: 375 }}>
          <Image src={item.imageUrl} />
        </Box>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
        >
          선택하신 물건 가격
        </Typography>
        <TextField
          defaultValue={item.price}
          type="number"
          required
          id="outlined-required"
          name="price"
          label="가격"
          disabled
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
          선택하신 후원자 수
        </Typography>
        <TextField
          defaultValue={item.minimum}
          type="number"
          required
          disabled
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
          defaultValue={item.content}
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

export default EditPost;
