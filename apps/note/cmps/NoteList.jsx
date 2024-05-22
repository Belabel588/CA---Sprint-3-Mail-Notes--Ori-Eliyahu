
// const { useState, useEffect } = React
// const { Link } = ReactRouterDOM

// import { NotePreview } from "./NotePreview.jsx"

// export function NoteList({ notes, onRemoveNote }) {
//     console.log(notes);
//     return (
//         <ul className="note-list">
//             {notes.map((note, index) => (
//                 <li key={index} className="note-item">


//                     <button onClick={() => onRemoveNote(note.id)}>X</button>
//                 </li>
//             ))}
//         </ul>
//     )
// }
// dynamic CMP here , inside that dynamicCmp is NotePreview

const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes, onRemove }) {
    console.log(notes);
    return (
        <ul className="note-list">
            {notes.map((note, index) => (
                <li key={index} className="note-item" style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview noteType={note.type} note={note}></NotePreview>

                    <button onClick={() => onRemove(note.id)}>X</button>
                </li>
            ))}
        </ul>
    )
}
