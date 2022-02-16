import React from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

const Comment = (props) => {
  return (
    <Container maxWidth="lg">
      <Grid container direction="row" sx={{ width: "100vw" }}>
        <Input
          type="text"
          placeholder="최대 100자까지 댓글을 남길 수 있습니다!"
          maxlength="100"
          onChange={() => {}}
        />
        <StyleSendIcon
          onClick={() => {
            console.log("댓글작성버튼!");
          }}
          fontSize="14px"
        ></StyleSendIcon>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginTop={10}
        sx={{ width: "100", border: "2px solid #f14444 " }}
      >
        <Grid>
          <Text>닉네임</Text>
        </Grid>
        <Grid>
          <Text>댓글내용</Text>
        </Grid>
        <Grid>
          <Button>수정</Button>
          <Button>삭제</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const Input = styled.input`
  border: none;
  background: none;
  border-bottom: solid 1.5px #f14444;
  padding: 12px 4px;
  width: 70vw;
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
