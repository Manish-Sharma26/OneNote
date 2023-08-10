import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div
      className=" col-md-4 col-lg-3 col-sm-6 col-xl-3 my-2 "
      style={{ minWidth: "200px", maxWidth: "300px" }}
    >
      <div
        className="card gradient-background"
        style={{ height: "200px", position: "relative" }}
      >
        <div className=" card-header d-flex justify-content-end align-items-center">
          
          <i className="fa-solid fa-feather-pointed" ></i>
          
          <div className=" flex-grow-1">{ note.title} </div>

          {/* <i className="fa-solid fa-delete-left"></i> */}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{note.description}.</p>
            <footer className="blockquote-footer">
            {/* {note.tag} */}
              <cite title="Source Title">
                <i className="fa-solid fa-tag mx-1"></i>
                {note.date.slice(0,10)}
              </cite>
            </footer>
            <div
              className="d-flex justify-content-end"
              style={{ position: "absolute", top: "160px", right: "15px" }}
            >
              <i className="fa-solid fa-file-pen mx-2" title="Edit body"
              onClick={()=>{
                updateNote(note);
              }}></i>
              <i
                className="fa-solid fa-eraser"
                title="Delete Note"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              {/* <i className="fa-solid fa-circle-xmark" title="Delete Note"></i> */}
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
