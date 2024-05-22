





// export function NotePreview({ note }) {
//     console.log(note);

//     function renderTodos(todos) {
//         if (!todos) return null; // Return null if todos is undefined or null
//         return todos.map((todo, index) => (
//             <div key={index} className="todo-item">
//                 <span className="todo-txt">{todo.txt}</span>
//                 <span className="todo-done-at">Done At: {todo.isTodoDone ? new Date(todo.doneAt).toLocaleDateString() : 'Not done yet'}</span>
//             </div>
//         ))
//     }

//     return (
//         <article className='note-preview'>
//             <span>{note.info.title}</span>
//             <span className='createdDate'>{note.createdAt}</span>
//             {note.info.todos && renderTodos(note.info.todos)}
//         </article>
//     )
// }

const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { NoteImg } from "../dynamicCmp/NoteImg.jsx";
import { NoteTodos } from "../dynamicCmp/NoteTodos.jsx";
import { NoteTxt } from "../dynamicCmp/NoteTxt.jsx";
import { NoteVideo } from "../dynamicCmp/NoteVideo.jsx";

export function NotePreview(props) {

    // console.log(props)
    // const [cmpType, setCmpType] = useState()



    return <div>
        <p>I AM NOTE OF KIND: {`${props.noteType}`}</p>
        {<DynamicCmp props={props} />}
    </div>

}

function DynamicCmp({ props }) {
    console.log(props);
    // console.log(props.noteType);
    switch (props.noteType) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
        case 'NoteVids':
            return <NoteVideo {...props} />
    }
}