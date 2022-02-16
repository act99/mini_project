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
      <Grid container direction="row" marginTop={10} sx={{ width: "1200px" }}>
        <Input
          type="text"
          placeholder="최대 100자까지 댓글을 남길 수 있습니다!"
          maxlength="100"
          onChange={commentChange}
        />
        <StyleSendIcon onClick={commentOnClick} fontSize="14px"></StyleSendIcon>
      </Grid>
      {comment_list.map((item, index) => {
        return (
          <Grid
            key={item.commentId + item.comment}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop={10}
            sx={{ width: "100", border: "2px solid #f14444 " }}
          >
            <Grid>
              <Text>{item.nickname}</Text>
            </Grid>
            <Grid>
              <Text>{item.comment}</Text>
            </Grid>
            <Grid>
              {loading === true && userinfo.email === item.username ? (
                <Button
                  onClick={() => {
                    dispatch(commentActions.deleteCommentDB(item.commentId));
                  }}
                >
                  삭제
                </Button>
              ) : null}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

const Input = styled.input`
  border: none;
  background: none;
  border-bottom: solid 1.5px #f14444;
  padding: 12px 4px;
  min-width: 1100px;

  &:focus {
    outline: none;
    border-bottom: 2px solid #f14444;
  }
`;

const StyleSendIcon = styled(SendIcon)`
  && {
    font-size: 2rem;
    margin-top: 5px;
    margin-left: 15px;
    margin-right: 10px;
    color: #b3aaaa;
    &:hover {
      cursor: pointer;
      transition: transform 500ms;
      transform: translateX(3px);
      color: #f14444;
    }
  }
`;
const Text = styled.p`
  font-size: 15px;
`;

export default Comment;
