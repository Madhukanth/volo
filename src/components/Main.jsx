import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { NotesContext } from "../context/NotesContext";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    position: "relative",
  },

  mainContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  noNotesContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Main() {
  const classes = useStyles();

  const { notes, deleteNotes } = useContext(NotesContext);

  const [editNote, setEditNote] = useState(null);

  const handleDelete = (id) => () => {
    deleteNotes(id);
  };

  return (
    <div className={classes.root}>
      <div className={classes.mainContent}>
        {notes.map((note) => (
          <Card border={note.color} key={note.id}>
            <div className={classes.header}>
              <Typography variant="h6">{note.title.slice(0, 10)}...</Typography>
              <div>
                <IconButton onClick={() => setEditNote(note)}>
                  <EditOutlinedIcon
                    style={{
                      color: note.color === "white" ? "black" : note.color,
                    }}
                  />
                </IconButton>
                <IconButton onClick={handleDelete(note.id)}>
                  <DeleteOutlineIcon
                    style={{
                      color: note.color === "white" ? "black" : note.color,
                    }}
                  />
                </IconButton>
              </div>
            </div>

            <div>
              {note.items.slice(0, 5).map((item) => (
                <Typography key={item.id}>{item.val}</Typography>
              ))}
            </div>
          </Card>
        ))}

        {notes.length === 0 && (
          <div className={classes.noNotesContainer}>
            <Typography>Please add some note to view</Typography>
            <Typography>Click + button to add notes</Typography>
          </div>
        )}

        <EditModal
          open={editNote !== null}
          note={editNote}
          setEditNote={setEditNote}
        />
        <AddModal />
      </div>
    </div>
  );
}

export default Main;
