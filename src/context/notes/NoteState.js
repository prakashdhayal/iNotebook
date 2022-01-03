import NoteContext from './noteContext'
import { useState } from 'react'
const initialNotes = []


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState(initialNotes)

    //Get all notes
    const getNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }


    //Add a note
    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            const note = json.note;
            setNotes(notes.concat(note));
        }
    }

    //Delete a note
    const deleteNote = async (id) => {

        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        const newNotes = JSON.parse(JSON.stringify(notes));
        //logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;