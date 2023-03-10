const router = require('express').Router();
const path = require ('path');
const db = require('../db/db.json');
const fs = require('fs');

let noteIdArr = [];
//id generator 
fs.readFile('./db/db.json', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const noteData = JSON.parse(data);
  for (let i = 0; i < noteData.length; i++) {
    noteIdArr.push(noteData[i]);
  }
});

const generateId = () => {
  let noteId = Math.floor(Math.random() * 99) + 1;
  if (noteIdArr.length === 0) {
    noteIdArr.push(noteId);
  } else {
    for (let i = 0; i < noteIdArr.length; i++) {
      if (noteIdArr[i] === noteId) {
        noteId = Math.floor(Math.random() * 99) + 1;
        i = 0;
      }
    }
    noteIdArr.push(noteId);
  }
  return noteIdArr[noteIdArr.length - 1];
};

router.get('/notes', (req, res) => {
    const savedNotes = db;
    res.json(savedNotes);
})

router.post('/notes', (req, res) =>{
    const savedNotes = db;
    //empty body info
    const newNote = req.body;
    req.body.id = generateId();
    //pushes new note into database
    savedNotes.push(newNote);
    console.log(savedNotes);
    //routes user input asynchronously into database
    fs.writeFileSync(path.join(__dirname,'../db/db.json'), JSON.stringify(savedNotes)) 
    res.status(200).json(savedNotes);
})


//  router.delete ('/notes/:id', (req, res) => {
 
//      console.log(req.params.id);
//      con.query('DELETE FROM posts WHERE posts.id = ?', [req.params.id]); 

//  });

module.exports = router;