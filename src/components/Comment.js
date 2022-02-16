import React from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../shared/api";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";
import { useHistory } from "react-router-dom";

const Comment = (props) => {
  const [text, setText] = React.useState("");
  const userinfo = useSelector((state) => state.loginReducer.userinfo);
  const comment = useSelector((state) => state.commentReducer);
  // console.log(userinfo);
  const postId = props.postId;
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.commentReducer.list);
  const history = useHistory();
  const commentChange = (event) => {
    setText(event.target.value);
  };
  const [loading, setLoading] = React.useState(false);
  const commentOnClick = () => {
    dispatch(commentActions.addCommentDB(userinfo, text, postId));
    history.go(0);
  };
  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(postId));
    if (userinfo.email === null) {
      setTimeout(setLoading(true), 500);
    } else {
      setLoading(true);
    }
  }, [loading]);
  return (
    <>
      <Container marginTop={10} maxWidth="lg">
        <Grid sx={{ padding: "0px" }}>
          <Input
            type="text"
            placeholder="최대 100자까지 댓글을 남길 수 있습니다!"
            maxlength="100"
            onChange={commentChange}
          />
          <StyleSendIcon
            onClick={commentOnClick}
            fontSize="14px"
          ></StyleSendIcon>
        </Grid>

        {comment_list.map((item, index) => {
          return (
            <>
              <Grid
                key={item.commentId + item.comment}
                container
                direction="row"
                spacing={2}
                marginTop={2}
              >
                <Grid item xs={6} md={8} sx={{ textAlign: "left" }}>
                  <Grid sx={{ padding: "10px 10px 10px 50px" }}>
                    {item.nickname}
                  </Grid>
                  <Grid sx={{ padding: "10px 10px 10px 50px" }}>
                    {item.comment}
                  </Grid>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Grid
                    container
                    sx={{
                      display: "block",
                      paddingTop: "16px",
                      paddingRight: "30px",
                    }}
                  >
                    {loading === true && userinfo.email === item.username ? (
                      <Button
                        onClick={() => {
                          dispatch(
                            commentActions.deleteCommentDB(item.commentId)
                          );
                        }}
                        size="large"
                        sx={{ fontSize: "20px", float: "right" }}
                      >
                        삭제
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Hr />
            </>
          );
        })}
      </Container>
    </>
  );
};

const Input = styled.input`
  border: none;
  background: none;
  border-bottom: solid 1.5px #f14444;
  padding: 15px;
  min-width: 85%;
  margin-right: 20px;

  &:focus {
    outline: none;
    border-bottom: 2px solid #f14444;
  }
`;

const StyleSendIcon = styled(SendIcon)`
  && {
    font-size: 2rem;
    margin-top: 10px;
    margin-left: 15px;
    color: #b3aaaa;
    &:hover {
      cursor: pointer;
      transition: transform 500ms;
      transform: translateX(3px);
      color: #f14444;
    }
  }
`;
const Hr = styled.hr`
  height: 10px;
  border: 0;
  box-shadow: 0 10px 6px -10px #bbb inset;
  width: 95%;
  margin: auto;
`;

export default Comment;
