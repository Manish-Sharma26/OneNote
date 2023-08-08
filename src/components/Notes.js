import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes =()=>{
  const context = useContext(NoteContext);
  const {Notes,setNotes}=context;
  let num=1;
  return (
    <div className="row ">
      <h4>Your Notes</h4>
      {Notes.map((note)=>{
        return <NoteItem note={note} key={num++}/>
      })}
    </div>
  )
}
export default Notes;