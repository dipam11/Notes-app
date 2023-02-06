import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, ref, remove ,child} from "firebase/database";
import { db } from "../firebase";

import "./CSS/Note.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

const Note = (props) => {
  const navigate = useNavigate();
  const [showBtn, setShowBtn] = useState(false);

  const menuHandler = () => {
    showBtn ? setShowBtn(false) : setShowBtn(true);
  };

  const handleDelete = () => {
    const path = `/notes/${props.id}`;
    get(child(ref(db),path)).then((snapshot)=>{
      remove(ref(db, path))
      menuHandler();
    }).catch(error=>{
      alert(error);
    })
    
  };

  const handleEdit = () => {
    navigate(`/edit/${props.id}`);
  };

  return (
    <>
      <div className="note card">
        <div className="note-header">
          <h2>{props.title}</h2>
          {showBtn && (
            <span className="btn-container">
              <span className="btns" onClick={handleEdit}>
                <EditIcon className="btn-icon" fontSize="small" />
                Edit
              </span>
              <span className="btns" onClick={handleDelete}>
                <DeleteIcon className="btn-icon" fontSize="small" />
                Delete
              </span>
            </span>
          )}
          <LinearScaleIcon
            style={{ transform: "rotate(90deg)", cursor: "pointer" }}
            sx={{ fontSize: 20 }}
            onClick={menuHandler}
          />
        </div>
        <hr />
        <p>{props.description}</p>
      </div>
    </>
  );
};

export default Note;
