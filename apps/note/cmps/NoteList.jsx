const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;
import { NotePreview } from "./NotePreview.jsx";
import { NoteEdit } from "./NoteEdit.jsx";
import { getImageDataUrls } from "../services/img.service.js";

export function NoteList({ notes, onRemove, handleNoteUpdate, getUpdatedNote, togglePin }) {
    const [editNoteId, setEditNoteId] = useState(null); // State to track the note being edited
    const imgs = getImageDataUrls();

    function handleClose() {
        setEditNoteId(null);
    }

    function onUpdate(updatedNote) {
        console.log(updatedNote);
        getUpdatedNote(updatedNote);
    }

    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.id} className={`note-item`} style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview note={note} noteType={note.type} onNoteUpdate={handleNoteUpdate} />
                    <div className="actions-note">
                        <button onClick={() => togglePin(note.id)}>
                            <img src={imgs.pinImg} alt="" />
                        </button>
                        <button onClick={() => onRemove(note.id)}>
                            <img src={imgs.trashBinImg} alt="" />
                        </button>
                        <button onClick={() => setEditNoteId(note.id)}>
                            <img src={imgs.editImg} alt="Edit" />
                        </button>
                    </div>
                    {editNoteId === note.id && (
                        <NoteEdit
                            note={note}
                            onClose={handleClose}
                            onNoteUpdate={onUpdate}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}
