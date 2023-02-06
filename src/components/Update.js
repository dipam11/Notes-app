import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, update } from "firebase/database";

const Update = ({ data }) => {
  const [element, setElement] = useState();
  const navigate = useNavigate();
  const noteId = useParams();

  useEffect(() => {
    data.filter((element) => {
      if (element.id === noteId.id) {
        setElement(element);
      }
    });
  }, [data, noteId.id]);

  let name, value;
  const getData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setElement({...element, [name]: value });
  };

  const handleSubmit = () => {
    update(ref(db, `/notes/${noteId.id}`), {
      // id: noteId.id,
      title: element.title,
      description: element.description,
    });
    navigate("/");
  };

  return (
    <>
      {element && (
        <div className="input-page">
          <form className="form-control" method="POST">
            <label className="field">
              <p>Title</p>
              <input
                type="text"
                name="title"
                value={element.title}
                onChange={getData}
              />
            </label>
            <label className="field">
              <p>Description</p>
              <textarea
                type="text"
                name="description"
                maxLength={50}
                rows={3}
                placeholder="Describe in 50 charachters.."
                value={element.description}
                onChange={getData}
              />
            </label>
            <div className="buttons">
              <button type="button" className="button" onClick={handleSubmit}>
                {/* <button type="submit" className="button"> */}
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Update;
