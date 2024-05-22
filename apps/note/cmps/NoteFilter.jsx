const { useState, useEffect } = React
const { Link } = ReactRouterDOM


export function NoteFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, value } = target;
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }));
    }

    function handleCheak() {
        setFilterByToEdit(prevState => ({
            ...prevState,
            isPinned: !prevState.isPinned
        }))
    }

    // const noteTypes = ['NoteImg', 'NoteTxt', 'NoteTodos', 'NoteVids']

    return <div className="filters">
        <input onChange={handleChange} value={filterByToEdit.title} placeholder='Search' type='text' name='title' />
        <label>
            <input
                type="checkbox"
                name="isPinned"
                onChange={handleCheak}
                checked={filterByToEdit.isPinned}
            />
            Sort by pinned
        </label>
        <select onChange={handleChange} id="">
            <option name="type" value="NoteImg">By images</option>
            <option name="type" value="NoteTxt">By text</option>
            <option name="type" value="NoteTodos">By todos</option>
            <option name="type" value="NoteVids">By videos</option>
        </select>
    </div>

}