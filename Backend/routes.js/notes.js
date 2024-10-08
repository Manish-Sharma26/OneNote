const express = require("express");
const router = express.Router();
const fetch = require("../middleware/fetch");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

let success = false;
//Route1 : Get all the notes login required
router.get("/", fetch, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});
//Route2 : Add the notes login required
router.post(
  "/createnotes",
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Enter a description of atleast 5 charcters")
      .isLength({ min: 5 })
      .escape(),
  ],
  fetch,
  async (req, res) => {
    const { title, description, tag } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      const myNote = new Note({ title, description, tag, user: req.user.id });
      const saveNote = await myNote.save();
      res.send(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server error occureed" });
    }
  }
)

//Route 3: Updating the note using put login required
router.put("/updatenote/:id", fetch, async (req, res) => {
  const { title, description, tag } = req.body;
  //create a new note obj
  const newNote={};
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}
  //find the node to be updated
  let note = await Note.findById(req.params.id);
  try{
  if(!note){
    return res.status(404).send("Not found");
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Invalid");
  }
  note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.json(note);}
  catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error occureed" });
  }
});
//Route 3: Deleting the note using delete login required
router.delete("/deletenote/:id",fetch,async(req,res)=>{
  //find the node to be deleted
  let note = await Note.findById(req.params.id);
  try{
  if(!note){
    return res.status(404).send("Not found");
  }
  //authentication
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Invalid");
  }
  note = await Note.findByIdAndDelete(req.params.id);
  res.json({"success":"node has been deleted",note:note});
  }
  catch(error){
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error occureed" });
  }
})

module.exports = router;
