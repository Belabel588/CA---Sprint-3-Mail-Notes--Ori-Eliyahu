const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { noteService } from "../services/note.service.js"


export function NoteTodos({ note }) {
    const [todos, setTodos] = useState(note.info.todos);
    const [info, setInfo] = useState(note.info);

    useEffect(() => {
        setTodos(note.info.todos);
        setInfo(note.info);
    }, [note]);

    function handleCheckboxChange(index) {
        const updatedTodos = todos.map((todo, i) => {
            if (i === index) {
                return {
                    ...todo,
                    isTodoDone: !todo.isTodoDone,
                    doneAt: !todo.isTodoDone ? Date.now() : null,
                };
            }
            return todo;
        });

        setTodos(updatedTodos);

        const updatedInfo = {
            ...info,
            todos: updatedTodos,
        };

        setInfo(updatedInfo);

        const updatedNote = {
            ...note,
            info: updatedInfo,
        };

        noteService.save(updatedNote);
    }

    return (
        <div>
            <h1>ITS A TODOS</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li key={todo.id || index}>
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
    );
}