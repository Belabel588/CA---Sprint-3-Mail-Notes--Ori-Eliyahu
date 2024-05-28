const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;
import { NotePreview } from "./NotePreview.jsx";
import { NoteEdit } from "./NoteEdit.jsx";

export function NoteList({ notes, onRemove, handleNoteUpdate, getUpdatedNote }) {
    const [editNoteId, setEditNoteId] = useState(null); // State to track the note being edited

    function handleClose() {
        setEditNoteId(null);
    }

    function onUpdate(updatedNote) {
        console.log(updatedNote);
        getUpdatedNote(updatedNote)
    }

    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.id} className="note-item" style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview note={note} noteType={note.type} onNoteUpdate={handleNoteUpdate} />

                    <button onClick={() => onRemove(note.id)}>X</button>
                    <button onClick={() => setEditNoteId(note.id)}>Edit</button>
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
