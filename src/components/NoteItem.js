import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-4 my-3">
      
      <div className="card">
        
        <div className=" card-header d-flex justify-content-end align-items-center">
            <div className=" flex-grow-1">{note.title} </div>
            {/* <i className="fa-solid fa-pen-to-square " title="Edit Title"></i> */}
            <i className="fa-solid fa-pen-nib"title="Edit Title" ></i>
            
            {/* <i className="fa-solid fa-delete-left"></i> */}
            </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{note.description}.</p>
            <footer className="blockquote-footer">
              <cite title="Source Title">
              <i className="fa-solid fa-tag mx-1"></i>{note.tag}</cite>
            </footer>
            <div className="d-flex justify-content-end">
            <i className="fa-solid fa-file-pen mx-2"title="Edit body"></i>
            <i className="fa-solid fa-eraser" title="Delete Note"></i>
            {/* <i className="fa-solid fa-circle-xmark" title="Delete Note"></i> */}
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
