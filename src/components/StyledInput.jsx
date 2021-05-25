import styled from "styled-components";

const StyledInput = styled.input`
  border: 0;
  width: 100%;
  height: 40px;
  padding: 5px;
  font-size: ${(props) => props.fontSize || "15px"};

  :hover {
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  :focus {
    outline: 0;
  }
`;

export default StyledInput;
