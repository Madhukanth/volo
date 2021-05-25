import styled from "styled-components";

const Color = styled.button`
  border: ${(props) =>
    !props.color || props.color === "white"
      ? "1px solid black"
      : `1px solid ${props.color}`};
  background: ${(props) => props.color || "white"};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  box-sizing: border-box;
  margin: 3px;

  :focus {
    outline: 0;
  }
`;

export default Color;
