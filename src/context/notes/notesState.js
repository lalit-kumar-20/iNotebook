import React from "react";

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000",
    notesInitial = [];
   // detailInitial =[];
  const [notes, setNotes] = useState(notesInitial);
  const [details, setDetails] = useState([]);
  // GET all Note
  const getNotes = async () => {
    /// API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  /// Get User Details  

const getDetails = async () => {
  /// API call
  const response = await fetch(`${host}/api/auth/getuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });
  const json = await response.json();
  console.log(json);
  setDetails(json);
};

  /// Add a Note

  const addNote = async (title, description, tag) => {
    /// API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
    console.log(note);

    console.log("Adding a new note");
  };
  /// Delete a Note

  const deleteNote = async (id) => {
    /// API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  /// update a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes,getDetails }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
