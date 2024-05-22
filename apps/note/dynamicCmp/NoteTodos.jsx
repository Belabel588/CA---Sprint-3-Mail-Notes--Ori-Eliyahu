const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteTodos(props) {
    
    const [todos, setTodos] = useState(props.note.info.todos)
  
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