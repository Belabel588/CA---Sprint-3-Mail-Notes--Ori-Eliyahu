const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteFilter({ filterBy, onFilter, notes }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, value } = target
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return (
        <div className="filters">
            <input
                className="txt-filter"
                onChange={handleChange}
                value={filterByToEdit.search || ''}
                placeholder='Search by title or text'
                type='text'
                name='search'
            />
            <div className="filter-options">
                <select name="type" onChange={handleChange} value={filterByToEdit.type || ''}>
                    <option value="">All</option>
                    <option value="NoteImg">By images</option>
                    <option value="NoteTxt">By text</option>
                    <option value="NoteTodos">By todos</option>
                    <option value="NoteVids">By videos</option>
                </select>
            </div>
        </div>
    )
}
