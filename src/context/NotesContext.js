import { useState, createContext } from "react";

export const NotesContext = createContext({
  notes: [],
  setNotes: () => {},
  addNotes: () => {},
  deleteNotes: () => {},

  lables: [],
  setLables: () => {},
  addLables: () => {},
  deleteLables: () => {},
});

const NotesProvider = (props) => {
  const [notes, setNotes] = useState([]);
  const [lables, setLables] = useState(["Default Label"]);

  const addNotes = (note) => {
    setNotes((data) => [note, ...data]);
  };

  const deleteNotes = (id) => {
    setNotes((data) => data.filter((note) => note.id !== id));
  };

  const addLables = (lable) => {
    setLables((data) => [...data, lable]);
  };

  const deleteLables = (lable) => {
    setLables((data) => data.filter((val) => val !== lable));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        addNotes,
        deleteNotes,

        lables,
        setLables,
        addLables,
        deleteLables,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
