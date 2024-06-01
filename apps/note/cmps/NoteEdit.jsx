const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM
import { noteService } from "../services/note.service.js"

export function NoteEdit({ note, onClose, onNoteUpdate }) {
    const dialogRef = useRef(null)
    const [updatedNote, setUpdatedNote] = useState(note)

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }, [])

    function handleSave() {
        onNoteUpdate(updatedNote)
        noteService.save(updatedNote) // Save the updated note
        onClose()
    }

    function handleTitleChange(event) {
        const newTitle = event.target.value
        setUpdatedNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, title: newTitle }
        }))
    }

    function handleTextChange(event) {
        const newText = event.target.value
        setUpdatedNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, txt: newText }
        }))
    }

    function handleTodoChange(index, value) {
        const newTodos = updatedNote.info.todos.map((todo, idx) => (
            idx === index ? { ...todo, txt: value } : todo
        ))
        setUpdatedNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, todos: newTodos }
        }))
    }

    function handleCheckboxChange(index) {
        const newTodos = updatedNote.info.todos.map((todo, idx) => (
            idx === index ? { ...todo, isTodoDone: !todo.isTodoDone } : todo
        ))
        setUpdatedNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, todos: newTodos }
        }))
    }

    return (
        <dialog ref={dialogRef}>
            <h2>Edit Note</h2>
            {updatedNote.type === 'NoteTxt' && (
                <div className={'note-txt-edit-container'}>
                    <label className={'title-edit'}>
                        Title:
                        <input type="text" defaultValue={updatedNote.info.title} onChange={handleTitleChange} />
                    </label>
                    <label className={'txt-edit'}>
                        Note:
                        <input type="text" defaultValue={updatedNote.info.txt} onChange={handleTextChange} />
                    </label>
                </div>
            )}
            {updatedNote.type === 'NoteTodos' && (
                <div className={'note-todo-edit-container'}>
                    <h3>Todos:</h3>
                    {updatedNote.info.todos.map((todo, idx) => (
                        <div key={idx} className={'todo-edit'}>
                            <label>
                                <input type="checkbox" defaultChecked={todo.isTodoDone} onChange={() => handleCheckboxChange(idx)} />
                                Todo {idx + 1}:
                                <input type="text" defaultValue={todo.txt} onChange={(e) => handleTodoChange(idx, e.target.value)} />
                            </label>
                        </div>
                    ))}
                </div>
            )}
            <menu>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </menu>
        </dialog>
    )
}
