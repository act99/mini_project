import styled from "@emotion/styled";
import React from "react";

const Image = (props) => {
  const { src } = props;
  const styles = { src };
  return <ImageDefault {...styles} />;
};

const ImageDefault = styled.div`
  min-width: 500px;
  min-height: 375px;
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

Image.defaultProps = {
  src: "https://via.placeholder.com/400x300",
};

export default Image;
