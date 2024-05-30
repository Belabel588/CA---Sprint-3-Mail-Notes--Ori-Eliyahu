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
    const [videoData, setVideoData] = useState(null) // State to hold the video data
    const [videoId, setVideoId] = useState('')


    const YT_API = 'AIzaSyB4BXvsGKBG4o0WHOmm2jKzwIQS32KAVvM'


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
    const containerRef = useRef(null)



    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }, [filterBy])



    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                handleClose()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [inputs])

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
        handleFocus()
        clearInputs()
    }



    function handleChange({ target }) {
        const { name: prop, value } = target
        if (utilService.isLink(value)) {
            fetchYouTubeVideo(value)

        } else {
            setVideoData(null)
            setVideoId('')
        }
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
            fetchYouTubeVideo(value)
        } else {
            console.log('NOT A LINK')
            setNoteType('NoteTxt')
            setVideoData(null)
            setVideoId('')
        }
    }



    function fetchYouTubeVideo(url) {
        const videoId = utilService.extractVideoId(url)
        if (!videoId) return
        setVideoId(videoId)

        axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YT_API}&part=snippet,contentDetails`)
            .then(response => {
                if (response.data.items && response.data.items.length > 0) {
                    console.log('Video found:', response.data.items[0])
                    setNoteType('NoteLink')
                    displayVideo(response.data.items[0]) // Call a function to handle the display
                } else {
                    console.log('No video found')
                    setNoteType('NoteTxt')
                    setVideoId('')
                }
            })
            .catch(error => {
                console.error('Error fetching video:', error)
                setNoteType('NoteTxt')
                setVideoId('')
            })
    }



    function displayVideo(videoData) {
        setVideoData(videoData)
        setInputs(prevInputs => ({
            ...prevInputs,
            title: videoData.snippet.title,
            txt: `https://www.youtube.com/watch?v=${videoData.id}`
        }))
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

        if (noteType === 'NoteLink') {
            if (inputs.txt === '') {
                return
            }

            console.log(videoId)
            noteService.createNote(noteType, inputs.title, '', inputs.todos, videoId)
                .then(() => {
                    setFilterBy(prevFilterBy => ({ ...prevFilterBy, refresh: Date.now() }))
                    setVideoId(videoId)
                })
                .catch(error => {
                    console.error('Error creating note:', error)
                })
            clearInputs()
            setNoteType('NoteTxt')
            return
        }

        if (inputs.txt === '') {
            return
        }

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
        setVideoData(null) // Clear video data
        setVideoId('') // Clear video ID
    }



    function handleFocus() {
        setIsFocused(true)
    }



    function getUpdatedNote(updatedNote) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === updatedNote.id ? updatedNote : note
            )
        )
    }



    function handleNoteUpdate(updatedNote) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === updatedNote.id ? updatedNote : note
            )
        )
        noteService.save(updatedNote)
    }



    function togglePin(noteId) {
        noteService.get(noteId)
            .then(note => {
                if (!note) {
                    console.error('Note not found:', noteId)
                } else {
                    setNotes(prevNotes =>
                        prevNotes.map(note =>
                            note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
                        )
                    )
                }
            })
            .catch(error => {
                console.error('Error fetching note:', error)
            })
    }



    function onCopyNote(noteId) {
        console.log('copying note with id:', noteId)
        noteService.get(noteId)
            .then((note) => {
                if (!note) {
                    console.error('Error: Note is undefined')
                    return
                }
                console.log('original note:', note)
                const newNote = noteService.createNote(note.type, note.title, note.txt, note.info.todos, note.videoId)
                setFilterBy(prevFilterBy => ({ ...prevFilterBy, refresh: Date.now() }))
                if (!newNote) {
                    console.error('Error: Failed to create new note')
                    return
                }
                console.log(newNote)
            })
            .catch(error => {
                console.error('Error copying note:', error)
            })
    }


    function onChangeColor(color, noteId) {
        console.log('Selected color:', color);
        console.log('Note ID:', noteId);
        noteService.get(noteId)
            .then(note => {
                if (!note) {
                    console.error('Error: Note is undefined');
                    return;
                }
                const updatedNote = {
                    ...note,
                    style: {
                        ...note.style,
                        backgroundColor: color
                    }
                };
                handleNoteUpdate(updatedNote)
            })
            .catch(error => {
                console.error('Error updating note color:', error);
            });
    }


    // Filter the pinned / unpinned notes
    const pinnedNotes = notes.filter(note => note.isPinned)
    const unPinnedNotes = notes.filter(note => !note.isPinned)



    return (
        <div className="main-container">
            <NoteFilter filterBy={filterBy} onFilter={setNewFilterBy} notes={notes} />
            <div className="text-inputs" ref={containerRef}>
                <div className="note-add-inputs">
                    <div className="input-container">
                        {isFocused && (
                            <input
                                className="input-new-title"
                                type="text"
                                placeholder="Title"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                value={inputs.title}
                                name="title"
                            />
                        )}
                        {(noteType === 'NoteTxt' || noteType === 'NoteLink') && (
                            <input
                                className={`input-new-note ${isFocused ? 'expanded' : ''}`}
                                type="text"
                                onChange={handleChange}
                                onFocus={handleFocus}
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
                                        name={`todos-${idx}-txt`}
                                    />
                                ))}
                            </ul>
                        )}
                        {!isClicked && (
                            <div className={'actions'}>
                                <button className="btn-new-img" onClick={(e) => { e.stopPropagation(); handleButtonClick('NoteImg'); }}>
                                    <img src={images.noteImg} alt="" />
                                </button>
                                <button className="btn-new-todos" onClick={(e) => { e.stopPropagation(); handleButtonClick('NoteTodos'); }}>
                                    <img src={images.todoImg} alt="" />
                                </button>
                            </div>
                        )}
                    </div>
                    {videoData && (
                        <div className="video-preview">
                            <h3>{videoData.snippet.title}</h3>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${videoData.id}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
                <button
                    className={isFocused ? "close-txt-btn" : "none"}
                    onClick={handleClose}>
                    Close
                </button>
            </div>
            {/* Render NoteList with only pinned notes */}
            <NoteList note={noteType} notes={pinnedNotes}
                onRemove={onRemoveNote} handleNoteUpdate={handleNoteUpdate} getUpdatedNote={getUpdatedNote} togglePin={togglePin} copyNote={onCopyNote} onChangeColor={onChangeColor} />
            <span className="lists-seperation"></span>
            {/* Render NoteList with all notes */}
            <NoteList note={noteType} notes={unPinnedNotes}
                onRemove={onRemoveNote} handleNoteUpdate={handleNoteUpdate} getUpdatedNote={getUpdatedNote} togglePin={togglePin} copyNote={onCopyNote} onChangeColor={onChangeColor} />
        </div>
    )
}