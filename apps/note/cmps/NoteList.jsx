const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { NotePreview } from "./NotePreview.jsx"
import { NoteEdit } from "./NoteEdit.jsx"
import { getImageDataUrls } from "../services/img.service.js"

export function NoteList({ notes, onRemove, handleNoteUpdate, getUpdatedNote, togglePin , copyNote }) {
    const [editNoteId, setEditNoteId] = useState(null);
    const imgs = getImageDataUrls();

    function handleClose() {
        setEditNoteId(null);
    }

    function onUpdate(updatedNote) {
        getUpdatedNote(updatedNote);
    }

    return (
        <ul className="note-list">
            {notes.map(note => (
                <li key={note.id} className={`note-item`} style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview note={note} noteType={note.type} onNoteUpdate={handleNoteUpdate} videoId={note.videoId} />
                    <div className="actions-note">
                        <button onClick={() => copyNote(note.id)}>
                        <img className="copy-img" src={imgs.copyImg} alt="" />
                        </button>
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
                        <NoteEdit note={note} onClose={handleClose} onNoteUpdate={onUpdate} />
                    )}
                </li>
            ))}
        </ul>
    );
}
