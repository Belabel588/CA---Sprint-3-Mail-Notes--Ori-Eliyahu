
const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes, onRemove }) {
    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.id} className="note-item" style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview noteType={note.type} note={note} />

                    <button onClick={() => onRemove(note.id)}>X</button>
                </li>
            ))}
        </ul>
    );
}
