
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"



const NOTES_KEY = 'notesDB'

export const noteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter
}

_createDemoNotes()


function _createDemoNotes() {
    const demoNotes = []
    const noteTypes = ['NoteImg', 'NoteTxt', 'NoteTodos', 'NoteVids']
    const colors = [
        '#00b0ff', '#00c853', '#01579b', '#7c4dff',
        '#8d6e63', '#8e24aa', '#90a4ae', '#9fa8da', '#a142f4'
    ]

    for (let i = 0; i < 5; i++) {
        const demoNote = {
            id: utilService.makeId(),
            type: utilService.getRandomType(noteTypes),
            createdAt: utilService.formatDate(Date.now()),
            isPinned: utilService.getRandomBoolean(),
            style: {
                backgroundColor: utilService.getRandomColorFromArray(colors)
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


function query(filterBy = {}) {

    const noteTypes = ['NoteImg', 'NoteTxt', 'NoteTodos', 'NoteVids']

    console.log(filterBy)
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.info.title))
            }
            if (filterBy.isPinned) {
                notes = notes.filter(note => note.isPinned === true)
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
            note = _setNextPrevNoteId(note)
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


function getDefaultFilter(filterBy = { type: '', isPinned: 0, title: '' }) {
    return { type: filterBy.type, isPinned: filterBy.isPinned, title: filterBy.title }
}



