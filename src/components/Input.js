import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import "./CSS/input.css";

const Input = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: "",
      title: "",
      description: "",
    },
  ]);


  const { title, description } = data;

  let name, value;
  const getData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };


  const postData = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please provide valid inputs.");
    } else {
      const uuid = uuidv4();
      set(ref(db, `notes/${uuid}`), {
        id: uuid,
        title,
        description,
      });
      setData({
        title: "",
        description: "",
      });
      navigate('/');
    }
  };

  return (
    <>
      <div className="input-page">
        <form className="form-control" method="POST">
          <label className="field">
            <p>Title</p>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={getData}
            />
          </label>
          <label className="field">
            <p>Description</p>
            <textarea
              type="text"
              name="description"
              maxLength={70}
              rows={3}
              placeholder="Describe in 70 charachters.."
              value={data.description}
              onChange={getData}
            />
          </label>
          <div className="buttons">
            <button type="submit" className="button" onClick={postData}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Input;
