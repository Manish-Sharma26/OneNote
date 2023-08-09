import React,{useContext,useState} from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote}=context;
  const [note, setNote] = useState({title:"",description:"",tag:""});
  const handleClick=(e)=>{
    e.preventDefault();
    if(note.title.length === 0){
      props.showAlert("Title is required ","warning");
      document.querySelector('#title').focus();
    }
    else if(note.description.length === 0){
        document.querySelector('#description').focus();
    }
    else if(note.tag.length === 0){
      document.querySelector('#tag').focus();
    }
    else{
    addNote(note.title,note.description,note.tag);
    props.showAlert("Note Added","success");
    props.setshowAdd(false);}
  }

  const onChange=(e)=>{
    //changing those properties which are being written by user
    setNote({...note,[e.target.name]:e.target.value});
  }
  return (
    <div>
      <div  className=" container ">
        <h4>Add a Note</h4>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
             Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
