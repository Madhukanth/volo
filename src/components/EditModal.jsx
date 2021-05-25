import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { v4 } from "uuid";

import Color from "./Color";
import StyledInput from "./StyledInput";
import { NotesContext } from "../context/NotesContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    zIndex: 3,
    width: 400,
    minHeight: 500,
    maxHeight: 500,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
  },

  itemClass: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  addButton: {
    position: "absolute",
    zIndex: 2,
    bottom: 50,
    right: 50,
  },

  divider: {
    marginTop: theme.spacing(2),
  },

  chipsContainer: {
    marginTop: theme.spacing(1),
  },
  chipClass: {
    margin: "3px",
  },

  paletteContainer: {
    position: "relative",
  },

  palette: {
    position: "absolute",
    width: "116px",
    padding: "4px",
    left: "-77px",
    zIndex: 9,
    background: "white",
    boxShadow: "1px 2px 6px 1px rgb(0 0 0 / 40%)",
    borderRadius: "7px",
  },

  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
}));

export default function EditModal(props) {
  const classes = useStyles();

  const [title, setTitle] = useState("");

  const [items, setItems] = useState([]);
  const [currnotes, setcurrNotes] = useState("");
  const [currLables, setCurrLables] = useState([]);
  const [selectedColor, setColor] = useState();
  const [colorOpen, setColorOpen] = useState(false);

  const { notes, lables, setNotes } = useContext(NotesContext);

  useEffect(() => {
    if (props.note) {
      setTitle(props.note.title);
      setItems(props.note.items);
      setCurrLables(props.note.lables);
      setColor(props.note.color);
    }
  }, [props.note]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClose = () => {
    const newNotes = notes.map((note) => {
      if (note.id !== props.note.id) return note;

      return {
        ...props.note,
        title: title,
        items: items,
        color: selectedColor,
        lables: currLables,
      };
    });

    setNotes(newNotes);
    setTitle("");
    setItems([]);
    setColor("white");
    setCurrLables([]);
    setcurrNotes("");
    props.setEditNote(null);
  };

  const handleAdd = (val) => {
    setItems((data) => [...data, { id: v4(), val: val, checked: false }]);
    setcurrNotes("");
  };

  const handleEnter = (e) => {
    if (e.keyCode !== 13 || currnotes.length === 0) return;

    handleAdd(currnotes);
  };

  const handleDelete = (id) => () => {
    setItems((data) => data.filter(({ id: exid }) => exid !== id));
  };

  const handleChange = (id) => (e) => {
    setItems((data) =>
      data.map((item) => {
        if (item.id !== id) return item;

        return { ...item, val: e.target.value };
      })
    );
  };

  const handleCheck = (id) => (e) => {
    setItems((data) =>
      data.map((item) => {
        if (item.id !== id) return item;

        return { ...item, checked: e.target.checked };
      })
    );
  };

  const handleLableChange = (e) => {
    setCurrLables((data) => {
      if (data.includes(e.target.value)) return data;

      return [...data, e.target.value];
    });
  };

  const deleteLable = (lable) => () => {
    setCurrLables((data) => data.filter((val) => val !== lable));
  };

  const handleColorChange = (val) => () => {
    setColor(val);
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div
        style={{
          top: `50%`,
          left: `50%`,
          transform: `translate(-${50}%, -${50}%)`,
          border: `3px solid ${selectedColor}`,
        }}
        className={classes.paper}
        onClick={() => setColorOpen(false)}
      >
        <div className={classes.itemClass}>
          <StyledInput
            placeholder="Title"
            fontSize="17px"
            value={title}
            onChange={handleTitleChange}
          />
          <div className={classes.paletteContainer}>
            <Color
              color={selectedColor}
              onClick={(e) => {
                setColorOpen(true);
                e.stopPropagation();
              }}
            />
            {colorOpen && (
              <div className={classes.palette}>
                <Color color="blue" onClick={handleColorChange("blue")} />
                <Color color="green" onClick={handleColorChange("green")} />
                <Color color="orange" onClick={handleColorChange("orange")} />
                <Color color="grey" onClick={handleColorChange("grey")} />
                <Color color="white" onClick={handleColorChange("white")} />
                <Color color="red" onClick={handleColorChange("red")} />
              </div>
            )}
          </div>
        </div>
        <div>
          {items.map((item) => (
            <div key={item.id} className={classes.itemClass}>
              <Checkbox
                checked={item.checked}
                color="primary"
                onChange={handleCheck(item.id)}
              />
              <StyledInput
                placeholder="Notes here"
                value={item.val}
                onChange={handleChange(item.id)}
              />
              <IconButton onClick={handleDelete(item.id)}>
                <Close />
              </IconButton>
            </div>
          ))}

          <div className={classes.itemClass}>
            <AddIcon className={classes.addIcon} />
            <StyledInput
              placeholder="Add Notes"
              value={currnotes}
              onKeyDown={handleEnter}
              onChange={(e) => setcurrNotes(e.target.value)}
            />
          </div>
        </div>

        <Divider className={classes.divider} />

        <div className={classes.chipsContainer}>
          {currLables.map((lable) => (
            <Chip
              className={classes.chipClass}
              key={lable}
              label={lable}
              variant="outlined"
              color="primary"
              size="small"
              onDelete={deleteLable(lable)}
              avatar={<Avatar>{lable[0].toUpperCase()}</Avatar>}
            />
          ))}
        </div>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Select Label</InputLabel>
          <Select onChange={handleLableChange} label="Select Label">
            {lables.map((lable) => (
              <MenuItem key={lable} value={lable}>
                {lable}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Modal>
  );
}
