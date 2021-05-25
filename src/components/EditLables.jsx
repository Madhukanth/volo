import { useContext } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import { NotesContext } from "../context/NotesContext";
import StyledInput from "./StyledInput";

function EditLables() {
  const { lables, deleteLables, addLables } = useContext(NotesContext);
  const handleEnter = (e) => {
    if (e.target.value.length > 0 && e.keyCode === 13) {
      addLables(e.target.value);
    }
  };

  const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;

    .container {
      width: 500px;
      height: 600px;
      overflow: scroll;
      background: white;
      padding: 20px;
      box-shadow: 1px 2px 6px 1px rgb(0 0 0 / 40%);
    }

    .addContainer {
      display: flex;
      align-items: center;
    }
  `;

  const ItemWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `;

  return (
    <MainWrapper>
      <div className="container">
        <Typography variant="h6">Edit Labels</Typography>
        <div className="addContainer">
          <Add />
          <StyledInput placeholder="Add Label" onKeyDown={handleEnter} />
        </div>

        {lables.map((lable) => (
          <ItemWrapper>
            <p>{lable}</p>
            <IconButton color="secondary" onClick={() => deleteLables(lable)}>
              <Delete />
            </IconButton>
          </ItemWrapper>
        ))}
      </div>
    </MainWrapper>
  );
}

export default EditLables;
