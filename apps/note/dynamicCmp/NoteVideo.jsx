

export function NoteVideo(props) {
    console.log(props);
    const { videoId } = props.note;

    if (!videoId) {
        console.log('EMPTY');
    } else {
        console.log(videoId);
    }

    return (
        <div className="video-note">
            <section className='video-title'>{props.note.info.title}</section>
            <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}
