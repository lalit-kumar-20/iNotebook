import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note , updateNote,detail} = props;
  // console.log(note.title);
 //  console.log("jhwgdlwq");
  //const {{detail}} 
  return (
    <div className="col-md-3">
     
      <div className="card my-3">
     <h1>{note.name}</h1>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
         

          <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
          <i
            className="fa-solid fa-trash-can mx-2 "
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully" ,  "success")
            }}
          ></i>
          <div>
           <i className="mx-2">Last edited on  {new Date(note.date).toGMTString()}</i>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
