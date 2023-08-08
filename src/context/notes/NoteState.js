import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
  const noteInitial=[
    {
      "_id": "64d0e797cbceedefdbcf5c86",
      "user": "64d0bfc3120f3218fa7a05d8",
      "title": "Heloo",
      "description": "How are you1",
      "tag": "Study",
      "date": "2023-08-07T12:46:15.371Z",
      "__v": 0
    },
    {
      "_id": "64d221e3be7d0617b6d5004b",
      "user": "64d0bfc3120f3218fa7a05d8",
      "title": "React",
      "description": "Js library",
      "tag": "youtube",
      "date": "2023-08-08T11:07:15.267Z",
      "__v": 0
    },
    {
      "_id": "64d221ffbe7d0617b6d5004d",
      "user": "64d0bfc3120f3218fa7a05d8",
      "title": "Pythin",
      "description": "Data Analysis ",
      "tag": "Core",
      "date": "2023-08-08T11:07:43.334Z",
      "__v": 0
    },
    {
      "_id": "64d221e3be7d0617b6d5004b",
      "user": "64d0bfc3120f3218fa7a05d8",
      "title": "Data Structures",
      "description": "Linked list , graphs and trees",
      "tag": "CheatSheet",
      "date": "2023-08-08T11:07:15.267Z",
      "__v": 0
    },
    {
      "_id": "64d221e3be7d0617b6d5004b",
      "user": "64d0bfc3120f3218fa7a05d8",
      "title": "Internt technology",
      "description": "Networking,protocols,routing",
      "tag": "Core",
      "date": "2023-08-08T11:07:15.267Z",
      "__v": 0
    },
    {
      "_id": "64d221e3be7d0617b6d5004b",
      "user": "64d0bfc3120f3218fa7a05d8",
      "title": "Theory of Computation",
      "description": "Alphbet,prolog,lambda",
      "tag": "Core",
      "date": "2023-08-08T11:07:15.267Z",
      "__v": 0
    },
    {
      "_id": "64d221e3be7d0617b6d5004b",
      "user": "64d0bfc3120f3218fa7a05d8",
      "title": "Image processing",
      "description": "IMage .png , .gif,.jpeg",
      "tag": "DSE",
      "date": "2023-08-08T11:07:15.267Z",
      "__v": 0
    }

  ]
  const [Notes, setNotes] = useState(noteInitial);
  return(
  <NoteContext.Provider value={{Notes,setNotes}}>
    {
    props.children}
  </NoteContext.Provider>
  )
}

export default NoteState;