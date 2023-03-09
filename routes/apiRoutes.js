const router = require('express').Router();
const path = require ('path');
const db = require('../db/db.json');
const fs = require('fs');
//const getID = require('../db/userId');

router.get('/notes', (req, res) => {
    const savedNotes = db;
    res.json(savedNotes);
})

router.post('/notes', (req, res) =>{
    const savedNotes = db;
    //empty body info
    const newNote = req.body;
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