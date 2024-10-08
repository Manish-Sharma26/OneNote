import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
  const [alert, setalert] = useState(null);
  const host ='http://localhost:5000'
  const alertMessage = (message, type) => {
    setalert({ message: message, type: type });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };
  const noteInitial=[]; 
  const [Notes, setNotes] = useState(noteInitial);
  //get all the notes
  const getNotes = async()=>{
    const response =await fetch(`${host}/api/notes`,{
      method:'GET',
      headers:{
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    // console.log(json);
    setNotes(json);
  }
  //Add a note
  const addNote=async(title,description,tag)=>{
    const response =await fetch(`${host}/api/notes/createnotes`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    setNotes(Notes.concat(json));
  }
  //Delete a note
  const deleteNote=async (id)=>{
    //Api Call
    const response =await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        "auth-token": localStorage.getItem('token')
      },
    });
    // const json=  await response.json();
    // console.log(json);
    const newNote= Notes.filter((note)=>{return note._id !== id});
    setNotes(newNote);
  }
  //Update a note
  const editNote= async(id,title,description,tag)=>{
   
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'PUT',
      headers:{
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });

    let newNotes = JSON.parse(JSON.stringify(Notes));
    for(let index=0;index < Notes.length ;index++){
      const currNOte  = Notes[index];
      if(currNOte._id ===id){

        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return(
  <NoteContext.Provider value={{Notes,getNotes,addNote,deleteNote,editNote,alert,alertMessage,setalert}}>
    {
    props.children}
  </NoteContext.Provider>
  )
}

export default NoteState;