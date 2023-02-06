import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";

import img from "./assets/post-it.png";
import Notes from "./components/Notes";
import Input from "./components/Input";
import Update from "./components/Update";
import { userData } from "./context/userData";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const path = ref(db, "/notes"); 
    onValue(path, (snapshot) => {
      const notes = snapshot.val();
      if (!notes) {
        return (
          <div className="notes">
            <h2 className="note card">No notes found</h2>
          </div>
        );
      } else {
        let dummyNotes = Object.values(notes).map((data) => {
          return data;
        });
        setData(dummyNotes);
      }
    });
  }, []);


  return (
    <>
      <Router>
        <div className="card nav">
          <Link to="/">
            <span className="note-heading">
              <img src={img} alt="logo" />
              <h1>Take a Note</h1>
            </span>
          </Link>
          <Link to="/add">
            <div className="add-note">
              <AddIcon
                className="add-btn"
                fontSize="small"
                sx={{ color: "#242553" }}
              />
              <h3>Add Note</h3>
            </div>
          </Link>
        </div>
        <userData.Provider value={data}> 
          <Routes>
            <Route path="/" exact element={<Notes />}></Route>
            <Route path="/add" exact element={<Input />}></Route>
            <Route path="/edit/:id" exact element={<Update data= {data} />}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </userData.Provider>
      </Router>
    </>
  );
};
export default App;
