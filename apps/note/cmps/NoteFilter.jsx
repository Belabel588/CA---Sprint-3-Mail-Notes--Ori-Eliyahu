const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

export function NoteFilter({ filterBy, onFilter, notes }) {
    console.log(notes);
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    useEffect(() => {
        onFilter(filterByToEdit);
    }, [filterByToEdit]);

    function handleChange({ target }) {
        const { name, value } = target;
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }));
    }

    // function handleCheak() {
    //     const newIsPinned = !filterByToEdit.isPinned;
    //     setFilterByToEdit(prevState => ({
    //         ...prevState,
    //         isPinned: newIsPinned
    //     }));

    //     const updatedNotes = notes.map(note => {
    //         if (note.isPinned) {
    //             return { ...note, class: newIsPinned ? 'pinned' : '' };
    //         }
    //         return note;
    //     });

    //     console.log('Updated Notes:', updatedNotes);

    //     // Instead of updating filter, you can now pass the updated notes to the parent component
    //     onFilter(updatedNotes);
    // }

    return (
        <div className="filters">
            <input className="txt-filter" onChange={handleChange} value={filterByToEdit.title} placeholder='Search' type='text' name='title' />
            <div className="filter-options">
                {/* <label className="pinned-cheakbox">
                    <input
                        type="checkbox"
                        name="isPinned"
                        onChange={handleCheak}
                        checked={filterByToEdit.isPinned}
                    />
                    Sort by pinned
                </label> */}

                <select name="type" onChange={handleChange} value={filterByToEdit.type}>
                    <option value="NoteImg">By images</option>
                    <option value="NoteTxt">By text</option>
                    <option value="NoteTodos">By todos</option>
                    <option value="NoteVids">By videos</option>
                </select>
            </div>
        </div>
    );
}
