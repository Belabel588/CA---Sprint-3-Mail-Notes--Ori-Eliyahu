const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { noteService } from "../services/note.service.js"


export function NoteTodos(props) {
    const [todos, setTodos] = useState(props.note.info.todos)
    const [info, setInfo] = useState(props.note.info)

    function handleCheckboxChange(index) {
        // Create a new array by mapping over the current todos array
        const updatedTodos = todos.map((todo, i) => {
            // Check if the current index matches the index of the todo item that triggered the change event
            if (i === index) {
                // If it matches, create a new todo object with updated properties
                return {
                    ...todo, // Copy all properties from the current todo item
                    isTodoDone: !todo.isTodoDone, // Toggle the isTodoDone property (true becomes false, and false becomes true)
                    doneAt: !todo.isTodoDone ? Date.now() : null, // If the todo is being marked as done (isTodoDone becomes true), set doneAt to the current time. If it's being marked as not done (isTodoDone becomes false), set doneAt to null
                }
            }
            // If the current index does not match, return the todo item unchanged
            return todo
        })

        // Update the todos state with the new array of updated todos
        setTodos(updatedTodos)

        // Update the info state with the new todos array
        const updatedInfo = {
            ...info,
            todos: updatedTodos
        }

        setInfo(updatedInfo)

        // Create a new note object with the updated info and save it
        const updatedNote = {
            ...props.note,
            info: updatedInfo
        }

        noteService.save(updatedNote)
    }

    return (
        <div>
            <h1>ITS A TODOS</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.isTodoDone ? (
                            <div>
                                <span>Date: {new Date(todo.doneAt).toLocaleDateString()}</span>
                                <input
                                    type="checkbox"
                                    checked={todo.isTodoDone}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </div>
                        ) : (
                            <div>
                                <span>done yet?</span>
                                <input
                                    type="checkbox"
                                    checked={todo.isTodoDone}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </div>
                        )}
                        <span>{todo.txt}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}