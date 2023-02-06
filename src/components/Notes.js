import React, {useContext} from "react";

import "./CSS/Notes.css";
import Note from "./Note.js";
import { userData } from "../context/userData";

const Notes = (props) => {

  const data = useContext(userData);
  return (
    <>
      <div className="notes">
        {data.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
