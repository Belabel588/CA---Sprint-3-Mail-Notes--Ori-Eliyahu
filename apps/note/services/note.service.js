
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"



const NOTES_KEY = 'notesDB'

export const noteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    addNote,
    createNote
}

_createDemoNotes()


function _createDemoNotes() {
    const demoNotes = []
    const noteTypes = ['NoteTxt', 'NoteTodos']
    const colors = [
        '#00b0ff', '#00c853', '#01579b', '#7c4dff',
        '#8d6e63', '#8e24aa', '#90a4ae', '#9fa8da', '#a142f4'
    ]
    // 'NotePaint'
    //'NoteImg'
    for (let i = 0; i < 5; i++) {
        const demoNote = {
            videoId: null,
            id: utilService.makeId(),
            type: utilService.getRandomType(noteTypes),
            createdAt: utilService.formatDate(Date.now()),
            isPinned: false,//utilService.getRandomBoolean(),
            style: {
                backgroundColor: '#ffffff' //utilService.getRandomColorFromArray(colors)
            },
            info: {
                title: utilService.makeLorem(5),
                txt: utilService.makeLorem(20),
                todos: [
                    {
                        txt: utilService.makeLorem(10),
                        isTodoDone: false,
                        doneAt: null
                    },
                    {
                        txt: utilService.makeLorem(10),
                        isTodoDone: false,
                        doneAt: null
                    }
                ]
            }
        }
        demoNotes.push(demoNote)
        utilService.saveToStorage(NOTES_KEY, demoNotes)
    }
}

function createNote(type, title, txt, todos, videoId = '') {
    return new Promise((resolve, reject) => {
        try {
            // Define a list of colors to randomly assign to the note's background
            const colors = [
                '#00b0ff', '#00c853', '#01579b', '#7c4dff',
                '#8d6e63', '#8e24aa', '#90a4ae', '#9fa8da', '#a142f4'
            ]

            // Filter out todos that have empty text
            const filteredTodos = todos.filter(todo => todo.txt.trim() !== '')

            // Create a new note object with the specified type, title, and content
            const newNote = {
                videoId: videoId,
                id: utilService.makeId(), // Generate a unique ID for the note
                type: type, // Note type (e.g., 'NoteTxt', 'NoteTodos', etc.)
                createdAt: utilService.formatDate(Date.now()), // Set the creation date of the note
                isPinned: false,//utilService.getRandomBoolean(), // Randomly determine if the note is pinned
                style: {
                    backgroundColor: '#ffffff'  // Randomly assign a background color //utilService.getRandomColorFromArray(colors)
                },
                info: {
                    title: title, // Note title
                    txt: type === 'NoteTodos' ? '' : txt, // Note text, empty if type is 'NoteTodos'
                    todos: type === 'NoteTodos' ? filteredTodos : [] // Include todos if type is 'NoteTodos', otherwise an empty array
                }
            }

            // Load existing notes from local storage, or initialize an empty array if none exist
            const notes = utilService.loadFromStorage(NOTES_KEY) || []
            notes.push(newNote) // Add the new note to the array of notes
            utilService.saveToStorage(NOTES_KEY, notes) // Save the updated array of notes to local storage

            resolve(newNote) // Resolve the promise with the new note
        } catch (error) {
            reject(error) // Reject the promise if there's an error
        }
    })
}




function query(filterBy = {}) {
    const noteTypes = ['NoteImg', 'NoteTxt', 'NoteTodos', 'NoteVids'];

    console.log(filterBy)
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                notes = notes.filter(note => regExp.test(note.info.title) || regExp.test(note.info.txt))
            }
            if (filterBy.type) {
                notes = notes.filter(note => noteTypes.includes(note.type))
            }
            return notes
        })
}


function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            // note = _setNextPrevNoteId(note)
            return note
        })
}

function remove(noteId) {
    console.log(noteId)
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        // console.log('putting note', note)
        return storageService.put(NOTES_KEY, note)
    } else {
        // console.log('posting note', note)
        return storageService.post(NOTES_KEY, note)
    }
}


function getDefaultFilter(filterBy = { type: '', isPinned: 0, search: '' }) {
    return { type: filterBy.type, isPinned: filterBy.isPinned, search: filterBy.search }
}


function addNote(note) {
    console.log('the note is being added  : ', note)
    return storageService.put(NOTES_KEY, note)
        .then((note) => {
            console.log('adding note...')
            console.log(note)
        })
}


