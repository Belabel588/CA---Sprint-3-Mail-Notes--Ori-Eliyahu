const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [noteType, setNoteType] = useState('NoteTxt')
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }, [filterBy])


    function setNewFilterBy(newFilter) {
        setFilterBy(newFilter)
    }


    function onRemoveNote(noteId) {
        console.log(noteId)
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Book ${noteId} removed successfully`)
            })
            .catch(err => {
                console.error('Error removing book', err)
                showErrorMsg(`Failed to remove book ${noteId}`)
            })
    }

    function handleButtonClick(newNoteType) {
        setNoteType(newNoteType)
    }



    return <div className="main-container">
            <NoteFilter filterBy={filterBy} onFilter={setNewFilterBy}></NoteFilter>
       
        <div className="note-add-inputs">
            <input
                type="text"
                onClick={() => handleButtonClick('NoteTxt')}
                placeholder="New note..."
            />
            <button onClick={() => handleButtonClick('NoteImg')}>New note img</button>
            <button onClick={() => handleButtonClick('NoteTodos')}>New note todo</button>
            <button onClick={() => handleButtonClick('NoteVids')}>New note video</button>
            {/* need to change the video button to a condition inside the note txt */}
        </div>
        <NoteList note={noteType} notes={notes} onRemove={onRemoveNote}></NoteList>

    </div >

}
