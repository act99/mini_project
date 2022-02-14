import styled from "@emotion/styled";
import React from "react";

import { useSelector } from "react-redux";

const Home = () => {
  const post = useSelector((state) => state.post);
  console.log(post);
  return (
    <>
      <Wrap>홈 화면입니다.</Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 60%;
  margin-top: 5%;

  h3 {
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
`;

export default Home;
