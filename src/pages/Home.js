import styled from "@emotion/styled";
import React from "react";
import Post from "../components/Post";

import { useSelector } from "react-redux";

const Home = () => {
  const post = useSelector((state) => state.post);
  console.log(post);
  return (
    <>
      <Wrap>
        <h3>홈 화면입니다.</h3>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 60%;
  background-color: aliceblue;
  h3 {
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
`;

export default Home;
