const route = require('express').Router();
const Notes = require('../models/Notes')
const varifyToken = require('./varifyToken')
const { notesValidation, updatenotesValidation } = require('../validation')


// 1. Add a new notes Using " post : /api/notes/addnote " login user required
route.post('/addnote', varifyToken, async (req, res) => {
    let success = false;
    //Lets validate the data before we make a note
    const { error } = notesValidation(req.body);
    if (error) return res.status(400).json({ success, error: error.details[0].message });

    //Create a New note
    const note = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user._id
    })
    try {
        success=true;
        res.json({success,note});
    } catch (error) {
        success=false;
        res.status(500).json({ success, error: "Internal server error" });
    }

})

// 2. fetch all notes Using " get : /api/notes/fetchallnotes " login user required
route.get('/fetchallnotes', varifyToken, async (req, res) => {
    let success = true;
    try {
        const notes = await Notes.find({ user: req.user._id })
        res.send(notes);
    } catch (error) {
        res.status(500).json({ success, error: "Internal server error" });
    }
})


// 3. Update a existing note Using " put : /api/notes/updatenote " login user required
route.put('/updatenote/:id', varifyToken, async (req, res) => {
    let success = false;
    const { title, description, tag } = req.body;
    //create newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    try {

        //Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).json({ success, error: "Note Not Found" }) }

        //check for user to be update
        if (note.user.toString() !== req.user._id) {
            return res.status(401).json({ success, error: "Not Allowed" })
        };

        //Lets validate the data before we update a note
        const { error } = updatenotesValidation(req.body);
        if (error) return res.status(400).json({ success, error: error.details[0].message });

        //update note now
        success = true;
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        success = false;
        res.status(500).send({ success, error: "Internal server error" });
    }
})


// 4. delete Note Using " delete : /api/notes/deletenote " login user required
route.delete('/deletenote/:id', varifyToken, async (req, res) => {
    try {
        let success = false;
        //Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).json({ success, error: "Note Not Found" }) }

        //check for user to be deleted
        if (note.user.toString() !== req.user._id) {
            return res.status(401).json({ success, error: "Not Allowed" });
        }
        //delete the note now
        success = true;
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success, message: "Success! Note has been deleted" });
    } catch (error) {
        success = false;
        res.status(500).json({ success, error: "Internal server error" });
    }
})





module.exports = route;