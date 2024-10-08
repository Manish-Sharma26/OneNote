import { useContext, useRef, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Alert from "./Alert";
import {useNavigate} from "react-router-dom"

const Notes = () => {
  const context = useContext(NoteContext);
  const { Notes, alert, alertMessage, getNotes,editNote } = context;
  const [note, setNote] = useState({id:"",edittitle:"",editdescription:"",edittag:""});
  const navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    if(localStorage.getItem('token'))
    getNotes();
    else{
      navigate('/login');
    }

  }, []);

  let num = 1;
  const [showAdd, setshowAdd] = useState(false);

  const handleShowClick = () => {
    // console.log("hello");
    setshowAdd(true);
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,edittitle:currentNote.title,editdescription:currentNote.description,edittag:currentNote.tag});
  };


  const handleClick=(e)=>{
    editNote(note.id,note.edittitle,note.editdescription,note.edittag);
    refClose.current.click();
    alertMessage("Note was Updated","success");
    // props.setshowAdd(false);}
}

  const onChange=(e)=>{
    //changing those properties which are being written by user
    setNote({...note,[e.target.name]:e.target.value});
  }
  
  return (
    <>
    <Alert alert={alert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="edittitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edittitle"
                    name="edittitle"
                    value={note.edittitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editdescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.editdescription}
                    className="form-control"
                    id="editdescription"
                    name="editdescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edittag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.edittag}
                    className="form-control"
                    id="edittag"
                    name="edittag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------- */}
      <div className="container">
      <div className=" row my-3 d-flex justify-content-evenly">
        <div className="d-flex justify-content-between">
          <h3 className="mx-1">Your Notes</h3>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm mx-3"
            onClick={handleShowClick}
          >
            Add New Note
          </button>
          {/* <button type="button" className="btn btn-primary" >Add Note</button> */}
        </div>
        
        {showAdd ? (
          <AddNote setshowAdd={setshowAdd} showAlert={alertMessage} />
        ) : (
          ""
        )}
        {Notes.map((note) => {
          return <NoteItem updateNote={updateNote} note={note} key={num++} />;
        })}
      </div>
      </div>
    </>
  );
};
export default Notes;
