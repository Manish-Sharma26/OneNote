import React from "react";

const AddNote = () => {
  return (
    <div>
      <div  className=" container my-3">
        <h4>Add a Note</h4>
        <form className="my-3">
          <div className="mb-3">
            <label forhtml="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
            />
          </div>
          <div className="mb-3">
            <label forhtml="description" className="form-label">
             Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
            />
          </div>
          <div className="mb-3">
            <label forhtml="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;