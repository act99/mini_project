import styled from "@emotion/styled";
import React from "react";

const Post = (props) => {
  return (
    <React.Fragment>
      <PostWrap>
        <ImageBox>image</ImageBox>
        <TextBox>
          <text>출판 | 세라핀</text>
          <div>제목</div>
          <div>내용</div>s
        </TextBox>
      </PostWrap>
    </React.Fragment>
  );
};

const PostWrap = styled.div`
  max-width: 188px;
  height: 348px;
  box-sizing: border-box;
  display: block;
  flex-wrap: wrap;
  text-size-adjust: 100%;
  word-break: break-all;
  -webkit-box-direction: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
`;

const ImageBox = styled.div`
  max-width: 188px;
  height: 162px;
  flex-basis: 132px;
  position: relative;
  word-break: break-all;
  overflow-x: hidden;
  overflow-y: hidden;
  background-image: url(https://yt3.ggpht.com/ytc/AKedOLSF4SZplqW7WRpiWvJ_AXMa9UBwLd-U6KBeWVS2yg=s900-c-k-c0x00ffffff-no-rj);
`;
const TextBox = styled.div`
  box-sizing: border-box;
  display: block;
  flex-basis: 0%;
  flex-grow: 1;
  flex-shrink: 1;
  width: 188px;
  height: 186px;
  padding: 0px;
  word-break: break-all;
`;

const Textcontent = styled.div`
  min-height: 138px;
`;

// const Wrap = styled.div`
//   width: 225px;
//   height: 461px;
//   padding: 0px 10px;
//   cursor: pointer;
// `;

// const PostWrap = styled.div`
//   width: 225px;
//   margin: 0px 0px 56px;
//   position: relative;
// `;

// const PostBox = styled.div`
//   width: 225px;
//   display: block;
//   flex-wrap: wrap;
//   word-break: break-all;
// `;

// const ImageBox = styled.div`
//     width: 225px;
//     position: relative;
//     flex-basis: 132px;
//     overflow: hidden;
//     box-sizing: border-box;
//     background-image: url(https://yt3.ggpht.com/ytc/AKedOLSF4SZplqW7WRpiWvJ_AXMa9UBwLd-U6KBeWVS2yg=s900-c-k-c0x00ffffff-no-rj);
// }
// `;

export default Post;
