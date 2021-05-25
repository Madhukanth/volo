import styled from "styled-components";

const Card = styled.div`
  @media all and (max-width: 1200px) {
    width: calc(25% - 40px);
  }

  @media all and (max-width: 1000px) {
    width: calc(33.333% - 40px);
  }

  @media all and (max-width: 800px) {
    width: calc(50% - 40px);
  }

  @media all and (max-width: 650px) {
    width: calc(100% - 40px);
  }

  margin: 20px;
  height: 200px;
  width: calc(20% - 40px);
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-shadow: 1px 2px 6px 1px rgb(0 0 0 / 40%);
  border: ${(props) =>
    `3px solid ${props.border === "white" ? "black" : props.border}`};
`;

export default Card;
