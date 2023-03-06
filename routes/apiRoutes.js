const router = require('express').Router();
const path = require ('path');
const db = require('../db/db.json');
const fs = require('fs');

router.get('/notes', (req, res) => {
    const savedNotes = db;
    res.json(savedNotes)
})

router.post('/notes', (req, res) =>{
    const savedNotes = db;
    const newNote = req.body;
    savedNotes.push(newNote);
    console.log(savedNotes);
    fs.writeFileSync(path.join(__dirname,'../db/db.json'), JSON.stringify(savedNotes))
    res.status(200).json(savedNotes);
})

module.exports = router;