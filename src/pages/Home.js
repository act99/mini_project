import styled from "@emotion/styled";
import React from "react";

import Grid from "../elements/Grid";
import { useSelector } from "react-redux";

const Home = () => {
  const post = useSelector((state) => state.post);
  console.log(post);
  return (
    <>
      <Wrap>
        <Grid>홈 화면입니다.</Grid>
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
