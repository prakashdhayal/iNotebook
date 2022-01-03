import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title"> {note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={() => {
                            if (window.confirm("Are you sure to delete this note ??")===true) {
                                deleteNote(note._id);
                                props.showAlert("Note deleted successfully", "success")
                            }
                        }} ></i>
                        <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text"><b>Tags :</b> {note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
