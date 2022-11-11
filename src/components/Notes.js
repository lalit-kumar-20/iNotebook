import React from "react";
import {useNavigate} from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import Profile from "./Profile";
const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote,getDetails } = context;
  // console.log(getNotes)
   //console.log(getDetails)
  const [note, setNote] = useState({
    id: "",
    edited_title: "",
    edited_description: "",
    edited_tag: "default",
  });
  const [details, setDetails]=useState({
 name:"",
  }
  )
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(localStorage.getItem('token')){
    getDetails();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);


  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      edited_title: currentNote.title,
      edited_description: currentNote.description,
      edited_tag: currentNote.tag,
    });
   
  };

  const handleClick = (e) => {
    console.log("Updating the Note...", note);
    editNote(
      note.id,
      note.edited_title,
      note.edited_description,
      note.edited_tag
    );
    refClose.current.click();
    props.showAlert("Updated Successfully" ,  "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote  showAlert={props.showAlert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
             disabled={note.edited_title.length<5 || note.edited_description.length<5}
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="my-3">
                  <div className="mb-3">
                    <label htmlFor="edited_title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edited_title"
                      name="edited_title"
                      value={note.edited_title}
                      placeholder="Please! enter the title"
                      onChange={onChange}
                      minLength={5} required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edited_description" className="form-label">
                      Description
                    </label>
                    <textarea
                      placeholder="Please! enter your Note's description"
                      type="text"
                      className="form-control"
                      id="edited_description"
                      name="edited_description"
                      value={note.edited_description}
                      onChange={onChange}
                      minLength={5} required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edited_tag" className="form-label">
                      Tag
                    </label>
                    <input
                      placeholder="Please! mention the tag"
                      type="text"
                      className="form-control"
                      id="edited_tag"
                      name="edited_tag"
                      value={note.edited_tag}
                      onChange={onChange}
                      minLength={5} required
                    ></input>
                  </div>
                </div>
              
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
               disabled={note.edited_title.length<5 || note.edited_description.length<5}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-1">
          {notes.length === 0 && "Please! Add Notes to Display "}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
           
          );
        })}
        
      </div>
    </>
  );
};

export default Notes;
