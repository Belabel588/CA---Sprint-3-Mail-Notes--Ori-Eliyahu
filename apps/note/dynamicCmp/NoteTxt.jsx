export function NoteTxt(props) {
    const { note } = props
    // console.log(note.info.txt);
    return <div>
        <h1>ITS A TXT</h1>
        <section className="note-txt-title" >title is :{note.info.title}</section>
        <section className="note-txt" > txt is :{note.info.txt}</section>
    </div>
}