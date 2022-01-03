const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// or
// const { Schema } = mongoose;
let NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const model = mongoose.model('notes', NotesSchema);
module.exports = model;
