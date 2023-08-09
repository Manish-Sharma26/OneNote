import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Alert from "./Alert";

const Notes =()=>{
  const context = useContext(NoteContext);
  const {Notes,alert,alertMessage}=context;
  let num=1;
  const [showAdd, setshowAdd] = useState(false)
  const handleClick=()=>{
    console.log("hello");
    setshowAdd(true);
  }
  return (
    <div className="row my-3 d-flex justify-content-evenly">
      <div className="d-flex justify-content-between">
      <h3>Your Notes</h3>
      <button type="button" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </div>
      <Alert alert={alert} />
      {showAdd ? <AddNote setshowAdd={setshowAdd} showAlert={alertMessage}/>:""}
      {Notes.map((note)=>{
        return <NoteItem note={note} key={num++}/>
      })}
    </div>
  )
}
export default Notes;