const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { noteService } from "../services/note.service.js"

export function NoteTodos({ note, onNoteUpdate }) {
    const [todos, setTodos] = useState(note.info.todos)
    const [info, setInfo] = useState(note.info)

    useEffect(() => {
        setTodos(note.info.todos)
        setInfo(note.info)
    }, [note])

    function handleCheckboxChange(index) {
        const updatedTodos = todos.map((todo, i) => {
            if (i === index) {
                return {
                    ...todo,
                    isTodoDone: !todo.isTodoDone,
                    doneAt: !todo.isTodoDone ? Date.now() : null,
                }
            }
            return todo
        })

        setTodos(updatedTodos)

        const updatedInfo = {
            ...info,
            todos: updatedTodos,
        }

        setInfo(updatedInfo)

        const updatedNote = {
            ...note,
            info: updatedInfo,
        }
        console.log(updatedNote)
        noteService.save(updatedNote)
        onNoteUpdate(updatedNote) // Call the function to update the note in the list
    }

    return (
        <div>
            <h1>ITS A TODOS</h1>
            <section className="note-todo-title">title is :{note.info.title}</section>
            <ul>
                {todos.map((todo, index) => (
                    <li key={todo.id || index}>
                        <div>
                            <input
                                type="checkbox"
                                checked={todo.isTodoDone}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <span>{todo.txt}</span>
                            {todo.isTodoDone && (
                                <span> (Completed on: {new Date(todo.doneAt).toLocaleDateString()})</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
