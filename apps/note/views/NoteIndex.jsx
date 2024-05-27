const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { getImageDataUrls } from "../services/img.service.js"
import { TodoInput } from "../cmps/TodoInput.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteType, setNoteType] = useState('NoteTxt')
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [isFocused, setIsFocused] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [inputs, setInputs] = useState({
        title: '',
        txt: '',
        todos: [
            {
                txt: '',
                isTodoDone: false,
                doneAt: null
            }
        ]
    })

    const images = getImageDataUrls()

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }, [filterBy])

    const titleRef = useRef(null)
    const txtRef = useRef(null)

    useEffect(() => {
        function handleClickOutside({ target }) {
            console.log(target);
            console.log(target.classList);
            console.log(titleRef.current);
            console.log(txtRef.current);
            if (titleRef.current === target.classList[0]) {
                // console.log(titleRef.current);
                console.log('SUCCESSSSSS');
            }
            if (txtRef.current === target.classList[0]) {
                // console.log(txtRef.current);
                console.log('SUCCESSSSSS');
            }


        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [titleRef, txtRef])


    function setNewFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note ${noteId} removed successfully`)
            })
            .catch(err => {
                console.error('Error removing note', err)
                showErrorMsg(`Failed to remove note ${noteId}`)
            })
    }

    function handleButtonClick(newNoteType) {
        setNoteType(newNoteType)
        setIsClicked(true)
        console.log(newNoteType)
        handleFocus()
        clearInputs()
    }

    function handleChange({ target }) {
        const { name: prop, value } = target

        setInputs(prevInputs => {
            if (prop.startsWith('todos')) {
                const todos = [...prevInputs.todos]
                const index = parseInt(prop.split('-')[1])
                todos[index].txt = value
                if (!todos[index + 1]) {
                    todos.push({
                        txt: '',
                        isTodoDone: false,
                        doneAt: null
                    })
                }
                return { ...prevInputs, todos }
            }
            return { ...prevInputs, [prop]: value }
        })
    }

    function handleInputChange(value) {
        if (utilService.isLink(value)) {
            console.log('ITS A LINK')
            setNoteType('NoteLink')
        } else {
            console.log('ITS A TXT')
            setNoteType('NoteTxt')
        }
    }



    function handleClose() {
        setIsClicked(false)
        setIsFocused(false)

        if (noteType === 'NoteTodos') {
            if (inputs.todos[0].txt === '') {
                setNoteType('NoteTxt')
                return
            }
            noteService.createNote(noteType, inputs.title, '', inputs.todos)
                .then(() => {
                    setFilterBy(prevFilterBy => ({ ...prevFilterBy, refresh: Date.now() }))
                })
                .catch(error => {
                    console.error('Error creating note:', error)
                })
            clearInputs()
            setNoteType('NoteTxt')
            return
        }

        if (inputs.txt === '') return

        handleInputChange(inputs.txt)

        noteService.createNote(noteType, inputs.title, inputs.txt, [])
            .then(() => {
                setFilterBy(prevFilterBy => ({ ...prevFilterBy, refresh: Date.now() }))
            })
            .catch(error => {
                console.error('Error creating note:', error)
            })

        clearInputs()
        setNoteType('NoteTxt')
    }

    function clearInputs() {
        setInputs({
            title: '',
            txt: '',
            todos: [
                {
                    txt: '',
                    isTodoDone: false,
                    doneAt: null
                }
            ]
        })
    }

    function handleFocus() {
        setIsFocused(true)
    }

    function handleBlur({ target }) {

        const { name } = target
        console.log(name);
        if (name === 'txt' || name === 'title') return

        handleClose()

    }

    console.log('isFocused : ', isFocused);

    return (
        <div className="main-container">
            <NoteFilter filterBy={filterBy} onFilter={setNewFilterBy} />
            <div className="text-inputs">
                <div className="note-add-inputs">
                    <div className="input-container">
                        {isFocused && (
                            <input
                                ref={titleRef}
                                className="input-new-title"
                                type="text"
                                placeholder="Title"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                value={inputs.title}
                                name="title"
                            />
                        )}
                        {(noteType === 'NoteTxt' || noteType === 'NoteLink') && (
                            <input
                                ref={txtRef}
                                className={`input-new-note ${isFocused ? 'expanded' : ''}`}
                                type="text"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder="New note..."
                                value={inputs.txt}
                                name="txt"
                            />
                        )}
                        {noteType === 'NoteTodos' && (
                            <ul className={'new-todo-list'}>
                                {inputs.todos.map((todo, idx) => (
                                    <TodoInput
                                        key={idx}
                                        value={todo.txt}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        name={`todos-${idx}-txt`} // Pass the name prop
                                    />
                                ))}
                            </ul>
                        )}
                        {!isClicked && (
                            <div className={'actions'}>
                                <button className="btn-new-img" onClick={() => handleButtonClick('NoteImg')}>
                                    <img src={images.noteImg} alt="" />
                                </button>
                                <button className="btn-new-todos" onClick={() => handleButtonClick('NoteTodos')}>
                                    <img src={images.todoImg} alt="" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className={isFocused ? "close-txt-btn" : "none"}
                    onClick={handleClose}>
                    Close
                </button>
            </div>
            <NoteList note={noteType} notes={notes} onRemove={onRemoveNote} />
        </div>
    )
}
