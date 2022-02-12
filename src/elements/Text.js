import styled from "styled-components";

const Text = (props) => {
  const { fontsize, bold } = props;
  const style = { fontsize, bold };
  return <TextCo {...style}></TextCo>;
};

Text.defaultProps = {
  fontsize: "16px",
  bold: false,
  color: false,
};

const TextCo = styled.div`
  font-size: ${(props) => props.fontsize};
  bold: ${(props) => (props.bold ? 600 : 200)};
  color: ${(props) => (props.color ? "red" : "black")};
`;

export default Text;
